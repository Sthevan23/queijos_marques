<?php
/**
 * API de viagens/rotas — salva no MySQL da Hostinger.
 * GET    ?pin=2025           → lista viagens
 * POST   body JSON + pin     → criar viagem
 * PUT    body JSON + pin     → atualizar / dar baixa
 * DELETE ?id=&pin=           → excluir viagem
 */
require __DIR__ . '/db.php';
json_headers();
require_admin();

$pdo = db();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    if ($method === 'GET') {
        json_ok(listar_rotas($pdo));
    }

    if ($method === 'POST') {
        $body = body_json();
        $rota = criar_rota($pdo, $body);
        json_ok($rota, 201);
    }

    if ($method === 'PUT') {
        $body = body_json();
        $id = (int) ($body['id'] ?? 0);
        if ($id <= 0) json_erro('ID da viagem inválido.');
        $rota = atualizar_rota($pdo, $id, $body);
        if (!$rota) json_erro('Viagem não encontrada.', 404);
        json_ok($rota);
    }

    if ($method === 'DELETE') {
        $id = (int) ($_GET['id'] ?? (body_json()['id'] ?? 0));
        if ($id <= 0) json_erro('ID da viagem inválido.');
        $st = $pdo->prepare('DELETE FROM rotas WHERE id = ?');
        $st->execute([$id]);
        json_ok(['id' => $id, 'removida' => $st->rowCount() > 0]);
    }

    json_erro('Método não permitido.', 405);
} catch (Throwable $e) {
    json_erro('Erro no servidor: ' . $e->getMessage(), 500);
}

function listar_rotas(PDO $pdo): array
{
    $rotas = $pdo->query(
        'SELECT id, data_viagem, observacao, status,
                total_pecas, total_custo, total_receita, lucro_estimado,
                pecas_vendidas, receita_real, custo_vendido, lucro_real, baixada_em
         FROM rotas
         ORDER BY data_viagem DESC, id DESC'
    )->fetchAll();

    if (!$rotas) return [];

    $ids = array_column($rotas, 'id');
    $in = implode(',', array_fill(0, count($ids), '?'));
    $st = $pdo->prepare(
        "SELECT rota_id, cidade, produto_id, nome, qtd, qtd_vendida, preco, custo
         FROM rota_itens
         WHERE rota_id IN ($in)
         ORDER BY id ASC"
    );
    $st->execute($ids);
    $itens = $st->fetchAll();

    $porRota = [];
    foreach ($itens as $item) {
        $rid = (int) $item['rota_id'];
        $porRota[$rid][] = [
            'cidade' => $item['cidade'],
            'produtoId' => (int) $item['produto_id'],
            'nome' => $item['nome'],
            'qtd' => (int) $item['qtd'],
            'qtdVendida' => (int) $item['qtd_vendida'],
            'preco' => (float) $item['preco'],
            'custo' => (float) $item['custo'],
        ];
    }

    $out = [];
    foreach ($rotas as $r) {
        $out[] = map_rota($r, $porRota[(int) $r['id']] ?? []);
    }
    return $out;
}

function map_rota(array $r, array $itens): array
{
    return [
        'id' => (int) $r['id'],
        'data' => $r['data_viagem'],
        'observacao' => $r['observacao'] ?? '',
        'status' => $r['status'],
        'itens' => $itens,
        'totalPecas' => (int) $r['total_pecas'],
        'totalCusto' => (float) $r['total_custo'],
        'totalReceita' => (float) $r['total_receita'],
        'lucroEstimado' => (float) $r['lucro_estimado'],
        'pecasVendidas' => (int) $r['pecas_vendidas'],
        'receitaReal' => (float) $r['receita_real'],
        'custoVendido' => (float) $r['custo_vendido'],
        'lucroReal' => (float) $r['lucro_real'],
        'baixadaEm' => $r['baixada_em'],
    ];
}

function criar_rota(PDO $pdo, array $body): array
{
    $data = substr((string) ($body['data'] ?? date('Y-m-d')), 0, 10);
    $obs = trim((string) ($body['observacao'] ?? ''));
    $itens = $body['itens'] ?? [];
    if (!is_array($itens) || !count($itens)) {
        json_erro('Informe ao menos um produto na viagem.');
    }

    $totais = calc_totais($itens);

    $pdo->beginTransaction();
    try {
        $st = $pdo->prepare(
            'INSERT INTO rotas
             (data_viagem, observacao, status, total_pecas, total_custo, total_receita, lucro_estimado)
             VALUES (?, ?, "aberta", ?, ?, ?, ?)'
        );
        $st->execute([
            $data,
            $obs,
            $totais['totalPecas'],
            $totais['totalCusto'],
            $totais['totalReceita'],
            $totais['lucroEstimado'],
        ]);
        $rotaId = (int) $pdo->lastInsertId();
        inserir_itens($pdo, $rotaId, $itens);
        $pdo->commit();
    } catch (Throwable $e) {
        $pdo->rollBack();
        throw $e;
    }

    return buscar_rota($pdo, $rotaId);
}

