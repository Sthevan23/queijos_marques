<?php
/**
 * Despesas / contas (hospedagem, alimentação, uber…).
 * GET    → lista (PIN)
 * POST   → criar (PIN)
 * DELETE → ?id= (PIN)
 */
require __DIR__ . '/db.php';
json_headers();
require_admin();

$pdo = db();
ensure_despesas_table($pdo);
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    if ($method === 'GET') {
        json_ok(listar_despesas($pdo));
    }

    if ($method === 'POST') {
        $body = body_json();
        json_ok(criar_despesa($pdo, $body), 201);
    }

    if ($method === 'DELETE') {
        $id = (int) ($_GET['id'] ?? (body_json()['id'] ?? 0));
        if ($id <= 0) json_erro('ID inválido.');
        $st = $pdo->prepare('DELETE FROM despesas WHERE id = ?');
        $st->execute([$id]);
        json_ok(['id' => $id, 'removida' => $st->rowCount() > 0]);
    }

    json_erro('Método não permitido.', 405);
} catch (Throwable $e) {
    json_erro('Erro no servidor: ' . $e->getMessage(), 500);
}

function ensure_despesas_table(PDO $pdo): void
{
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS despesas (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            categoria VARCHAR(80) NOT NULL,
            descricao VARCHAR(255) NOT NULL DEFAULT '',
            valor DECIMAL(12,2) NOT NULL DEFAULT 0.00,
            data_despesa DATE NOT NULL,
            criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY idx_despesas_data (data_despesa),
            KEY idx_despesas_categoria (categoria)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );
}

function row_despesa(array $row): array
{
    return [
        'id' => (int) $row['id'],
        'categoria' => $row['categoria'],
        'descricao' => $row['descricao'],
        'valor' => (float) $row['valor'],
        'data' => $row['data_despesa'],
    ];
}

function listar_despesas(PDO $pdo): array
{
    $rows = $pdo->query(
        'SELECT id, categoria, descricao, valor, data_despesa
         FROM despesas
         ORDER BY data_despesa DESC, id DESC'
    )->fetchAll();
    return array_map('row_despesa', $rows);
}

function criar_despesa(PDO $pdo, array $body): array
{
    $categoria = trim((string) ($body['categoria'] ?? ''));
    $descricao = trim((string) ($body['descricao'] ?? ''));
    $valor = (float) ($body['valor'] ?? 0);
    $data = trim((string) ($body['data'] ?? ''));

    if ($categoria === '') json_erro('Informe a categoria.');
    if ($valor <= 0) json_erro('Informe um valor válido.');
    if ($data === '' || !preg_match('/^\d{4}-\d{2}-\d{2}$/', $data)) {
        $data = date('Y-m-d');
    }

    $st = $pdo->prepare(
        'INSERT INTO despesas (categoria, descricao, valor, data_despesa)
         VALUES (?, ?, ?, ?)'
    );
    $st->execute([$categoria, $descricao, $valor, $data]);
    $id = (int) $pdo->lastInsertId();

    $st = $pdo->prepare(
        'SELECT id, categoria, descricao, valor, data_despesa FROM despesas WHERE id = ?'
    );
    $st->execute([$id]);
    return row_despesa($st->fetch());
}
