// ============================
// DADOS DOS PRODUTOS
// ============================
const produtos = [
    // Queijos tradicionais
    { 
        id: 0, 
        categoria: "Queijos tradicionais", 
        nome: "Queijo palito", 
        detalhes: "450g – Queijo em palito artesanal", 
        preco: 34.90, 
        imagem: "assets/imagens/tradicionais/foto1.png" 
    },
    { 
        id: 1, 
        categoria: "Queijos tradicionais", 
        nome: "Queijo trança", 
        detalhes: "450g – Pura, defumada, alho ou temperada", 
        preco: 34.90, 
        imagem: "assets/imagens/tradicionais/foto2.png" 
    },
    { 
        id: 2, 
        categoria: "Queijos tradicionais", 
        nome: "Queijo nozinho", 
        detalhes: "450g – Tradicional artesanal", 
        preco: 34.90, 
        imagem: "assets/imagens/tradicionais/foto3.png" 
    },
    { 
        id: 3, 
        categoria: "Queijos tradicionais", 
        nome: "Kit trançinha", 
        detalhes: "400g – Kit com tranças variadas", 
        preco: 31.90, 
        imagem: "assets/imagens/tradicionais/foto4.png" 
    },
    { 
        id: 4, 
        categoria: "Queijos tradicionais", 
        nome: "Queijo tipo reino", 
        detalhes: "450g – Queijo tipo reino tradicional", 
        preco: 41.90, 
        imagem: "assets/imagens/tradicionais/foto5.png" 
    },
    { 
        id: 5, 
        categoria: "Queijos tradicionais", 
        nome: "Queijo provolone recheado com salame", 
        detalhes: "450g – Provolone artesanal recheado", 
        preco: 34.90, 
        imagem: "assets/imagens/tradicionais/foto6.png" 
    },
    { 
        id: 6, 
        categoria: "Queijos tradicionais", 
        nome: "Queijo trança", 
        detalhes: "450g – Queijo trança artesanal", 
        preco: 34.90, 
        imagem: "assets/imagens/tradicionais/foto7.png" 
    },
    { 
        id: 7, 
        categoria: "Queijos tradicionais", 
        nome: "Queijo provolone", 
        detalhes: "450g – Provolone artesanal", 
        preco: 34.90, 
        imagem: "assets/imagens/tradicionais/foto8.png" 
    },
    { 
        id: 8, 
        categoria: "Queijos tradicionais", 
        nome: "Kit provoleto", 
        detalhes: "450g – Kit de provolones especiais", 
        preco: 39.40, 
        imagem: "assets/imagens/tradicionais/foto9.png" 
    },
    { 
        id: 9, 
        categoria: "Queijos tradicionais", 
        nome: "Kit provolone c/ lombo", 
        detalhes: "450g – Provolone com lombo defumado", 
        preco: 41.90, 
        imagem: "assets/imagens/tradicionais/foto10.png" 
    },
    { 
        id: 10, 
        categoria: "Queijos tradicionais", 
        nome: "Kit quatro queijos", 
        detalhes: "450g – Seleção de quatro queijos", 
        preco: 41.90, 
        imagem: "assets/imagens/tradicionais/foto11.png" 
    },
    { 
        id: 11, 
        categoria: "Queijos tradicionais", 
        nome: "Queijo cabacinha", 
        detalhes: "450g – Queijo cabacinha artesanal", 
        preco: 37.90, 
        imagem: "assets/imagens/tradicionais/foto12.png" 
    },
    { 
        id: 12, 
        categoria: "Queijos tradicionais", 
        nome: "Queijo minas padrão", 
        detalhes: "450g – Queijo minas padrão tradicional", 
        preco: 41.90, 
        imagem: "assets/imagens/tradicionais/foto13.png" 
    },
    { 
        id: 13, 
        categoria: "Queijos tradicionais", 
        nome: "Queijo minas com goiabada", 
        detalhes: "450g – Combinação clássica queijo e goiabada", 
        preco: 41.90, 
        imagem: "assets/imagens/tradicionais/foto14.png" 
    },
    { 
        id: 14, 
        categoria: "Queijos tradicionais", 
        nome: "Queijo minas", 
        detalhes: "450g – Queijo minas artesanal", 
        preco: 41.90, 
        imagem: "assets/imagens/tradicionais/foto15.png" 
    },
    { 
        id: 15, 
        categoria: "Queijos tradicionais", 
        nome: "Queijo minas Frescal Buritis", 
        detalhes: "400g – Versão light do minas frescal", 
        preco: 39.90, 
        imagem: "assets/imagens/tradicionais/foto16.png" 
    },
    { 
        id: 16, 
        categoria: "Queijos tradicionais", 
        nome: "Queijo trança ao vinho", 
        detalhes: "450g – Trança curada no vinho", 
        preco: 34.90, 
        imagem: "assets/imagens/tradicionais/foto17.png" 
    },
    { 
        id: 17, 
        categoria: "Queijos tradicionais", 
        nome: "Queijo coalho barra", 
        detalhes: "450g – Barra de coalho artesanal", 
        preco: 29.90, 
        imagem: "assets/imagens/tradicionais/foto18.png" 
    },
    { 
        id: 18, 
        categoria: "Queijos tradicionais", 
        nome: "Requeijão em barra", 
        detalhes: "450g – Requeijão em formato de barra", 
        preco: 29.90, 
        imagem: "assets/imagens/tradicionais/foto19.png" 
    },
    // Desidratados
    { 
        id: 19, 
        categoria: "Desidratados", 
        nome: "Chips de provolone puro", 
        detalhes: "180g – Crocante e saboroso", 
        preco: 29.90, 
        imagem: "assets/imagens/chips_queijo/chips1.png" 
    },
    { 
        id: 20, 
        categoria: "Desidratados", 
        nome: "Chips de provolone com chimichurri", 
        detalhes: "180g – Sabor com tempero especial", 
        preco: 29.90, 
        imagem: "assets/imagens/chips_queijo/chips2.png" 
    },
    { 
        id: 21, 
        categoria: "Desidratados", 
        nome: "Chips de provolone recheado com goiabada", 
        detalhes: "180g – Goiabada e queijo", 
        preco: 31.90, 
        imagem: "assets/imagens/chips_queijo/chips3.png" 
    },
    { 
        id: 22, 
        categoria: "Desidratados", 
        nome: "Chips tipo gouda", 
        detalhes: "180g – Sabor suave e crocante", 
        preco: 29.90, 
        imagem: "assets/imagens/chips_queijo/chips4.png" 
    },
    { 
        id: 23, 
        categoria: "Desidratados", 
        nome: "Chips de queijo coalho", 
        detalhes: "180g – Sabor clássico do nordeste", 
        preco: 29.90, 
        imagem: "assets/imagens/chips_queijo/chips5.png" 
    },
    // Queijos trufados
      { 
        id: 35, 
        categoria: "Queijos trufados", 
        nome: "Queijo recheado com goiabada", 
        detalhes: "500g – Goiabada cremosa", 
        preco: 44.90, 
        imagem: "assets/imagens/trufados/trufado7.png" 
    },
    { 
        id: 37, 
        categoria: "Queijos trufados", 
        nome: "Queijo recheado com doce de leite", 
        detalhes: "500g – Doce suave", 
        preco: 44.90, 
        imagem: "assets/imagens/trufados/trufado9.png" 
    },
    { 
        id: 36, 
        categoria: "Queijos trufados", 
        nome: "Queijo recheado com nutella", 
        detalhes: "500g – Nutella cremosa", 
        preco: 54.90, 
        imagem: "assets/imagens/trufados/trufado8.png" 
    },
    { 
        id: 29, 
        categoria: "Queijos trufados", 
        nome: "Queijo recheado com requeijão, damasco e avelã", 
        detalhes: "700g – Doce e cremoso", 
        preco: 44.90, 
        imagem: "assets/imagens/trufados/trufado1.png" 
    },
    { 
        id: 30, 
        categoria: "Queijos trufados", 
        nome: "Queijo recheado com requeijão e tomate seco", 
        detalhes: "500g – Leve e aromático", 
        preco: 44.90, 
        imagem: "assets/imagens/trufados/trufado2.png" 
    },
    { 
        id: 31, 
        categoria: "Queijos trufados", 
        nome: "Queijo recheado com cheddar", 
        detalhes: "500g – Sabor intenso", 
        preco: 59.90, 
        imagem: "assets/imagens/trufados/trufado3.png" 
    },
    { 
        id: 32, 
        categoria: "Queijos trufados", 
        nome: "Queijo recheado com requeijão e azeitona", 
        detalhes: "800g – Salgado e marcante", 
        preco: 44.90, 
        imagem: "assets/imagens/trufados/trufado4.png" 
    },
    { 
        id: 33, 
        categoria: "Queijos trufados", 
        nome: "Queijo recheado com cheddar e carne seca", 
        detalhes: "500g – Robusto e saboroso", 
        preco: 59.90, 
        imagem: "assets/imagens/trufados/trufado5.png" 
    },
    { 
        id: 34, 
        categoria: "Queijos trufados", 
        nome: "Queijo recheado com requeijão", 
        detalhes: "500g – Leve e cremoso", 
        preco: 39.90, 
        imagem: "assets/imagens/trufados/trufado6.png" 
    }, 
     { 
        id: 38, 
        categoria: "Queijos trufados", 
        nome: "Queijo recheado com requeijão e carne seca", 
        detalhes: "500g – Sabor irresistível", 
        preco: 47.90, 
        imagem: "assets/imagens/trufados/trufado11.png" 
    },
    
    
    // Queijos finos
    { 
        id: 38, 
        categoria: "Queijos finos", 
        nome: "Queijo canastra meia-cura", 
        detalhes: "500g – Tradição mineira", 
        preco: 44.90, 
        imagem: "assets/imagens/queijos_finos/foto1.png" 
    },
    { 
        id: 39, 
        categoria: "Queijos finos", 
        nome: "Queijo parmesão cunha", 
        detalhes: "400g – Toque marcante", 
        preco: 34.90, 
        imagem: "assets/imagens/queijos_finos/foto2.png" 
    },
    { 
        id: 40, 
        categoria: "Queijos finos", 
        nome: "Queijo canastra serjão", 
        detalhes: "1100g – Doce mineiro", 
        preco: 104.90, 
        imagem: "assets/imagens/queijos_finos/foto3.png" 
    },
    { 
        id: 41, 
        categoria: "Queijos finos", 
        nome: "Kit parmesão artesanal (defumado, temperado, vinho e tradicional)", 
        detalhes: "180g – Sabores variados", 
        preco: 41.90, 
        imagem: "assets/imagens/queijos_finos/foto4.png" 
    },
    { 
        id: 42, 
        categoria: "Queijos finos", 
        nome: "Queijo canastra moldura", 
        detalhes: "1000g – Sabor autêntico da canastra", 
        preco: 89.90, 
        imagem: "assets/imagens/queijos_finos/foto5.png" 
    },
    { 
        id: 43, 
        categoria: "Queijos finos", 
        nome: "Queijo gorgonzola", 
        detalhes: "125g – Aroma intenso", 
        preco: 29.90, 
        imagem: "assets/imagens/queijos_finos/foto6.png" 
    },
    { 
        id: 44, 
        categoria: "Queijos finos", 
        nome: "Queijo canastra barreirinha", 
        detalhes: "1000g – Aroma intenso", 
        preco: 79.90, 
        imagem: "assets/imagens/queijos_finos/foto7.png" 
    },
    { 
        id: 45, 
        categoria: "Queijos finos", 
        nome: "Queijo brisa", 
        detalhes: "450g – Sabor marcante, perfeito para molhos", 
        preco: 54.90, 
        imagem: "assets/imagens/queijos_finos/foto8.png" 
    },
    { 
        id: 46, 
        categoria: "Queijos finos", 
        nome: "Queijo canastra johnne premiado", 
        detalhes: "1000g – Premiado e cheio de personalidade", 
        preco: 99.90, 
        imagem: "assets/imagens/queijos_finos/foto9.png" 
    },
    { 
        id: 47, 
        categoria: "Queijos finos", 
        nome: "Panela de queijo parmesão", 
        detalhes: "600g – Ideal para receitas criativas", 
        preco: 54.90, 
        imagem: "assets/imagens/queijos_finos/foto10.png" 
    },
    { 
        id: 48, 
        categoria: "Queijos finos", 
        nome: "Queijo canastra reinaldo", 
        detalhes: "1000g – Autêntico sabor mineiro", 
        preco: 119.90, 
        imagem: "assets/imagens/queijos_finos/foto11.png" 
    },
    { 
        id: 49, 
        categoria: "Queijos finos", 
        nome: "Kit parmesão (tradicional, capa preta, defumado e temperado)", 
        detalhes: "500g – Variedade para todos os paladares", 
        preco: 39.90, 
        imagem: "assets/imagens/queijos_finos/foto12.png" 
    },
    { 
        id: 50, 
        categoria: "Queijos finos", 
        nome: "Burrata de búfala", 
        detalhes: "300g – Cremosa e sofisticada", 
        preco: 34.90, 
        imagem: "assets/imagens/queijos_finos/foto13.png" 
    },
    { 
        id: 51, 
        categoria: "Queijos finos", 
        nome: "Queijo morbier", 
        detalhes: "500g – Clássico francês de sabor único", 
        preco: 41.90, 
        imagem: "assets/imagens/queijos_finos/foto14.png" 
    },
    { 
        id: 52, 
        categoria: "Queijos finos", 
        nome: "Queijo tipo brie", 
        detalhes: "180g – Delicado e saboroso", 
        preco: 34.90, 
        imagem: "assets/imagens/queijos_finos/foto15.png" 
    },
    { 
        id: 53, 
        categoria: "Queijos finos", 
        nome: "Queijo camembert", 
        detalhes: "350g – Cremoso e sofisticado", 
        preco: 42.90, 
        imagem: "assets/imagens/queijos_finos/foto16.png" 
    },
    { 
        id: 54, 
        categoria: "Queijos finos", 
        nome: "Queijo mussarela de búfala em bolinha (tradicional, azeitona, damasco e cereja)", 
        detalhes: "250g – Frescor e versatilidade em cada bolinha", 
        preco: 39.90, 
        imagem: "assets/imagens/queijos_finos/foto17.png" 
    },
    { 
        id: 55, 
        categoria: "Queijos finos", 
        nome: "Queijo tipo grana", 
        detalhes: "220g – Encorpado, ideal para massas", 
        preco: 31.90, 
        imagem: "assets/imagens/queijos_finos/foto18.png" 
    },
    // Especiarias
    { 
        id: 56, 
        categoria: "Especiarias", 
        nome: "Presunto tenro bolinha juliatto", 
        detalhes: "700g – Macio, defumado e sabor marcante", 
        preco: 69.90, 
        imagem: "assets/imagens/especiarias/foto1.png" 
    },
    { 
        id: 57, 
        categoria: "Especiarias", 
        nome: "Picanha suína", 
        detalhes: "650g – Suculenta, com tempero especial", 
        preco: 44.90, 
        imagem: "assets/imagens/especiarias/foto2.png" 
    },
    { 
        id: 58, 
        categoria: "Especiarias", 
        nome: "Picanha com provolone", 
        detalhes: "700g – Combinação irresistível de carne e queijo", 
        preco: 49.90, 
        imagem: "assets/imagens/especiarias/foto3.png" 
    },
    { 
        id: 59, 
        categoria: "Especiarias", 
        nome: "Carne na lata canastra", 
        detalhes: "900g – Receita tradicional com sabor autêntico", 
        preco: 59.90, 
        imagem: "assets/imagens/especiarias/foto4.png" 
    },
    { 
        id: 60, 
        categoria: "Especiarias", 
        nome: "Ancho suíno", 
        detalhes: "450g – Ancho suíno macio e suculento", 
        preco: 64.90, 
        imagem: "assets/imagens/especiarias/foto5.png" 
    },
    { 
        id: 61, 
        categoria: "Especiarias", 
        nome: "Géleias uai", 
        detalhes: "200g – Pura, defumada, c/ abacaxi, c/hortelã, c/ damasco, c/ cereja, c/ limão, e c/ frutas vermelhas", 
        preco: 19.90, 
        imagem: "assets/imagens/especiarias/foto6.png" 
    },
    // Salaminhos
    { 
        id: 62, 
        categoria: "Salaminhos", 
        nome: "Lombo nobre defumado c/ pimenta biquinho", 
        detalhes: "200g – Defumado artesanal, toque suave da pimenta biquinho", 
        preco: 24.90, 
        imagem: "assets/imagens/salaminhos/foto1.png" 
    },
    { 
        id: 63, 
        categoria: "Salaminhos", 
        nome: "Lombo nobre defumado c/ alho", 
        detalhes: "200g – Sabor marcante com o toque especial do alho", 
        preco: 24.90, 
        imagem: "assets/imagens/salaminhos/foto2.png" 
    },
    { 
        id: 64, 
        categoria: "Salaminhos", 
        nome: "Salame italiano fatiado", 
        detalhes: "200g – Receita clássica italiana, sabor intenso e equilibrado", 
        preco: 24.90, 
        imagem: "assets/imagens/salaminhos/foto3.png" 
    },
    { 
        id: 65, 
        categoria: "Salaminhos", 
        nome: "Salaminho c/ azeitona", 
        detalhes: "200g – Combinação saborosa de salame com azeitonas selecionadas", 
        preco: 24.90, 
        imagem: "assets/imagens/salaminhos/foto4.png" 
    },
    { 
        id: 66, 
        categoria: "Salaminhos", 
        nome: "Lombo nobre defumado c/ pimenta calabresa", 
        detalhes: "200g – Defumado intenso com o toque picante da calabresa", 
        preco: 24.90, 
        imagem: "assets/imagens/salaminhos/foto5.png" 
    },
    { 
        id: 67, 
        categoria: "Salaminhos", 
        nome: "Salame frango c/ azeitona", 
        detalhes: "200g – Leve, saboroso e realçado com azeitonas selecionadas", 
        preco: 24.90, 
        imagem: "assets/imagens/salaminhos/foto6.png" 
    },
    { 
        id: 68, 
        categoria: "Salaminhos", 
        nome: "Salame frango c/ provolone", 
        detalhes: "200g – Combinação única de frango suave e queijo provolone", 
        preco: 24.90, 
        imagem: "assets/imagens/salaminhos/foto7.png" 
    },
    { 
        id: 69, 
        categoria: "Salaminhos", 
        nome: "Lombo nobre defumado", 
        detalhes: "200g – Clássico e saboroso, defumado artesanalmente", 
        preco: 37.90, 
        imagem: "assets/imagens/salaminhos/foto8.png" 
    },
    
    // Doces
    { 
        id: 70, 
        categoria: "Doces", 
        nome: "Doce de leite viçosa tradicional", 
        detalhes: "800g – Cremoso e tradicional, com sabor marcante", 
        preco: 44.90, 
        imagem: "assets/imagens/doces/foto1.png" 
    },
    { 
        id: 71, 
        categoria: "Doces", 
        nome: "Doce de leite viçosa com café, chocolate e coco", 
        detalhes: "400g – Variedade de sabores: café, chocolate e coco", 
        preco: 34.90, 
        imagem: "assets/imagens/doces/foto2.png" 
    },
     { 
        id: 80, 
        categoria: "Doces", 
        nome: "Doce de leite vimilk", 
        detalhes: "800g – Cremoso e tradicional, com sabor marcante", 
        preco: 41.90, 
        imagem: "assets/imagens/doces/foto11.png" 
    },
    { 
        id: 81, 
        categoria: "Doces", 
        nome: "Doce de leite c/morango la france", 
        detalhes: "440g – Combinação de doce de leite com morango", 
        preco: 29.90, 
        imagem: "assets/imagens/doces/foto12.png" 
    },
    { 
        id: 82, 
        categoria: "Doces", 
        nome: "Doce de leite blu zero lactose", 
        detalhes: "400g – Doce de leite sem lactose, cremoso", 
        preco: 34.90, 
        imagem: "assets/imagens/doces/foto13.png" 
    },
    { 
        id: 83, 
        categoria: "Doces", 
        nome: "Doce de leite rocca tradicional", 
        detalhes: "450g – Doce de leite artesanal clássico", 
        preco: 34.90, 
        imagem: "assets/imagens/doces/foto14.png" 
    },
    { 
        id: 84, 
        categoria: "Doces", 
        nome: "Doce de leite rocca c/ café e coco", 
        detalhes: "500g – Sabores de café e coco em doce de leite", 
        preco: 34.90, 
        imagem: "assets/imagens/doces/foto15.png" 
    },
    { 
        id: 85, 
        categoria: "Doces", 
        nome: "Doce de leite diet zero lactose fazenda", 
        detalhes: "430g – Doce de leite diet sem lactose", 
        preco: 37.90, 
        imagem: "assets/imagens/doces/foto16.png" 
    },
    { 
        id: 86, 
        categoria: "Doces", 
        nome: "Doce de leite capitólio", 
        detalhes: "500g – Doce de leite artesanal com sabor único", 
        preco: 34.90, 
        imagem: "assets/imagens/doces/foto17.png" 
    },
    { 
        id: 87, 
        categoria: "Doces", 
        nome: "Doce de leite vimilk", 
        detalhes: "700g – Cremoso e tradicional, com sabor marcante", 
        preco: 39.90, 
        imagem: "assets/imagens/doces/foto18.png" 
    },
    { 
        id: 72, 
        categoria: "Doces", 
        nome: "Goiabada cascão vovó zélia", 
        detalhes: "800g – Goiabada artesanal com textura rústica", 
        preco: 39.90, 
        imagem: "assets/imagens/doces/foto3.png" 
    },
    { 
        id: 73, 
        categoria: "Doces", 
        nome: "Goiabada cascão vovô olavo", 
        detalhes: "600g – Goiabada tradicional com sabor intenso", 
        preco: 29.90, 
        imagem: "assets/imagens/doces/foto4.png" 
    },
    { 
        id: 74, 
        categoria: "Doces", 
        nome: "Bananada vovô olavo", 
        detalhes: "400g – Bananada cremosa e artesanal", 
        preco: 24.90, 
        imagem: "assets/imagens/doces/foto5.png" 
    },
    { 
        id: 75, 
        categoria: "Doces", 
        nome: "Bananada vovô olavo", 
        detalhes: "450g – Bananada tradicional com sabor marcante", 
        preco: 24.90, 
        imagem: "assets/imagens/doces/foto6.png" 
    },
    { 
        id: 76, 
        categoria: "Doces", 
        nome: "Goiabada tenere", 
        detalhes: "1000g – Goiabada suave e cremosa", 
        preco: 34.90, 
        imagem: "assets/imagens/doces/foto7.png" 
    },
    { 
        id: 77, 
        categoria: "Doces", 
        nome: "Paçoca em barra delícia mineira", 
        detalhes: "500g – Paçoca artesanal com textura única", 
        preco: 21.90, 
        imagem: "assets/imagens/doces/foto8.png" 
    },
    { 
        id: 78, 
        categoria: "Doces", 
        nome: "Bala de banana zero açúcar", 
        detalhes: "500g – Sabor de banana sem açúcar", 
        preco: 31.90, 
        imagem: "assets/imagens/doces/foto9.png" 
    },
    { 
        id: 79, 
        categoria: "Doces", 
        nome: "Barrinha cremosa de banana", 
        detalhes: "500g – Cremosa e doce, com sabor de banana", 
        preco: 31.90, 
        imagem: "assets/imagens/doces/foto10.png" 
    },
   
    { 
        id: 88, 
        categoria: "Doces", 
        nome: "Bala de doce de leite serra negra", 
        detalhes: "400g – Balas de doce de leite artesanais", 
        preco: 39.90, 
        imagem: "assets/imagens/doces/foto19.png" 
    },
    { 
        id: 89, 
        categoria: "Doces", 
        nome: "Doce pingo de leite famoso pote", 
        detalhes: "370g – Doce de leite em formato de pingo", 
        preco: 21.90, 
        imagem: "assets/imagens/doces/foto20.png" 
    },
    { 
        id: 90, 
        categoria: "Doces", 
        nome: "Cocada prove & aprove", 
        detalhes: "12un – Cocada artesanal, doce e saborosa", 
        preco: 34.90, 
        imagem: "assets/imagens/doces/foto21.png" 
    }
];

