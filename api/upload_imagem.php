<?php
/**
 * Upload de imagem de produto (admin PIN).
 * Salva em assets/imagens/custom/
 */
require __DIR__ . '/db.php';
json_headers();
require_admin();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    json_erro('Método não permitido.', 405);
}

if (empty($_FILES['imagem']) || !is_uploaded_file($_FILES['imagem']['tmp_name'])) {
    json_erro('Envie o arquivo no campo imagem.');
}

$file = $_FILES['imagem'];
if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
    json_erro('Falha no upload.');
}
if (($file['size'] ?? 0) > 3 * 1024 * 1024) {
    json_erro('Imagem muito grande (máx. 3 MB).');
}

$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime = $finfo->file($file['tmp_name']) ?: '';
$mapa = [
    'image/jpeg' => 'jpg',
    'image/png' => 'png',
    'image/webp' => 'webp',
    'image/gif' => 'gif',
];
if (!isset($mapa[$mime])) {
    json_erro('Use JPG, PNG, WEBP ou GIF.');
}

$dir = dirname(__DIR__) . '/assets/imagens/custom';
if (!is_dir($dir) && !mkdir($dir, 0755, true)) {
    json_erro('Não foi possível criar a pasta de imagens.');
}

$nome = 'prod_' . date('Ymd_His') . '_' . bin2hex(random_bytes(3)) . '.' . $mapa[$mime];
$destino = $dir . '/' . $nome;
if (!move_uploaded_file($file['tmp_name'], $destino)) {
    json_erro('Não foi possível salvar a imagem.');
}

$rel = 'assets/imagens/custom/' . $nome;
json_ok(['imagem' => $rel, 'url' => $rel]);
