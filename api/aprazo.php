<?php
/**
 * Fiado / a prazo.
 * GET    → lista (PIN)
 * POST   → criar (PIN)
 * PUT    → atualizar (PIN) — pagamento total/parcial, status
 * DELETE → ?id= (PIN)
 */
require __DIR__ . '/db.php';
json_headers();
require_admin();

$pdo = db();
ensure_aprazo_table($pdo);
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    if ($method === 'GET') {
        json_ok(listar_aprazo($pdo));
    }

    if ($method === 'POST') {
        $body = body_json();
        json_ok(criar_aprazo($pdo, $body), 201);
    }

    if ($method === 'PUT') {
        $body = body_json();
        $id = (int) ($body['id'] ?? 0);
        if ($id <= 0) json_erro('ID inválido.');
        json_ok(atualizar_aprazo($pdo, $id, $body));
    }

    if ($method === 'DELETE') {
        $id = (int) ($_GET['id'] ?? (body_json()['id'] ?? 0));
        if ($id <= 0) json_erro('ID inválido.');
        $st = $pdo->prepare('DELETE FROM aprazo WHERE id = ?');
        $st->execute([$id]);
        json_ok(['id' => $id, 'removido' => $st->rowCount() > 0]);
    }

    json_erro('Método não permitido.', 405);
} catch (Throwable $e) {
    json_erro('Erro no servidor: ' . $e->getMessage(), 500);
}

function ensure_aprazo_table(PDO $pdo): void
{
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS aprazo (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            cliente VARCHAR(160) NOT NULL,
            telefone VARCHAR(40) NOT NULL DEFAULT '',
            cidade VARCHAR(120) NOT NULL DEFAULT '',
            valor DECIMAL(12,2) NOT NULL DEFAULT 0.00,
            data_fiado DATE NOT NULL,
            vencimento DATE NULL,
            observacao VARCHAR(255) NOT NULL DEFAULT '',
            status VARCHAR(20) NOT NULL DEFAULT 'pendente',
            pago_em DATE NULL,
            criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY idx_aprazo_status (status),
            KEY idx_aprazo_cliente (cliente),
            KEY idx_aprazo_venc (vencimento)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );
}

function row_aprazo(array $row): array
{
    return [
        'id' => (int) $row['id'],
        'cliente' => $row['cliente'],
        'telefone' => $row['telefone'] ?? '',
        'cidade' => $row['cidade'] ?? '',
        'valor' => (float) $row['valor'],
        'data' => $row['data_fiado'],
        'vencimento' => $row['vencimento'] ?: '',
        'observacao' => $row['observacao'] ?? '',
        'status' => $row['status'] === 'pago' ? 'pago' : 'pendente',
        'pagoEm' => $row['pago_em'] ?: null,
    ];
}

function listar_aprazo(PDO $pdo): array
{
    $rows = $pdo->query(
        'SELECT id, cliente, telefone, cidade, valor, data_fiado, vencimento, observacao, status, pago_em
         FROM aprazo
         ORDER BY
           CASE WHEN status = \'pendente\' THEN 0 ELSE 1 END,
           COALESCE(vencimento, \'9999-12-31\') ASC,
           id DESC'
    )->fetchAll();
    return array_map('row_aprazo', $rows);
}

function data_ok(?string $data): ?string
{
    $data = trim((string) $data);
    if ($data === '' || !preg_match('/^\d{4}-\d{2}-\d{2}$/', $data)) {
        return null;
    }
    return $data;
}

function criar_aprazo(PDO $pdo, array $body): array
{
    $cliente = trim((string) ($body['cliente'] ?? ''));
    $telefone = trim((string) ($body['telefone'] ?? ''));
    $cidade = trim((string) ($body['cidade'] ?? ''));
    $valor = (float) ($body['valor'] ?? 0);
    $data = data_ok($body['data'] ?? null) ?: date('Y-m-d');
    $vencimento = data_ok($body['vencimento'] ?? null);
    $observacao = trim((string) ($body['observacao'] ?? ''));
    $status = (($body['status'] ?? '') === 'pago') ? 'pago' : 'pendente';
    $pagoEm = data_ok($body['pagoEm'] ?? null);

    if ($cliente === '') json_erro('Informe o cliente.');
    if ($valor <= 0) json_erro('Informe um valor válido.');
    if ($status === 'pago' && !$pagoEm) $pagoEm = date('Y-m-d');
    if ($status === 'pendente') $pagoEm = null;

    $st = $pdo->prepare(
        'INSERT INTO aprazo (cliente, telefone, cidade, valor, data_fiado, vencimento, observacao, status, pago_em)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );
    $st->execute([
        $cliente,
        $telefone,
        $cidade,
        $valor,
        $data,
        $vencimento,
        $observacao,
        $status,
        $pagoEm,
    ]);

    return buscar_aprazo($pdo, (int) $pdo->lastInsertId());
}

function buscar_aprazo(PDO $pdo, int $id): array
{
    $st = $pdo->prepare(
        'SELECT id, cliente, telefone, cidade, valor, data_fiado, vencimento, observacao, status, pago_em
         FROM aprazo WHERE id = ?'
    );
    $st->execute([$id]);
    $row = $st->fetch();
    if (!$row) json_erro('Fiado não encontrado.', 404);
    return row_aprazo($row);
}

function atualizar_aprazo(PDO $pdo, int $id, array $body): array
{
    $atual = buscar_aprazo($pdo, $id);

    $cliente = array_key_exists('cliente', $body) ? trim((string) $body['cliente']) : $atual['cliente'];
    $telefone = array_key_exists('telefone', $body) ? trim((string) $body['telefone']) : $atual['telefone'];
    $cidade = array_key_exists('cidade', $body) ? trim((string) $body['cidade']) : $atual['cidade'];
    $valor = array_key_exists('valor', $body) ? (float) $body['valor'] : $atual['valor'];
    $data = data_ok($body['data'] ?? null) ?: $atual['data'];
    $vencimento = array_key_exists('vencimento', $body)
        ? data_ok($body['vencimento'])
        : ($atual['vencimento'] ?: null);
    $observacao = array_key_exists('observacao', $body)
        ? trim((string) $body['observacao'])
        : $atual['observacao'];
    $status = array_key_exists('status', $body)
        ? (($body['status'] === 'pago') ? 'pago' : 'pendente')
        : $atual['status'];
    $pagoEm = array_key_exists('pagoEm', $body)
        ? data_ok($body['pagoEm'])
        : $atual['pagoEm'];

    if ($cliente === '') json_erro('Informe o cliente.');
    if ($valor < 0) json_erro('Valor inválido.');
    if ($status === 'pago') {
        if (!$pagoEm) $pagoEm = date('Y-m-d');
    } else {
        $pagoEm = null;
    }

    $st = $pdo->prepare(
        'UPDATE aprazo
         SET cliente = ?, telefone = ?, cidade = ?, valor = ?, data_fiado = ?,
             vencimento = ?, observacao = ?, status = ?, pago_em = ?
         WHERE id = ?'
    );
    $st->execute([
        $cliente,
        $telefone,
        $cidade,
        $valor,
        $data,
        $vencimento,
        $observacao,
        $status,
        $pagoEm,
        $id,
    ]);

    return buscar_aprazo($pdo, $id);
}