// ============================
// UTILITÁRIOS
// ============================

// Converte texto em formato BRL ("R$ 20,00") para número (20.00)
function parseBRL(str) {
    const n = String(str)
        .replace(/\s|R\$/g, '')
        .replace(/\./g, '')
        .replace(',', '.')
        .trim();
    const v = Number(n);
    return Number.isFinite(v) ? v : 0;
}

// Formata um número em moeda brasileira (ex: 20 -> "R$ 20,00")
const formatBRL = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// Carrega o carrinho do localStorage
const loadCart = () => {
    try {
        const cartData = localStorage.getItem('cart');
        return cartData ? new Map(JSON.parse(cartData)) : new Map();
    } catch (e) {
        console.error('Erro ao carregar o carrinho do localStorage:', e);
        return new Map();
    }
};

// Salva o carrinho no localStorage
const saveCart = (cart) => {
    try {
        const cartData = JSON.stringify([...cart]);
        localStorage.setItem('cart', cartData);
    } catch (e) {
        console.error('Erro ao salvar o carrinho no localStorage:', e);
    }
};

// ============================
// ESTADO GLOBAL DO CARRINHO
// ============================
const cart = loadCart();

// Seletores globais
let itemsNodeList;
let cartCountEl, cartTotalEl, cartItemsEl, cartEmptyEl;
let cartTotalModalEl, checkoutBtn, checkoutBtnModal, clearCartBtn;

