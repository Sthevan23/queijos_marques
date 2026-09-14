<?php
/**
 * Produtos extras cadastrados no admin (além do catálogo fixo).
 * GET              → público
 * POST             → criar (PIN)
 * PUT              → atualizar (PIN)
 * DELETE ?id=      → desativar (PIN)
 */
require __DIR__ . '/db.php';
json_headers();

$pdo = db();
ensure_produtos_custom($pdo);
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    if ($method === 'GET') {
        $todos = isset($_GET['todos']) && $_GET['todos'] === '1';
        if ($todos) require_admin();
        json_ok(listar_produtos_custom($pdo, !$todos));
    }

    require_admin();

    if ($method === 'POST') {
        $body = body_json();
        json_ok(criar_produto_custom($pdo, $body), 201);
    }

    if ($method === 'PUT') {
        $body = body_json();
        $id = (int) ($body['id'] ?? 0);
        if ($id < 1000) json_erro('ID inválido.');
        $prod = atualizar_produto_custom($pdo, $id, $body);
        if (!$prod) json_erro('Produto não encontrado.', 404);
        json_ok($prod);
    }

    if ($method === 'DELETE') {
        $id = (int) ($_GET['id'] ?? (body_json()['id'] ?? 0));
        if ($id < 1000) json_erro('ID inválido.');
        $st = $pdo->prepare('UPDATE produtos_custom SET ativo = 0 WHERE id = ?');
        $st->execute([$id]);
        json_ok(['id' => $id, 'removido' => $st->rowCount() > 0]);
    }

    json_erro('Método não permitido.', 405);
} catch (Throwable $e) {
    json_erro('Erro no servidor: ' . $e->getMessage(), 500);
}

function ensure_produtos_custom(PDO $pdo): void
{
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS produtos_custom (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            nome VARCHAR(180) NOT NULL,
            categoria VARCHAR(120) NOT NULL DEFAULT '',
            detalhes VARCHAR(255) NOT NULL DEFAULT '',
            preco DECIMAL(10,2) NOT NULL DEFAULT 0.00,
            custo DECIMAL(10,2) NOT NULL DEFAULT 0.00,
            imagem VARCHAR(500) NOT NULL DEFAULT 'assets/imagens/tradicionais/foto1.png',
            ativo TINYINT(1) NOT NULL DEFAULT 1,
            criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY idx_produtos_custom_ativo (ativo),
            KEY idx_produtos_custom_categoria (categoria)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );

    // Garante IDs a partir de 1000 (não colidem com o catálogo estático)
    $max = (int) $pdo->query('SELECT COALESCE(MAX(id), 0) FROM produtos_custom')->fetchColumn();
    if ($max < 1000) {
        $pdo->exec('ALTER TABLE produtos_custom AUTO_INCREMENT = 1000');
    }
}

function row_to_produto(array $row): array
{
    return [
        'id' => (int) $row['id'],
        'nome' => $row['nome'],
        'categoria' => $row['categoria'],
        'detalhes' => $row['detalhes'],
        'preco' => (float) $row['preco'],
        'custo' => (float) $row['custo'],
        'imagem' => $row['imagem'],
        'ativo' => (int) $row['ativo'] === 1,
        'custom' => true,
    ];
}

function listar_produtos_custom(PDO $pdo, bool $somenteAtivos = true): array
{
    $sql = 'SELECT id, nome, categoria, detalhes, preco, custo, imagem, ativo
            FROM produtos_custom';
    if ($somenteAtivos) $sql .= ' WHERE ativo = 1';
    $sql .= ' ORDER BY categoria ASC, nome ASC, id ASC';
    $rows = $pdo->query($sql)->fetchAll();
    return array_map('row_to_produto', $rows);
}

function criar_produto_custom(PDO $pdo, array $body): array
{
    $nome = trim((string) ($body['nome'] ?? ''));
    $categoria = trim((string) ($body['categoria'] ?? ''));
    $detalhes = trim((string) ($body['detalhes'] ?? ''));
    $preco = (float) ($body['preco'] ?? 0);
    $custo = (float) ($body['custo'] ?? 0);
    $imagem = trim((string) ($body['imagem'] ?? ''));

    if ($nome === '') json_erro('Informe o nome do produto.');
    if ($categoria === '') $categoria = 'Diversos';
    if ($imagem === '') $imagem = 'assets/imagens/tradicionais/foto1.png';
    if ($preco < 0 || $custo < 0) json_erro('Preço/custo inválidos.');

    $st = $pdo->prepare(
        'INSERT INTO produtos_custom (nome, categoria, detalhes, preco, custo, imagem, ativo)
         VALUES (?, ?, ?, ?, ?, ?, 1)'
    );
    $st->execute([$nome, $categoria, $detalhes, $preco, $custo, $imagem]);
    $id = (int) $pdo->lastInsertId();
    if ($id < 1000) {
        // fallback se AUTO_INCREMENT ainda baixo
        $pdo->prepare('UPDATE produtos_custom SET id = ? WHERE id = ?')->execute([1000 + $id, $id]);
        $id = 1000 + $id;
        $pdo->exec('ALTER TABLE produtos_custom AUTO_INCREMENT = ' . ($id + 1));
    }

    // Espelha preço na tabela de overrides
    try {
        $pdo->prepare(
            'INSERT INTO precos_venda (produto_id, preco) VALUES (?, ?)
             ON DUPLICATE KEY UPDATE preco = VALUES(preco)'
        )->execute([$id, $preco]);
    } catch (Throwable $e) {
        // tabela pode não existir ainda; precos.php cria sob demanda
    }

    $st = $pdo->prepare(
        'SELECT id, nome, categoria, detalhes, preco, custo, imagem, ativo
         FROM produtos_custom WHERE id = ?'
    );
    $st->execute([$id]);
    $row = $st->fetch();
    return row_to_produto($row);
}

function atualizar_produto_custom(PDO $pdo, int $id, array $body): ?array
{
    $st = $pdo->prepare('SELECT id FROM produtos_custom WHERE id = ?');
    $st->execute([$id]);
    if (!$st->fetch()) return null;

    $nome = trim((string) ($body['nome'] ?? ''));
    $categoria = trim((string) ($body['categoria'] ?? ''));
    $detalhes = trim((string) ($body['detalhes'] ?? ''));
    $preco = (float) ($body['preco'] ?? 0);
    $custo = (float) ($body['custo'] ?? 0);
    $imagem = trim((string) ($body['imagem'] ?? ''));
    $ativo = isset($body['ativo']) ? ((int) !!$body['ativo']) : 1;

    if ($nome === '') json_erro('Informe o nome do produto.');
    if ($categoria === '') $categoria = 'Diversos';
    if ($imagem === '') $imagem = 'assets/imagens/tradicionais/foto1.png';

    $pdo->prepare(
        'UPDATE produtos_custom
         SET nome = ?, categoria = ?, detalhes = ?, preco = ?, custo = ?, imagem = ?, ativo = ?
         WHERE id = ?'
    )->execute([$nome, $categoria, $detalhes, $preco, $custo, $imagem, $ativo, $id]);

    try {
        $pdo->prepare(
            'INSERT INTO precos_venda (produto_id, preco) VALUES (?, ?)
             ON DUPLICATE KEY UPDATE preco = VALUES(preco)'
        )->execute([$id, $preco]);
    } catch (Throwable $e) {
    }

    $st = $pdo->prepare(
        'SELECT id, nome, categoria, detalhes, preco, custo, imagem, ativo
         FROM produtos_custom WHERE id = ?'
    );
    $st->execute([$id]);
    return row_to_produto($st->fetch());
}
