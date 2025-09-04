// ============================
// UTILITÁRIOS
// ============================

// Converte texto em formato BRL ("R$ 20,00") para número (20.00)
const parseBRL = (str) => {
  const n = String(str)
    .replace(/\s|R\$/g, '') // remove "R$" e espaços
    .replace(/\./g, '')     // remove pontos de milhar
    .replace(',', '.')      // troca vírgula decimal por ponto
    .trim();
  const v = Number(n);
  return Number.isFinite(v) ? v : 0;
};

// Formata um número em moeda brasileira (ex: 20 -> "R$ 20,00")
const formatBRL = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// Carrega o carrinho do localStorage
const loadCart = () => {
  const cartData = localStorage.getItem('cart');
  return cartData ? new Map(JSON.parse(cartData)) : new Map();
};

// Salva o carrinho no localStorage
const saveCart = (cart) => {
  const cartData = JSON.stringify([...cart]);
  localStorage.setItem('cart', cartData);
};

// ============================
// ESTADO GLOBAL DO CARRINHO
// ============================

// O carrinho é um Map, onde a chave é o id do produto
// Estrutura: cart.set(id, {id, name, price, qty, image})
const cart = loadCart();

// Seletores globais
let itemsNodeList;
let cartCountEl, cartTotalEl, cartItemsEl, cartEmptyEl;
let cartTotalModalEl, checkoutBtn, checkoutBtnModal, clearCartBtn;

// ============================
// INICIALIZAÇÃO
// ============================

document.addEventListener('DOMContentLoaded', () => {
  // Seleciona todos os elementos necessários
  itemsNodeList = document.querySelectorAll('.item');
  cartCountEl = document.getElementById('cartcount'); // Atualizado para corresponder ao HTML
  cartTotalEl = document.getElementById('carttotal'); // Atualizado para corresponder ao HTML
  cartItemsEl = document.getElementById('cartItems');
  cartEmptyEl = document.getElementById('cartEmpty');
  cartTotalModalEl = document.getElementById('cartTotalModal');
  checkoutBtn = document.getElementById('checkoutbtn'); // Atualizado para corresponder ao HTML
  checkoutBtnModal = document.getElementById('checkoutBtnModal');
  clearCartBtn = document.getElementById('clearCart');

  // Eventos dos botões em cada produto (add e remove)
  if (itemsNodeList.length > 0) {
    itemsNodeList.forEach((itemEl) => {
      const btnAdd = itemEl.querySelector('.btn-add');
      const btnRemove = itemEl.querySelector('.btn-remove');
      const quantitySpan = itemEl.querySelector('.quantity');

      if (btnAdd && btnRemove && quantitySpan) {
        // Clicar em "+" adiciona ao carrinho
        btnAdd.addEventListener('click', () => handleQtyChange(itemEl, 1, quantitySpan));
        // Clicar em "-" remove do carrinho
        btnRemove.addEventListener('click', () => handleQtyChange(itemEl, -1, quantitySpan));
      }
    });
  }

  // Eventos da sacola (limpar, finalizar compra)
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', clearCart);
  }
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', finalizeOrder);
  }
  if (checkoutBtnModal) {
    checkoutBtnModal.addEventListener('click', finalizeOrder);
  }

  // Render inicial do carrinho
  renderCart();
});

// Quando usuário clica em "+" ou "-", atualiza o carrinho
function handleQtyChange(itemEl, delta, span) {
  const info = readItemInfo(itemEl); // pega id, nome, preço e imagem do produto
  updateCart(info.id, info.name, info.price, info.image, delta); // atualiza no carrinho
  span.textContent = getQty(info.id); // mostra quantidade no produto
  renderCart(); // atualiza interface
}

// Lê informações de um produto no HTML
function readItemInfo(itemEl) {
  const h2 = itemEl.querySelector('h2');
  const priceEl = itemEl.querySelector('.price');
  const img = itemEl.querySelector('img');
  return {
    id: itemEl.dataset.id, // atributo data-id
    name: h2 ? h2.textContent.trim() : 'Produto sem nome', // fallback
    price: priceEl ? parseBRL(priceEl.textContent.trim()) : 0, // fallback
    image: img ? img.src : '' // fallback
  };
}

// Atualiza o carrinho (adiciona ou remove item)
function updateCart(id, name, price, image, delta) {
  const current = cart.get(id) || { id, name, price, image, qty: 0 };
  current.qty = Math.max(0, current.qty + delta); // nunca deixa negativo
  current.qty === 0 ? cart.delete(id) : cart.set(id, current);
  saveCart(cart); // Salva no localStorage
}

// Retorna a quantidade atual de um item no carrinho
const getQty = (id) => cart.get(id)?.qty || 0;