// ============================
// RENDERIZAÇÃO DO CATÁLOGO (index.html)
// ============================
function renderizarCatalogo() {
    const catalogo = document.getElementById('catalogo');
    if (!catalogo) {
        console.warn('Elemento #catalogo não encontrado no DOM');
        return;
    }

    catalogo.innerHTML = '';

    const categorias = [...new Set(produtos.map(produto => produto.categoria))];

    categorias.forEach(categoria => {
        const secao = document.createElement('section');
        secao.className = `secao-${categoria.toLowerCase().replace(/\s/g, '-')}`;
        
        const titulo = document.createElement('h2');
        titulo.className = 'secao-titulo';
        titulo.textContent = categoria;
        secao.appendChild(titulo);

        const grid = document.createElement('div');
        grid.className = 'itens-grid';

        produtos
            .filter(produto => produto.categoria === categoria)
            .forEach(produto => {
                const artigo = document.createElement('article');
                artigo.className = 'item';
                artigo.dataset.id = produto.id;
                artigo.innerHTML = `
                    <img src="${produto.imagem}" alt="${produto.nome}">
                    <h2>${produto.nome}</h2>
                    <p class="details">${produto.detalhes}</p>
                    <p class="price">${formatBRL(produto.preco)}</p>
                    <div class="btn-group">
                        <button class="btn-remove">-</button>
                        <span class="quantity">${getQty(produto.id)}</span>
                        <button class="btn-add">+</button>
                    </div>
                `;
                grid.appendChild(artigo);

                // Adiciona eventos diretamente aos botões do item
                const btnAdd = artigo.querySelector('.btn-add');
                const btnRemove = artigo.querySelector('.btn-remove');
                const quantitySpan = artigo.querySelector('.quantity');

                if (btnAdd && btnRemove && quantitySpan) {
                    btnAdd.addEventListener('click', () => {
                        console.log(`Adicionando item ${produto.id}: ${produto.nome}`);
                        handleQtyChange(artigo, 1, quantitySpan);
                    });
                    btnRemove.addEventListener('click', () => {
                        console.log(`Removendo item ${produto.id}: ${produto.nome}`);
                        handleQtyChange(artigo, -1, quantitySpan);
                    });
                } else {
                    console.error(`Erro: Botões ou span de quantidade não encontrados para o item ${produto.id}`);
                }
            });

        secao.appendChild(grid);
        catalogo.appendChild(secao);
        catalogo.appendChild(document.createElement('hr')).className = 'secao-divisor';
    });

    // Atualiza itemsNodeList após a renderização
    itemsNodeList = document.querySelectorAll('.item');
    console.log(`Itens renderizados: ${itemsNodeList.length}`);
}

