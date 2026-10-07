<?php
/**
 * Autenticação do painel.
 * POST   { pin }           → cria sessão (token)
 * GET    + X-Admin-Token   → valida sessão
 * DELETE + X-Admin-Token   → encerra sessão
 */
require __DIR__ . '/db.php';
json_headers();

define('AUTH_TOKEN_TTL_HOURS', 12);
define('AUTH_MAX_FAILS', 8);
define('AUTH_LOCK_MINUTES', 15);

$pdo = db();
ensure_auth_tables($pdo);
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    if ($method === 'POST') {
        json_ok(login_admin($pdo, body_json()), 201);
    }

    if ($method === 'GET') {
        $token = request_admin_token();
        if ($token === '' || !token_admin_valido($token)) {
            json_erro('Sessão inválida ou expirada.', 401);
        }
        json_ok(['autenticado' => true]);
    }

    if ($method === 'DELETE') {
        $token = request_admin_token();
        if ($token !== '') {
            logout_admin($pdo, $token);
        }
        json_ok(['encerrado' => true]);
    }

    json_erro('Método não permitido.', 405);
} catch (Throwable $e) {
    json_erro('Erro no servidor: ' . $e->getMessage(), 500);
}

function login_bloqueado(PDO $pdo, string $ip): ?string
{
    $st = $pdo->prepare('SELECT falhas, bloqueado_ate FROM admin_login_fails WHERE ip = ?');
    $st->execute([$ip]);
    $row = $st->fetch();
    if (!$row) {
        return null;
    }
    if (!empty($row['bloqueado_ate']) && strtotime($row['bloqueado_ate']) > time()) {
        $min = max(1, (int) ceil((strtotime($row['bloqueado_ate']) - time()) / 60));
        return "Muitas tentativas. Tente de novo em {$min} min.";
    }
    return null;
}

function registrar_falha_login(PDO $pdo, string $ip): void
{
    $st = $pdo->prepare('SELECT falhas FROM admin_login_fails WHERE ip = ?');
    $st->execute([$ip]);
    $row = $st->fetch();
    $falhas = ((int) ($row['falhas'] ?? 0)) + 1;
    $bloqueado = null;
    if ($falhas >= AUTH_MAX_FAILS) {
        $bloqueado = date('Y-m-d H:i:s', time() + AUTH_LOCK_MINUTES * 60);
        $falhas = 0;
    }
    $up = $pdo->prepare(
        'INSERT INTO admin_login_fails (ip, falhas, bloqueado_ate)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE falhas = VALUES(falhas), bloqueado_ate = VALUES(bloqueado_ate)'
    );
    $up->execute([$ip, $falhas, $bloqueado]);
}

function limpar_falhas_login(PDO $pdo, string $ip): void
{
    $st = $pdo->prepare('DELETE FROM admin_login_fails WHERE ip = ?');
    $st->execute([$ip]);
}

function login_admin(PDO $pdo, array $body): array
{
    $ip = client_ip();
    $bloqueio = login_bloqueado($pdo, $ip);
    if ($bloqueio) {
        json_erro($bloqueio, 429);
    }

    $pin = trim((string) ($body['pin'] ?? ''));
    if ($pin === '' || !pin_admin_valido($pin)) {
        registrar_falha_login($pdo, $ip);
        usleep(250000);
        json_erro('PIN incorreto.', 401);
    }

    limpar_falhas_login($pdo, $ip);
    limpar_tokens_expirados($pdo);

    $token = bin2hex(random_bytes(32));
    $hash = hash_admin_token($token);
    $expira = date('Y-m-d H:i:s', time() + AUTH_TOKEN_TTL_HOURS * 3600);

    $st = $pdo->prepare(
        'INSERT INTO admin_tokens (token_hash, expira_em, ip) VALUES (?, ?, ?)'
    );
    $st->execute([$hash, $expira, $ip]);

    return [
        'token' => $token,
        'expiraEm' => $expira,
        'ttlHoras' => AUTH_TOKEN_TTL_HOURS,
    ];
}

function logout_admin(PDO $pdo, string $token): void
{
    $st = $pdo->prepare('DELETE FROM admin_tokens WHERE token_hash = ?');
    $st->execute([hash_admin_token($token)]);
}
