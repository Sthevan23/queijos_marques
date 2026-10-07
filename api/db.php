<?php
/**
 * Conexão PDO com o MySQL da Hostinger.
 */
function db_config(): array
{
    static $config = null;
    if ($config === null) {
        $path = __DIR__ . '/config.php';
        if (!is_file($path)) {
            http_response_code(500);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode([
                'ok' => false,
                'erro' => 'Arquivo api/config.php não encontrado. Copie de config.example.php.'
            ]);
            exit;
        }
        $config = require $path;
    }
    return $config;
}

function db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $c = db_config();
    $dsn = sprintf(
        'mysql:host=%s;dbname=%s;charset=%s',
        $c['db_host'],
        $c['db_name'],
        $c['db_charset'] ?? 'utf8mb4'
    );

    try {
        $pdo = new PDO($dsn, $c['db_user'], $c['db_pass'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            'ok' => false,
            'erro' => 'Falha na conexão com o banco.',
        ]);
        exit;
    }

    return $pdo;
}

function json_headers(): void
{
    $origin = db_config()['cors_origin'] ?? '*';
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, X-Admin-Pin, X-Admin-Token');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function json_ok($data = [], int $code = 200): void
{
    http_response_code($code);
    echo json_encode(['ok' => true, 'data' => $data], JSON_UNESCAPED_UNICODE);
    exit;
}

function json_erro(string $msg, int $code = 400): void
{
    http_response_code($code);
    echo json_encode(['ok' => false, 'erro' => $msg], JSON_UNESCAPED_UNICODE);
    exit;
}

function body_json(): array
{
    $raw = file_get_contents('php://input');
    if (!$raw) return [];
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function client_ip(): string
{
    $ip = $_SERVER['HTTP_CF_CONNECTING_IP']
        ?? $_SERVER['HTTP_X_FORWARDED_FOR']
        ?? $_SERVER['REMOTE_ADDR']
        ?? '0.0.0.0';
    if (str_contains((string) $ip, ',')) {
        $ip = trim(explode(',', (string) $ip)[0]);
    }
    return substr((string) $ip, 0, 64);
}

function ensure_auth_tables(PDO $pdo): void
{
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS admin_tokens (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            token_hash CHAR(64) NOT NULL,
            criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            expira_em DATETIME NOT NULL,
            ultimo_uso DATETIME NULL,
            ip VARCHAR(64) NOT NULL DEFAULT '',
            PRIMARY KEY (id),
            UNIQUE KEY uq_admin_token_hash (token_hash),
            KEY idx_admin_token_exp (expira_em)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS admin_login_fails (
            ip VARCHAR(64) NOT NULL,
            falhas INT UNSIGNED NOT NULL DEFAULT 0,
            bloqueado_ate DATETIME NULL,
            atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (ip)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );
}

function hash_admin_token(string $token): string
{
    return hash('sha256', $token);
}

function request_admin_token(): string
{
    $token = trim((string) ($_SERVER['HTTP_X_ADMIN_TOKEN'] ?? ''));
    if ($token !== '') return $token;
    $auth = trim((string) ($_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? ''));
    if (preg_match('/^Bearer\s+(\S+)$/i', $auth, $m)) {
        return trim($m[1]);
    }
    return '';
}

function request_admin_pin(): string
{
    return trim((string) ($_SERVER['HTTP_X_ADMIN_PIN'] ?? ($_GET['pin'] ?? '')));
}

function limpar_tokens_expirados(PDO $pdo): void
{
    $pdo->exec('DELETE FROM admin_tokens WHERE expira_em < NOW()');
}

function token_admin_valido(string $token): bool
{
    $token = trim($token);
    if ($token === '' || strlen($token) < 32) return false;
    try {
        $pdo = db();
        ensure_auth_tables($pdo);
        limpar_tokens_expirados($pdo);
        $hash = hash_admin_token($token);
        $st = $pdo->prepare(
            'SELECT id FROM admin_tokens WHERE token_hash = ? AND expira_em >= NOW() LIMIT 1'
        );
        $st->execute([$hash]);
        $row = $st->fetch();
        if (!$row) return false;
        $up = $pdo->prepare('UPDATE admin_tokens SET ultimo_uso = NOW() WHERE id = ?');
        $up->execute([(int) $row['id']]);
        return true;
    } catch (Throwable $e) {
        return false;
    }
}

function pin_admin_valido(string $pin): bool
{
    $esperado = (string) (db_config()['admin_pin'] ?? '');
    return $pin !== '' && $esperado !== '' && hash_equals($esperado, $pin);
}

/**
 * Aceita sessão (X-Admin-Token) ou PIN do servidor (X-Admin-Pin) para scripts internos.
 * O PIN NÃO deve existir no JavaScript do site.
 */
function require_admin(): void
{
    $token = request_admin_token();
    if ($token !== '' && token_admin_valido($token)) {
        return;
    }

    $pin = request_admin_pin();
    if ($pin !== '' && pin_admin_valido($pin)) {
        return;
    }

    json_erro('Não autorizado. Entre de novo no painel.', 401);
}