// ============================
// INICIALIZAÇÃO
// ============================
document.addEventListener('DOMContentLoaded', () => {
    // Seletores
    cartCountEl = document.getElementById('cartcount');
    cartTotalEl = document.getElementById('carttotal');
    cartItemsEl = document.getElementById('cartItems');
    cartEmptyEl = document.getElementById('cartEmpty');
    cartTotalModalEl = document.getElementById('cartTotalModal');
    checkoutBtn = document.getElementById('checkoutbtn');
    checkoutBtnModal = document.getElementById('checkoutBtnModal');
    clearCartBtn = document.getElementById('clearCart');

    // Verifica se os seletores foram encontrados
    if (!cartCountEl) console.warn('Elemento #cartcount não encontrado no DOM');
    if (!cartTotalEl) console.warn('Elemento #carttotal não encontrado no DOM');
    if (!cartItemsEl) console.warn('Elemento #cartItems não encontrado no DOM');
    if (!cartEmptyEl) console.warn('Elemento #cartEmpty não encontrado no DOM');
    if (!cartTotalModalEl) console.warn('Elemento #cartTotalModal não encontrado no DOM');
    if (!checkoutBtn) console.warn('Elemento #checkoutbtn não encontrado no DOM');
    if (!checkoutBtnModal) console.warn('Elemento #checkoutBtnModal não encontrado no DOM');
    if (!clearCartBtn) console.warn('Elemento #clearCart não encontrado no DOM');

    // Renderiza o catálogo se estiver na página index.html
    renderizarCatalogo();

    // Eventos da sacola (sacola.html)
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            console.log('Limpando carrinho');
            clearCart();
        });
    }
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            console.log('Finalizando pedido (index.html)');
            finalizeOrder();
        });
    }
    if (checkoutBtnModal) {
        checkoutBtnModal.addEventListener('click', () => {
            console.log('Finalizando pedido (sacola.html)');
            finalizeOrder();
        });
    }

    // Render inicial do carrinho
    renderCart();
    console.log('Carrinho inicializado:', [...cart]);
});

