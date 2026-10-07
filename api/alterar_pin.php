<?php
/**
 * Troca o admin_pin em config.php.
 * POST JSON: { "novo_pin": "...." } + header X-Admin-Pin com o PIN atual.
 */
require __DIR__ . '/db.php';
json_headers();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    json_erro('Use POST.', 405);
}

require_admin();

$body = body_json();
$novo = trim((string) ($body['novo_pin'] ?? ''));
if ($novo === '' || strlen($novo) > 32) {
    json_erro('Informe novo_pin válido (até 32 caracteres).', 400);
}

$path = __DIR__ . '/config.php';
$cfg = db_config();
if (!is_array($cfg) || !is_file($path)) {
    json_erro('config.php não encontrado.', 500);
}

$cfg['admin_pin'] = $novo;

$linhas = ["<?php", "/**", " * Gerado por alterar_pin.php — marquesmineiro.com.br", " */", "return ["];
foreach ([
    'db_host',
    'db_name',
    'db_user',
    'db_pass',
    'db_charset',
    'admin_pin',
    'cors_origin',
] as $key) {
    if (!array_key_exists($key, $cfg)) {
        continue;
    }
    $linhas[] = '    ' . var_export($key, true) . ' => ' . var_export($cfg[$key], true) . ',';
}
$linhas[] = '];';
$php = implode("\n", $linhas) . "\n";

if (file_put_contents($path, $php) === false) {
    json_erro('Não foi possível gravar config.php.', 500);
}

json_ok(['mensagem' => 'PIN atualizado.']);