function atualizar_rota(PDO $pdo, int $id, array $body): ?array
{
    $atual = buscar_rota($pdo, $id);
    if (!$atual) return null;

    $itens = $body['itens'] ?? $atual['itens'];
    if (!is_array($itens)) $itens = [];

    $status = $body['status'] ?? $atual['status'];
    if (!in_array($status, ['aberta', 'baixada'], true)) {
        $status = $atual['status'];
    }

    $totaisCarga = calc_totais($itens);
    $totaisBaixa = calc_baixa($itens);
    $baixadaEm = $body['baixadaEm'] ?? $atual['baixadaEm'];
    if ($status === 'baixada' && !$baixadaEm) {
        $baixadaEm = date('Y-m-d');
    }
    if ($status === 'aberta') {
        $baixadaEm = null;
    }

    $pdo->beginTransaction();
    try {
        $st = $pdo->prepare(
            'UPDATE rotas SET
                observacao = ?,
                status = ?,
                total_pecas = ?,
                total_custo = ?,
                total_receita = ?,
                lucro_estimado = ?,
                pecas_vendidas = ?,
                receita_real = ?,
                custo_vendido = ?,
                lucro_real = ?,
                baixada_em = ?
             WHERE id = ?'
        );
        $st->execute([
            trim((string) ($body['observacao'] ?? $atual['observacao'])),
            $status,
            $totaisCarga['totalPecas'],
            $totaisCarga['totalCusto'],
            $totaisCarga['totalReceita'],
            $totaisCarga['lucroEstimado'],
            $totaisBaixa['pecasVendidas'],
            $totaisBaixa['receitaReal'],
            $totaisBaixa['custoVendido'],
            $totaisBaixa['lucroReal'],
            $baixadaEm,
            $id,
        ]);

        $pdo->prepare('DELETE FROM rota_itens WHERE rota_id = ?')->execute([$id]);
        inserir_itens($pdo, $id, $itens);
        $pdo->commit();
    } catch (Throwable $e) {
        $pdo->rollBack();
        throw $e;
    }

    return buscar_rota($pdo, $id);
}

function buscar_rota(PDO $pdo, int $id): ?array
{
    $st = $pdo->prepare(
        'SELECT id, data_viagem, observacao, status,
                total_pecas, total_custo, total_receita, lucro_estimado,
                pecas_vendidas, receita_real, custo_vendido, lucro_real, baixada_em
         FROM rotas WHERE id = ?'
    );
    $st->execute([$id]);
    $r = $st->fetch();
    if (!$r) return null;

    $it = $pdo->prepare(
        'SELECT cidade, produto_id, nome, qtd, qtd_vendida, preco, custo
         FROM rota_itens WHERE rota_id = ? ORDER BY id ASC'
    );
    $it->execute([$id]);
    $itens = [];
    foreach ($it->fetchAll() as $item) {
        $itens[] = [
            'cidade' => $item['cidade'],
            'produtoId' => (int) $item['produto_id'],
            'nome' => $item['nome'],
            'qtd' => (int) $item['qtd'],
            'qtdVendida' => (int) $item['qtd_vendida'],
            'preco' => (float) $item['preco'],
            'custo' => (float) $item['custo'],
        ];
    }
    return map_rota($r, $itens);
}

function inserir_itens(PDO $pdo, int $rotaId, array $itens): void
{
    $st = $pdo->prepare(
        'INSERT INTO rota_itens
         (rota_id, cidade, produto_id, nome, qtd, qtd_vendida, preco, custo)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    );
    foreach ($itens as $i) {
        $qtd = max(0, (int) ($i['qtd'] ?? 0));
        if ($qtd <= 0) continue;
        $qtdVendida = max(0, (int) ($i['qtdVendida'] ?? 0));
        if ($qtdVendida > $qtd) $qtdVendida = $qtd;
        $st->execute([
            $rotaId,
            trim((string) ($i['cidade'] ?? '')),
            (int) ($i['produtoId'] ?? 0),
            trim((string) ($i['nome'] ?? 'Produto')),
            $qtd,
            $qtdVendida,
            (float) ($i['preco'] ?? 0),
            (float) ($i['custo'] ?? 0),
        ]);
    }
}

function calc_totais(array $itens): array
{
    $totalPecas = 0;
    $totalCusto = 0.0;
    $totalReceita = 0.0;
    foreach ($itens as $i) {
        $q = (int) ($i['qtd'] ?? 0);
        $totalPecas += $q;
        $totalCusto += ((float) ($i['custo'] ?? 0)) * $q;
        $totalReceita += ((float) ($i['preco'] ?? 0)) * $q;
    }
    return [
        'totalPecas' => $totalPecas,
        'totalCusto' => $totalCusto,
        'totalReceita' => $totalReceita,
        'lucroEstimado' => $totalReceita - $totalCusto,
    ];
}

function calc_baixa(array $itens): array
{
    $pecas = 0;
    $receita = 0.0;
    $custo = 0.0;
    foreach ($itens as $i) {
        $q = (int) ($i['qtdVendida'] ?? 0);
        $pecas += $q;
        $receita += ((float) ($i['preco'] ?? 0)) * $q;
        $custo += ((float) ($i['custo'] ?? 0)) * $q;
    }
    return [
        'pecasVendidas' => $pecas,
        'receitaReal' => $receita,
        'custoVendido' => $custo,
        'lucroReal' => $receita - $custo,
    ];
}