// ============================
// GERENCIAMENTO DO CARRINHO
// ============================
function handleQtyChange(itemEl, delta, span) {
    const info = readItemInfo(itemEl);
    console.log(`Atualizando item ${info.id}: ${info.name}, delta: ${delta}`);
    updateCart(info.id, info.name, info.price, info.image, delta);
    span.textContent = getQty(info.id);
    renderCart();
}

function readItemInfo(itemEl) {
    const h2 = itemEl.querySelector('h2');
    const priceEl = itemEl.querySelector('.price');
    const img = itemEl.querySelector('img');
    const info = {
        id: itemEl.dataset.id,
        name: h2 ? h2.textContent.trim() : 'Produto sem nome',
        price: priceEl ? parseBRL(priceEl.textContent.trim()) : 0,
        image: img ? img.src : ''
    };
    console.log('Informações do item:', info);
    return info;
}

function updateCart(id, name, price, image, delta) {
    const current = cart.get(id) || { id, name, price, image, qty: 0 };
    current.qty = Math.max(0, current.qty + delta);
    if (current.qty === 0) {
        cart.delete(id);
    } else {
        cart.set(id, current);
    }
    saveCart(cart);
    console.log('Carrinho atualizado:', [...cart]);
}

function getQty(id) {
    return cart.get(id)?.qty || 0;
}

