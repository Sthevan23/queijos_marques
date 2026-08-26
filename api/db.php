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
            'detalhe' => $e->getMessage(),
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
    header('Access-Control-Allow-Headers: Content-Type, X-Admin-Pin');
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

function require_admin(): void
{
    $pin = $_SERVER['HTTP_X_ADMIN_PIN'] ?? ($_GET['pin'] ?? '');
    $esperado = (string) (db_config()['admin_pin'] ?? '');
    if ($pin === '' || !hash_equals($esperado, (string) $pin)) {
        json_erro('PIN inválido.', 401);
    }
}
