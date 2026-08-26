-- =========================================================
-- Marques Mineiro — schema MySQL (Hostinger)
-- Banco: u586160337_marquesmineiro
-- Domínio: marquesmineiro.com.br
-- =========================================================
-- Como usar:
-- 1) phpMyAdmin → selecionar u586160337_marquesmineiro
-- 2) Aba SQL → colar este arquivo → Executar
-- =========================================================

USE `u586160337_marquesmineiro`;

SET NAMES utf8mb4;
SET time_zone = '-03:00';

-- ---------------------------------------------------------
-- Cidades da rota (4 cidades do sogro)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS cidades (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome VARCHAR(120) NOT NULL,
  ordem TINYINT UNSIGNED NOT NULL DEFAULT 1,
  ativo TINYINT(1) NOT NULL DEFAULT 1,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uk_cidades_nome (nome)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO cidades (nome, ordem) VALUES
  ('Rio Verde', 1),
  ('Rio de Janeiro', 2),
  ('Goiânia', 3),
  ('Três Lagoas', 4)
ON DUPLICATE KEY UPDATE ordem = VALUES(ordem);

-- ---------------------------------------------------------
-- Produtos (espelho do catálogo / custos)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS produtos (
  id INT UNSIGNED NOT NULL,
  nome VARCHAR(180) NOT NULL,
  categoria VARCHAR(120) NOT NULL DEFAULT '',
  detalhes VARCHAR(255) NOT NULL DEFAULT '',
  preco DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  custo DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  ativo TINYINT(1) NOT NULL DEFAULT 1,
  atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_produtos_categoria (categoria),
  KEY idx_produtos_nome (nome)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------
-- Viagens / rotas (carga do dia)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS rotas (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  data_viagem DATE NOT NULL,
  observacao VARCHAR(255) NOT NULL DEFAULT '',
  status ENUM('aberta','baixada') NOT NULL DEFAULT 'aberta',
  total_pecas INT UNSIGNED NOT NULL DEFAULT 0,
  total_custo DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  total_receita DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  lucro_estimado DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  pecas_vendidas INT UNSIGNED NOT NULL DEFAULT 0,
  receita_real DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  custo_vendido DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  lucro_real DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  baixada_em DATE NULL,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_rotas_data (data_viagem),
  KEY idx_rotas_status (status),
  KEY idx_rotas_baixada_em (baixada_em)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Itens da carga por cidade/produto
CREATE TABLE IF NOT EXISTS rota_itens (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  rota_id BIGINT UNSIGNED NOT NULL,
  cidade VARCHAR(120) NOT NULL,
  produto_id INT UNSIGNED NOT NULL,
  nome VARCHAR(180) NOT NULL,
  qtd INT UNSIGNED NOT NULL DEFAULT 0,
  qtd_vendida INT UNSIGNED NOT NULL DEFAULT 0,
  preco DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  custo DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (id),
  KEY idx_rota_itens_rota (rota_id),
  KEY idx_rota_itens_cidade (cidade),
  KEY idx_rota_itens_produto (produto_id),
  CONSTRAINT fk_rota_itens_rota
    FOREIGN KEY (rota_id) REFERENCES rotas(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------
-- Vendas a prazo (fiado)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS aprazo (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  cliente VARCHAR(160) NOT NULL,
  cidade VARCHAR(120) NOT NULL DEFAULT '',
  valor DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  data_venda DATE NOT NULL,
  vencimento DATE NULL,
  rota_id BIGINT UNSIGNED NULL,
  observacao VARCHAR(255) NOT NULL DEFAULT '',
  status ENUM('pendente','pago') NOT NULL DEFAULT 'pendente',
  pago_em DATE NULL,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_aprazo_status (status),
  KEY idx_aprazo_data (data_venda),
  KEY idx_aprazo_cliente (cliente),
  CONSTRAINT fk_aprazo_rota
    FOREIGN KEY (rota_id) REFERENCES rotas(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------
-- Vendas do site (WhatsApp / checkout)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS vendas (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  data_venda DATETIME NOT NULL,
  receita DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  custo DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  lucro DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_vendas_data (data_venda)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS venda_itens (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  venda_id BIGINT UNSIGNED NOT NULL,
  produto_id INT UNSIGNED NOT NULL,
  nome VARCHAR(180) NOT NULL,
  qtd INT UNSIGNED NOT NULL DEFAULT 0,
  preco DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  custo DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  receita DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  lucro DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (id),
  KEY idx_venda_itens_venda (venda_id),
  CONSTRAINT fk_venda_itens_venda
    FOREIGN KEY (venda_id) REFERENCES vendas(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------
-- Config / admin
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS config (
  chave VARCHAR(80) NOT NULL,
  valor TEXT NOT NULL,
  atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (chave)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO config (chave, valor) VALUES
  ('admin_pin', '2025')
ON DUPLICATE KEY UPDATE valor = VALUES(valor);

-- Exemplo: atualizar preço de um produto (também no site, via API no futuro)
-- UPDATE produtos SET preco = 65.00 WHERE id = 1;

-- =========================================================
-- VIEWS úteis (Financeiro do dia)
-- =========================================================

CREATE OR REPLACE VIEW vw_financeiro_dia AS
SELECT
  d.dia,
  COALESCE(r.faturado_rotas, 0) + COALESCE(v.faturado_site, 0) AS faturado,
  COALESCE(r.lucro_rotas, 0) + COALESCE(v.lucro_site, 0) AS lucro,
  COALESCE(r.pecas_vendidas, 0) AS pecas_vendidas,
  COALESCE(p.cargas_sem_baixa, 0) AS cargas_sem_baixa
FROM (
  SELECT CURDATE() AS dia
) d
LEFT JOIN (
  SELECT
    COALESCE(baixada_em, data_viagem) AS dia,
    SUM(receita_real) AS faturado_rotas,
    SUM(lucro_real) AS lucro_rotas,
    SUM(pecas_vendidas) AS pecas_vendidas
  FROM rotas
  WHERE status = 'baixada'
  GROUP BY COALESCE(baixada_em, data_viagem)
) r ON r.dia = d.dia
LEFT JOIN (
  SELECT
    DATE(data_venda) AS dia,
    SUM(receita) AS faturado_site,
    SUM(lucro) AS lucro_site
  FROM vendas
  GROUP BY DATE(data_venda)
) v ON v.dia = d.dia
LEFT JOIN (
  SELECT
    data_viagem AS dia,
    COUNT(*) AS cargas_sem_baixa
  FROM rotas
  WHERE status = 'aberta'
  GROUP BY data_viagem
) p ON p.dia = d.dia;

-- =========================================================
-- QUERIES PRONTAS (copiar e usar no phpMyAdmin)
-- =========================================================

-- 1) Faturamento de HOJE
-- SELECT * FROM vw_financeiro_dia;

-- 2) Faturamento de um dia específico
-- SET @dia = '2026-08-26';
-- SELECT
--   @dia AS dia,
--   COALESCE((
--     SELECT SUM(receita_real) FROM rotas
--     WHERE status = 'baixada' AND COALESCE(baixada_em, data_viagem) = @dia
--   ), 0) +
--   COALESCE((
--     SELECT SUM(receita) FROM vendas
--     WHERE DATE(data_venda) = @dia
--   ), 0) AS faturado,
--   COALESCE((
--     SELECT SUM(lucro_real) FROM rotas
--     WHERE status = 'baixada' AND COALESCE(baixada_em, data_viagem) = @dia
--   ), 0) +
--   COALESCE((
--     SELECT SUM(lucro) FROM vendas
--     WHERE DATE(data_venda) = @dia
--   ), 0) AS lucro;

-- 3) Cargas ainda sem baixa (pra noite)
-- SELECT id, data_viagem, observacao, total_pecas, total_receita, lucro_estimado
-- FROM rotas
-- WHERE status = 'aberta'
-- ORDER BY data_viagem DESC, id DESC;

-- 4) Dar baixa (exemplo: marcar rota #1 como baixada)
-- UPDATE rota_itens SET qtd_vendida = qtd WHERE rota_id = 1; -- vendeu tudo
-- UPDATE rotas r
-- JOIN (
--   SELECT
--     rota_id,
--     SUM(qtd_vendida) AS pecas_vendidas,
--     SUM(preco * qtd_vendida) AS receita_real,
--     SUM(custo * qtd_vendida) AS custo_vendido,
--     SUM((preco - custo) * qtd_vendida) AS lucro_real
--   FROM rota_itens
--   WHERE rota_id = 1
--   GROUP BY rota_id
-- ) x ON x.rota_id = r.id
-- SET
--   r.status = 'baixada',
--   r.baixada_em = CURDATE(),
--   r.pecas_vendidas = x.pecas_vendidas,
--   r.receita_real = x.receita_real,
--   r.custo_vendido = x.custo_vendido,
--   r.lucro_real = x.lucro_real
-- WHERE r.id = 1;

-- 5) Contas a prazo pendentes
-- SELECT id, cliente, cidade, valor, data_venda, vencimento, observacao
-- FROM aprazo
-- WHERE status = 'pendente'
-- ORDER BY vencimento IS NULL, vencimento, id DESC;

-- 6) Marcar a prazo como pago
-- UPDATE aprazo
-- SET status = 'pago', pago_em = CURDATE()
-- WHERE id = 1;

-- 7) Criar uma viagem + itens (exemplo)
-- INSERT INTO rotas (data_viagem, observacao, status, total_pecas, total_custo, total_receita, lucro_estimado)
-- VALUES (CURDATE(), 'Saída de manhã', 'aberta', 10, 200.00, 350.00, 150.00);
-- SET @rota_id = LAST_INSERT_ID();
-- INSERT INTO rota_itens (rota_id, cidade, produto_id, nome, qtd, qtd_vendida, preco, custo) VALUES
-- (@rota_id, 'Rio Verde', 1, 'Queijo palito', 5, 0, 35.00, 20.00),
-- (@rota_id, 'Goiânia', 1, 'Queijo palito', 5, 0, 35.00, 20.00);