// ============================
// ATUALIZAÇÃO DO GRID
// ============================
function syncGrid() {
    itemsNodeList = document.querySelectorAll('.item');
    if (itemsNodeList.length > 0) {
        itemsNodeList.forEach((el) => {
            const quantitySpan = el.querySelector('.quantity');
            if (quantitySpan) {
                quantitySpan.textContent = getQty(el.dataset.id);
            }
        });
    }
    console.log('Grid sincronizado');
}

// ============================
// RENDERIZAÇÃO DO CARRINHO
// ============================
function renderCart() {
    let totalItems = 0, totalAmount = 0;

    cart.forEach(({ qty, price }) => {
        totalItems += qty;
        totalAmount += price * qty;
    });

    if (cartCountEl) {
        cartCountEl.textContent = totalItems;
    }
    if (cartTotalEl) {
        cartTotalEl.textContent = formatBRL(totalAmount);
    }
    if (checkoutBtn) {
        checkoutBtn.disabled = totalItems === 0;
    }

    const cartBar = document.querySelector('.cart-bar');
    if (cartBar) {
        cartBar.classList.add('highlight');
        setTimeout(() => cartBar.classList.remove('highlight'), 300);
    }

    if (cartTotalModalEl) {
        cartTotalModalEl.textContent = formatBRL(totalAmount);
    }
    if (checkoutBtnModal) {
        checkoutBtnModal.disabled = totalItems === 0;
    }

    if (cartItemsEl) {
        cartItemsEl.innerHTML = '';
        if (totalItems === 0) {
            if (cartEmptyEl) cartEmptyEl.classList.remove('hidden');
            cartItemsEl.classList.add('hidden');
            return;
        }

        if (cartEmptyEl) cartEmptyEl.classList.add('hidden');
        cartItemsEl.classList.remove('hidden');

        cart.forEach((entry) => {
            const row = document.createElement('div');
            row.className = 'cart-item';
            const totalItem = entry.price * entry.qty;

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

            const incBtn = row.querySelector('[data-action="inc"]');
            const decBtn = row.querySelector('[data-action="dec"]');
            const removeBtn = row.querySelector('.cart-remove');

            if (incBtn) {
                incBtn.addEventListener('click', () => {
                    console.log(`Incrementando item ${entry.id}: ${entry.name}`);
                    updateCart(entry.id, entry.name, entry.price, entry.image, 1);
                    syncGrid();
                    renderCart();
                });
            }
            if (decBtn) {
                decBtn.addEventListener('click', () => {
                    console.log(`Decrementando item ${entry.id}: ${entry.name}`);
                    updateCart(entry.id, entry.name, entry.price, entry.image, -1);
                    syncGrid();
                    renderCart();
                });
            }
            if (removeBtn) {
                removeBtn.addEventListener('click', () => {
                    console.log(`Removendo item ${entry.id}: ${entry.name}`);
                    updateCart(entry.id, entry.name, entry.price, entry.image, -entry.qty);
                    syncGrid();
                    renderCart();
                });
            }

            cartItemsEl.appendChild(row);
        });
    }
    console.log('Carrinho renderizado:', { totalItems, totalAmount });
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

    cart.forEach(({ name, price, qty }) => {
        const subtotal = price * qty;
        total += subtotal;
        lines.push(`- ${name} | ${formatBRL(price)} x ${qty} = ${formatBRL(subtotal)}`);
    });

    lines.push('', `*Total do pedido: ${formatBRL(total)}*`);

    const message = encodeURIComponent(lines.join('\n'));
    const phone = '5537991243408';
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    cart.clear();
    saveCart(cart);
    syncGrid();
    renderCart();
    console.log('Pedido finalizado:', lines.join('\n'));
}