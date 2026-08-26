<?php
require __DIR__ . '/db.php';
json_headers();

try {
    $pdo = db();
    $stmt = $pdo->query('SELECT DATABASE() AS banco, NOW() AS agora');
    $row = $stmt->fetch();
    json_ok([
        'mensagem' => 'Conexão OK',
        'banco' => $row['banco'] ?? null,
        'agora' => $row['agora'] ?? null,
        'dominio' => 'marquesmineiro.com.br',
    ]);
} catch (Throwable $e) {
    json_erro('Erro: ' . $e->getMessage(), 500);
}