// ============================
// ATUALIZAÇÃO DO GRID
// ============================
// Sincroniza as quantidades nos cards dos produtos
function syncGrid() {
  if (itemsNodeList.length > 0) {
    itemsNodeList.forEach((el) => {
      const quantitySpan = el.querySelector('.quantity');
      if (quantitySpan) {
        quantitySpan.textContent = getQty(el.dataset.id);
      }
    });
  }
}

// ============================
// RENDERIZAÇÃO DO CARRINHO
// ============================
function renderCart() {
  let totalItems = 0, totalAmount = 0;

  // Calcula totais
  cart.forEach(({ qty, price }) => {
    totalItems += qty;
    totalAmount += price * qty;
  });

  // Atualiza totais na interface (index.html)
  if (cartCountEl) {
    cartCountEl.textContent = totalItems;
  }
  if (cartTotalEl) {
    cartTotalEl.textContent = formatBRL(totalAmount);
  }
  if (checkoutBtn) {
    checkoutBtn.disabled = totalItems === 0;
  }

  // Adiciona feedback visual na cart-bar
  const cartBar = document.querySelector('.cart-bar');
  if (cartBar) {
    cartBar.classList.add('highlight');
    setTimeout(() => cartBar.classList.remove('highlight'), 300); // Remove após 300ms
  }

  // Atualiza totais na interface (sacola.html)
  if (cartTotalModalEl) {
    cartTotalModalEl.textContent = formatBRL(totalAmount);
  }
  if (checkoutBtnModal) {
    checkoutBtnModal.disabled = totalItems === 0;
  }

  // Se não tiver itens, mostra mensagem de vazio (sacola.html)
  if (cartItemsEl) {
    cartItemsEl.innerHTML = '';
    if (totalItems === 0) {
      if (cartEmptyEl) cartEmptyEl.classList.remove('hidden');
      cartItemsEl.classList.add('hidden');
      return;
    }

    // Caso tenha itens, lista eles na sacola
    if (cartEmptyEl) cartEmptyEl.classList.add('hidden');
    cartItemsEl.classList.remove('hidden');

    cart.forEach((entry) => {
      const row = document.createElement('div');
      row.className = 'cart-item';
      const totalItem = entry.price * entry.qty;

      // Estrutura do item no carrinho com imagem
      row.innerHTML = `
        <img src="${entry.image}" alt="${entry.name}">
        <div>
          <div class="item-name">${entry.name}</div>
          <div class="item-price">${formatBRL(entry.price)} / un.</div>
        </div>
        <div class="cart-qty">
          <button data-action="dec" aria-label="Diminuir">-</button>
          <span>${entry.qty}</span>
          <button data-action="inc" aria-label="Aumentar">+</button>
        </div>
        <div class="item-total">${formatBRL(totalItem)}</div>
        <button class="cart-remove" aria-label="Remover">Remover</button>
      `;

      // Eventos dos botões dentro da sacola
      const incBtn = row.querySelector('[data-action="inc"]');
      const decBtn = row.querySelector('[data-action="dec"]');
      const removeBtn = row.querySelector('.cart-remove');

      if (incBtn) {
        incBtn.addEventListener('click', () => {
          updateCart(entry.id, entry.name, entry.price, entry.image, 1);
          syncGrid();
          renderCart();
        });
      }
      if (decBtn) {
        decBtn.addEventListener('click', () => {
          updateCart(entry.id, entry.name, entry.price, entry.image, -1);
          syncGrid();
          renderCart();
        });
      }
      if (removeBtn) {
        removeBtn.addEventListener('click', () => {
          updateCart(entry.id, entry.name, entry.price, entry.image, -entry.qty);
          syncGrid();
          renderCart();
        });
      }

      cartItemsEl.appendChild(row);
    });
  }
}

// ============================
// LIMPEZA DO CARRINHO
// ============================
function clearCart() {
  cart.clear();
  saveCart(cart);
  syncGrid();
  renderCart();
}

// ============================
// FINALIZAÇÃO DO PEDIDO (WHATSAPP)
// ============================
function finalizeOrder() {
  if (cart.size === 0) return;
  const lines = ['Olá! Quero fazer um pedido:\n'];
  let total = 0;

  // Monta lista dos produtos
  cart.forEach(({ name, price, qty }) => {
    const subtotal = price * qty;
    total += subtotal;
    lines.push(`- ${name} | ${formatBRL(price)} x ${qty} = ${formatBRL(subtotal)}`);
  });

  // Total final
  lines.push('', `*Total do pedido: ${formatBRL(total)}*`);

  // Envia para WhatsApp
  const message = encodeURIComponent(lines.join('\n'));
  const phone = '5537991243408'; // seu número no formato internacional
  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  cart.clear();
  saveCart(cart);
  syncGrid();
  renderCart();
}