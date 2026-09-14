<?php
/**
 * Grava api/config.php quando o banco está inacessível.
 * Só funciona se a conexão atual falhar (ou o arquivo não existir).
 */
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://marquesmineiro.com.br');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Admin-Pin');
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function ler_config(): ?array
{
    $path = __DIR__ . '/config.php';
    if (!is_file($path)) return null;
    $cfg = require $path;
    return is_array($cfg) ? $cfg : null;
}

function testar_pdo(string $host, string $name, string $user, string $pass): ?string
{
    try {
        $dsn = sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', $host, $name);
        $pdo = new PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_TIMEOUT => 8,
        ]);
        $pdo->query('SELECT 1');
        return null;
    } catch (Throwable $e) {
        return $e->getMessage();
    }
}

function banco_acessivel(?array $cfg): bool
{
    if (!$cfg) return false;
    $err = testar_pdo(
        (string) ($cfg['db_host'] ?? 'localhost'),
        (string) ($cfg['db_name'] ?? ''),
        (string) ($cfg['db_user'] ?? ''),
        (string) ($cfg['db_pass'] ?? '')
    );
    return $err === null;
}

function body_json_local(): array
{
    $raw = file_get_contents('php://input');
    if (!$raw) return [];
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

$cfg = ler_config();
if (banco_acessivel($cfg)) {
    echo json_encode([
        'ok' => true,
        'data' => ['mensagem' => 'Banco já conecta. Setup bloqueado.', 'bloqueado' => true],
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$esperado = (string) (($cfg['admin_pin'] ?? null) ?: '2025');
$pin = $_SERVER['HTTP_X_ADMIN_PIN'] ?? ($_GET['pin'] ?? '');
if ($pin === '' || !hash_equals($esperado, (string) $pin)) {
    http_response_code(401);
    echo json_encode(['ok' => false, 'erro' => 'PIN inválido.'], JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'GET') {
    echo json_encode([
        'ok' => true,
        'data' => [
            'mensagem' => 'Banco fora do ar. Envie POST com db_host, db_name, db_user, db_pass.',
            'precisa_setup' => true,
            'atual' => $cfg ? [
                'db_host' => $cfg['db_host'] ?? null,
                'db_name' => $cfg['db_name'] ?? null,
                'db_user' => $cfg['db_user'] ?? null,
            ] : null,
        ],
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$body = body_json_local();
$host = trim((string) ($body['db_host'] ?? 'localhost'));
$name = trim((string) ($body['db_name'] ?? ''));
$user = trim((string) ($body['db_user'] ?? ''));
$pass = (string) ($body['db_pass'] ?? '');
$adminPin = trim((string) ($body['admin_pin'] ?? $esperado));

if ($name === '' || $user === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'erro' => 'Informe db_name e db_user.'], JSON_UNESCAPED_UNICODE);
    exit;
}

$erroTeste = testar_pdo($host, $name, $user, $pass);
if ($erroTeste !== null) {
    http_response_code(400);
    echo json_encode([
        'ok' => false,
        'erro' => 'Não conectou com esses dados.',
        'detalhe' => $erroTeste,
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$php = "<?php\n"
    . "/**\n * Gerado por setup_banco.php — marquesmineiro.com.br\n */\n"
    . "return [\n"
    . "    'db_host' => " . var_export($host, true) . ",\n"
    . "    'db_name' => " . var_export($name, true) . ",\n"
    . "    'db_user' => " . var_export($user, true) . ",\n"
    . "    'db_pass' => " . var_export($pass, true) . ",\n"
    . "    'db_charset' => 'utf8mb4',\n"
    . "    'admin_pin' => " . var_export($adminPin, true) . ",\n"
    . "    'cors_origin' => 'https://marquesmineiro.com.br',\n"
    . "];\n";

if (file_put_contents(__DIR__ . '/config.php', $php) === false) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'erro' => 'Não foi possível gravar config.php no servidor.'], JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode([
    'ok' => true,
    'data' => [
        'mensagem' => 'Conexão OK. config.php atualizado.',
        'banco' => $name,
        'usuario' => $user,
    ],
], JSON_UNESCAPED_UNICODE);
