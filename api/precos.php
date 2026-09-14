<?php
/**
 * Preços de venda do catálogo.
 * GET  → público (loja lê)
 * PUT  → admin PIN (salva mapa id → preço)
 * DELETE → admin PIN (limpa overrides; volta ao catálogo)
 */
require __DIR__ . '/db.php';
json_headers();

$pdo = db();
ensure_precos_table($pdo);
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    if ($method === 'GET') {
        json_ok(listar_precos($pdo));
    }

    require_admin();

    if ($method === 'PUT' || $method === 'POST') {
        $body = body_json();
        $mapa = $body['precos'] ?? $body;
        if (!is_array($mapa)) json_erro('Envie um mapa de preços.');
        json_ok(salvar_precos($pdo, $mapa));
    }

    if ($method === 'DELETE') {
        $pdo->exec('DELETE FROM precos_venda');
        json_ok(['limpo' => true, 'precos' => new stdClass()]);
    }

    json_erro('Método não permitido.', 405);
} catch (Throwable $e) {
    json_erro('Erro no servidor: ' . $e->getMessage(), 500);
}

function ensure_precos_table(PDO $pdo): void
{
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS precos_venda (
            produto_id INT UNSIGNED NOT NULL,
            preco DECIMAL(10,2) NOT NULL DEFAULT 0.00,
            atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (produto_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );
}

function listar_precos(PDO $pdo): array
{
    $rows = $pdo->query('SELECT produto_id, preco FROM precos_venda')->fetchAll();
    $out = [];
    foreach ($rows as $row) {
        $out[(string) (int) $row['produto_id']] = (float) $row['preco'];
    }
    return $out;
}

function salvar_precos(PDO $pdo, array $mapa): array
{
    $st = $pdo->prepare(
        'INSERT INTO precos_venda (produto_id, preco)
         VALUES (?, ?)
         ON DUPLICATE KEY UPDATE preco = VALUES(preco)'
    );

    $salvos = 0;
    foreach ($mapa as $id => $preco) {
        $pid = (int) $id;
        $valor = (float) $preco;
        if ($pid < 0 || !is_finite($valor)) continue;
        $st->execute([$pid, $valor]);
        $salvos++;
    }

    return [
        'salvos' => $salvos,
        'precos' => listar_precos($pdo),
    ];
}
