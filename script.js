// Classe base
class Produto {
    constructor(id, categoria, nome, detalhes, preco, imagem) {
        this.id = id;
        this.categoria = categoria;
        this.nome = nome;
        this.detalhes = detalhes;
        this.preco = preco;
        this.imagem = imagem;
    }
}

// Classes derivadas com itens embutidos
class QueijoTradicional extends Produto {
    constructor(id, nome, detalhes, preco, imagem) {
        super(id, "Queijos tradicionais", nome, detalhes, preco, imagem);
    }

    static itens = [
        {
            id: 0,
            categoria: "Queijos tradicionais",
            nome: "Queijo palito",
            detalhes: "450g – Queijo em palito artesanal",
            preco: 70.00,
            imagem: "assets/imagens/tradicionais/foto1.png"
        },
        {
            id: 1,
            categoria: "Queijos tradicionais",
            nome: "Queijo trança",
            detalhes: "450g – Pura, defumada, alho ou temperada",
            preco: 70.00,
            imagem: "assets/imagens/tradicionais/foto2.png"
        },
        {
            id: 2,
            categoria: "Queijos tradicionais",
            nome: "Queijo nozinho",
            detalhes: "450g – Tradicional artesanal",
            preco: 70.00,
            imagem: "assets/imagens/tradicionais/foto3.png"
        },
        {
            id: 3,
            categoria: "Queijos tradicionais",
            nome: "Kit trançinha",
            detalhes: "400g – Kit com tranças variadas",
            preco: 70.00,
            imagem: "assets/imagens/tradicionais/foto4.png"
        },
        {
            id: 4,
            categoria: "Queijos tradicionais",
            nome: "Queijo tipo reino",
            detalhes: "450g – Queijo tipo reino tradicional",
            preco: 70.00,
            imagem: "assets/imagens/tradicionais/foto5.png"
        },
        {
            id: 5,
            categoria: "Queijos tradicionais",
            nome: "Queijo provolone",
            detalhes: "450g – Provolone artesanal",
            preco: 70.00,
            imagem: "assets/imagens/tradicionais/foto8.png"
        },
        {
            id: 6,
            categoria: "Queijos tradicionais",
            nome: "Kit provoleto",
            detalhes: "450g – Kit de provolones especiais",
            preco: 85.00,
            imagem: "assets/imagens/tradicionais/foto9.png"
        },
        {
            id: 7,
            categoria: "Queijos tradicionais",
            nome: "Kit provolone c/ lombo",
            detalhes: "450g – Provolone com lombo defumado",
            preco: 85.00,
            imagem: "assets/imagens/tradicionais/foto10.png"
        },
        {
            id: 8,
            categoria: "Queijos tradicionais",
            nome: "Kit quatro queijos",
            detalhes: "450g – Seleção de quatro queijos",
            preco: 75.00,
            imagem: "assets/imagens/tradicionais/foto11.png"
        },
        {
            id: 9,
            categoria: "Queijos tradicionais",
            nome: "Queijo cabacinha",
            detalhes: "450g – Queijo cabacinha artesanal",
            preco: 70.00,
            imagem: "assets/imagens/tradicionais/foto12.png"
        },
        {
            id: 10,
            categoria: "Queijos tradicionais",
            nome: "Queijo minas padrão",
            detalhes: "450g – Queijo minas padrão tradicional",
            preco: 70.00,
            imagem: "assets/imagens/tradicionais/foto13.png"
        },
        {
            id: 11,
            categoria: "Queijos tradicionais",
            nome: "Queijo minas com goiabada",
            detalhes: "450g – Combinação clássica queijo e goiabada",
            preco: 85.00,
            imagem: "assets/imagens/tradicionais/foto14.png"
        },
        {
            id: 12,
            categoria: "Queijos tradicionais",
            nome: "Queijo minas",
            detalhes: "450g – Queijo minas artesanal",
            preco: 85.00,
            imagem: "assets/imagens/tradicionais/foto15.png"
        },
        {
            id: 13,
            categoria: "Queijos tradicionais",
            nome: "Queijo minas Frescal Buritis",
            detalhes: "400g – Versão light do minas frescal",
            preco: 70.00,
            imagem: "assets/imagens/tradicionais/foto16.png"
        },
        {
            id: 14,
            categoria: "Queijos tradicionais",
            nome: "Queijo trança ao vinho",
            detalhes: "450g – Trança curada no vinho",
            preco: 75.00,
            imagem: "assets/imagens/tradicionais/foto17.png"
        },
        {
            id: 15,
            categoria: "Queijos tradicionais",
            nome: "Queijo coalho barra",
            detalhes: "450g – Barra de coalho artesanal",
            preco: 70.00,
            imagem: "assets/imagens/tradicionais/foto18.png"
        },
        {
            id: 16,
            categoria: "Queijos tradicionais",
            nome: "Requeijão em barra",
            detalhes: "450g – Requeijão em formato de barra",
            preco: 75.00,
            imagem: "assets/imagens/tradicionais/foto19.png"
        }
    ];
}

class Desidratado extends Produto {
    constructor(id, nome, detalhes, preco, imagem) {
        super(id, "Desidratados", nome, detalhes, preco, imagem);
    }

    static itens = [
        {
            id: 17,
            categoria: "Desidratados",
            nome: "Chips de provolone puro",
            detalhes: "180g – Crocante e saboroso",
            preco: 40.00,
            imagem: "assets/imagens/chips_queijo/chips1.png"
        },
        {
            id: 18,
            categoria: "Desidratados",
            nome: "Chips de provolone com chimichurri",
            detalhes: "180g – Sabor com tempero especial",
            preco: 40.00,
            imagem: "assets/imagens/chips_queijo/chips2.png"
        },
        {
            id: 19,
            categoria: "Desidratados",
            nome: "Chips de provolone recheado com goiabada",
            detalhes: "180g – Goiabada e queijo",
            preco: 50.00,
            imagem: "assets/imagens/chips_queijo/chips3.png"
        },
        {
            id: 20,
            categoria: "Desidratados",
            nome: "Chips tipo gouda",
            detalhes: "180g – Sabor suave e crocante",
            preco: 40.00,
            imagem: "assets/imagens/chips_queijo/chips4.png"
        },
        {
            id: 21,
            categoria: "Desidratados",
            nome: "Chips de queijo coalho",
            detalhes: "180g – Sabor clássico do nordeste",
            preco: 45.00,
            imagem: "assets/imagens/chips_queijo/chips5.png"
        },
        {
            id: 22,
            categoria: "Desidratados",
            nome: "Chips de provolone limon pepper",
            detalhes: "180g – Sabor clássico do nordeste",
            preco: 40.00,
            imagem: "assets/imagens/chips_queijo/chips6.png"
        },
        {
            id: 23,
            categoria: "Desidratados",
            nome: "Chips de provolone com pimenta",
            detalhes: "180g – Sabor clássico do nordeste",
            preco: 40.00,
            imagem: "assets/imagens/chips_queijo/chips7.png"
        }
    ];
}

class QueijoEspecial extends Produto {
    constructor(id, nome, detalhes, preco, imagem) {
        super(id, "Queijos Especiais", nome, detalhes, preco, imagem);
    }

    static itens = [
        {
            id: 24,
            categoria: "Queijos Especiais",
            nome: "Requeijão de Búfala",
            detalhes: "180g – Crocante e saboroso",
            preco: 75.00,
            imagem: "assets/imagens/especiais/especiais1.png"
        },
        {
            id: 25,
            categoria: "Queijos Especiais",
            nome: "Queijo de búfala com requeijão",
            detalhes: "180g – Sabor com tempero especial",
            preco: 85.00,
            imagem: "assets/imagens/especiais/especiais2.png"
        },
        {
            id: 26,
            categoria: "Queijos Especiais",
            nome: "Queijo minas zero lactose",
            detalhes: "180g – Sabor com tempero especial",
            preco: 75.00,
            imagem: "assets/imagens/especiais/especiais3.png"
        },
        {
            id: 27,
            categoria: "Queijos Especiais",
            nome: "Queijo de cabra",
            detalhes: "180g – Sabor suave e crocante",
            preco: 400.00,
            imagem: "assets/imagens/especiais/especiais4.png"
        },
        {
            id: 28,
            categoria: "Queijos Especiais",
            nome: "Queijo mussarela de búfala",
            detalhes: "180g – Sabor clássico",
            preco: 75.00,
            imagem: "assets/imagens/especiais/especiais5.png"
        },
        {
            id: 29,
            categoria: "Queijos Especiais",
            nome: "Queijo palito mussarela de búfala",
            detalhes: "180g – Sabor clássico",
            preco: 90.00,
            imagem: "assets/imagens/especiais/especiais6.png"
        },
        {
            id: 30,
            categoria: "Queijos Especiais",
            nome: "Queijo palito zero lactose",
            detalhes: "180g – Sabor clássico",
            preco: 70.00,
            imagem: "assets/imagens/especiais/especiais7.png"
        },
        {
            id: 31,
            categoria: "Queijos Especiais",
            nome: "Queijo gruyere",
            detalhes: "180g – Sabor clássico",
            preco: 85.00,
            imagem: "assets/imagens/especiais/especiais8.png"
        }
    ];
}

class QueijoTrufado extends Produto {
    constructor(id, nome, detalhes, preco, imagem) {
        super(id, "Queijos trufados", nome, detalhes, preco, imagem);
    }

    static itens = [
        {
            id: 32,
            categoria: "Queijos trufados",
            nome: "Queijo recheado com requeijão, damasco e avelã",
            detalhes: "700g – Doce e cremoso",
            preco: 65.00,
            imagem: "assets/imagens/trufados/trufado1.png"
        },
        {
            id: 33,
            categoria: "Queijos trufados",
            nome: "Queijo recheado com requeijão e tomate seco",
            detalhes: "500g – Leve e aromático",
            preco: 60.00,
            imagem: "assets/imagens/trufados/trufado2.png"
        },
        {
            id: 34,
            categoria: "Queijos trufados",
            nome: "Queijo recheado com cheddar",
            detalhes: "500g – Sabor intenso",
            preco: 60.00,
            imagem: "assets/imagens/trufados/trufado3.png"
        },
        {
            id: 35,
            categoria: "Queijos trufados",
            nome: "Queijo recheado com requeijão e azeitona",
            detalhes: "800g – Salgado e marcante",
            preco: 60.00,
            imagem: "assets/imagens/trufados/trufado4.png"
        },
        {
            id: 36,
            categoria: "Queijos trufados",
            nome: "Queijo recheado com cheddar e carne seca",
            detalhes: "500g – Robusto e saboroso",
            preco: 85.00,
            imagem: "assets/imagens/trufados/trufado5.png"
        },
        {
            id: 37,
            categoria: "Queijos trufados",
            nome: "Queijo recheado com requeijão",
            detalhes: "500g – Leve e cremoso",
            preco: 70.00,
            imagem: "assets/imagens/trufados/trufado6.png"
        },
        {
            id: 38,
            categoria: "Queijos trufados",
            nome: "Queijo recheado com goiabada",
            detalhes: "500g – Goiabada cremosa",
            preco: 75.00,
            imagem: "assets/imagens/trufados/trufado7.png"
        },
        {
            id: 39,
            categoria: "Queijos trufados",
            nome: "Queijo recheado com nutella",
            detalhes: "500g – Nutella cremosa",
            preco: 75.00,
            imagem: "assets/imagens/trufados/trufado8.png"
        },
        {
            id: 40,
            categoria: "Queijos trufados",
            nome: "Queijo recheado com doce de leite",
            detalhes: "500g – Doce suave",
            preco: 75.00,
            imagem: "assets/imagens/trufados/trufado9.png"
        },
        {
            id: 41,
            categoria: "Queijos trufados",
            nome: "Queijo recheado com requeijão e carne seca",
            detalhes: "500g – Sabor irresistível",
            preco: 85.00,
            imagem: "assets/imagens/trufados/trufado11.png"
        }
    ];
}

class QueijoFino extends Produto {
    constructor(id, nome, detalhes, preco, imagem) {
        super(id, "Queijos finos", nome, detalhes, preco, imagem);
    }

    static itens = [
        {
            id: 42,
            categoria: "Queijos finos",
            nome: "Queijo canastra meia-cura",
            detalhes: "500g – Tradição mineira",
            preco: 145.00,
            imagem: "assets/imagens/queijos_finos/foto1.png"
        },
        {
            id: 43,
            categoria: "Queijos finos",
            nome: "Queijo parmesão cunha",
            detalhes: "400g – Toque marcante",
            preco: 75.00,
            imagem: "assets/imagens/queijos_finos/foto2.png"
        },
        {
            id: 44,
            categoria: "Queijos finos",
            nome: "Queijo canastra serjão",
            detalhes: "1100g – Doce mineiro",
            preco: 195.00,
            imagem: "assets/imagens/queijos_finos/foto3.png"
        },
        {
            id: 45,
            categoria: "Queijos finos",
            nome: "Kit parmesão artesanal (defumado, temperado, vinho e tradicional)",
            detalhes: "180g – Sabores variados",
            preco: 75.00,
            imagem: "assets/imagens/queijos_finos/foto4.png"
        },
        {
            id: 46,
            categoria: "Queijos finos",
            nome: "Queijo canastra moldura",
            detalhes: "1000g – Sabor autêntico da canastra",
            preco: 180.00,
            imagem: "assets/imagens/queijos_finos/foto5.png"
        },
        {
            id: 47,
            categoria: "Queijos finos",
            nome: "Queijo gorgonzola",
            detalhes: "125g – Aroma intenso",
            preco: 45.00,
            imagem: "assets/imagens/queijos_finos/foto6.png"
        },
        {
            id: 48,
            categoria: "Queijos finos",
            nome: "Queijo canastra barreirinha",
            detalhes: "1000g – Aroma intenso",
            preco: 150.00,
            imagem: "assets/imagens/queijos_finos/foto7.png"
        },
        {
            id: 49,
            categoria: "Queijos finos",
            nome: "Queijo brisa",
            detalhes: "450g – Sabor marcante, perfeito para molhos",
            preco: 140.00,
            imagem: "assets/imagens/queijos_finos/foto8.png"
        },
        {
            id: 50,
            categoria: "Queijos finos",
            nome: "Queijo canastra johnne premiado",
            detalhes: "1000g – Premiado e cheio de personalidade",
            preco: 180.00,
            imagem: "assets/imagens/queijos_finos/foto9.png"
        },
        {
            id: 51,
            categoria: "Queijos finos",
            nome: "Queijo canastra reinaldo",
            detalhes: "1000g – Autêntico sabor mineiro",
            preco: 195.00,
            imagem: "assets/imagens/queijos_finos/foto11.png"
        },
        {
            id: 52,
            categoria: "Queijos finos",
            nome: "Kit parmesão (tradicional, capa preta, defumado e temperado)",
            detalhes: "500g – Variedade para todos os paladares",
            preco: 85.00,
            imagem: "assets/imagens/queijos_finos/foto12.png"
        },
        {
            id: 53,
            categoria: "Queijos finos",
            nome: "Burrata de búfala",
            detalhes: "300g – Cremosa e sofisticada",
            preco: 45.00,
            imagem: "assets/imagens/queijos_finos/foto13.png"
        },
        {
            id: 54,
            categoria: "Queijos finos",
            nome: "Queijo morbier",
            detalhes: "500g – Clássico francês de sabor único",
            preco: 75.00,
            imagem: "assets/imagens/queijos_finos/foto14.png"
        },
        {
            id: 55,
            categoria: "Queijos finos",
            nome: "Queijo tipo brie",
            detalhes: "180g – Delicado e saboroso",
            preco: 45.00,
            imagem: "assets/imagens/queijos_finos/foto15.png"
        },
        {
            id: 56,
            categoria: "Queijos finos",
            nome: "Queijo camembert",
            detalhes: "350g – Cremoso e sofisticado",
            preco: 85.00,
            imagem: "assets/imagens/queijos_finos/foto16.png"
        },
        {
            id: 57,
            categoria: "Queijos finos",
            nome: "Queijo mussarela de búfala em bolinha (tradicional, azeitona, damasco e cereja)",
            detalhes: "250g – Frescor e versatilidade em cada bolinha",
            preco: 45.00,
            imagem: "assets/imagens/queijos_finos/foto17.png"
        },
        {
            id: 58,
            categoria: "Queijos finos",
            nome: "Queijo tipo grana",
            detalhes: "220g – Encorpado, ideal para massas",
            preco: 65.00,
            imagem: "assets/imagens/queijos_finos/foto18.png"
        },
        {
            id: 59,
            categoria: "Queijos finos",
            nome: "Colonial Serra Da Abelha",
            detalhes: "900g – Tradição tem nome",
            preco: 140.00,
            imagem: "assets/imagens/queijos_finos/foto19.jpeg"
        }
    ];
}

class Diversos extends Produto {
    constructor(id, nome, detalhes, preco, imagem) {
        super(id, "Diversos", nome, detalhes, preco, imagem);
    }

    static itens = [
        {
            id: 60,
            categoria: "Diversos",
            nome: "Presunto tenro bolinha juliatto",
            detalhes: "700g – Macio, defumado e sabor marcante",
            preco: 85.00,
            imagem: "assets/imagens/Diversos/foto1.png"
        },
        {
            id: 61,
            categoria: "Diversos",
            nome: "Picanha suína",
            detalhes: "650g – Suculenta, com tempero especial",
            preco: 65.00,
            imagem: "assets/imagens/Diversos/foto2.png"
        },
        {
            id: 62,
            categoria: "Diversos",
            nome: "Costelinha com queijo",
            detalhes: "450g – Ancho suíno macio e suculento",
            preco: 115.00,
            imagem: "assets/imagens/Diversos/foto5.png"
        },
        {
            id: 63,
            categoria: "Diversos",
            nome: "Géleias uai",
            detalhes: "200g – Pura, defumada, c/ abacaxi, c/ hortelã, c/ damasco, c/ cereja, c/ limão, e c/ frutas vermelhas",
            preco: 40.00,
            imagem: "assets/imagens/Diversos/foto6.png"
        },
        {
            id: 64,
            categoria: "Diversos",
            nome: "Manteiga de Leite caipira",
            detalhes: "200g – Cremosa e artesanal",
            preco: 40.00,
            imagem: "assets/imagens/Diversos/foto7.png"
        },
        {
            id: 65,
            categoria: "Diversos",
            nome: "Mel silvestre",
            detalhes: "250g – Mel puro e natural",
            preco: 48.00,
            imagem: "assets/imagens/Diversos/foto8.png"
        },
        {
            id: 66,
            categoria: "Diversos",
            nome: "Géleia de mostarda trem bão",
            detalhes: "Mostarda c/ Maracujá e Mostarda Picante",
            preco: 40.00,
            imagem: "assets/imagens/Diversos/foto9.png"
        },
        {
            id: 67,
            categoria: "Diversos",
            nome: "Mel silvestre",
            detalhes: "500g – Mel puro e natural",
            preco: 50.00,
            imagem: "assets/imagens/Diversos/foto10.png"
        },
        {
            id: 68,
            categoria: "Diversos",
            nome: "Mostarda jalapeño e manga defumada",
            detalhes: "200g – Sabor exótico e picante",
            preco: 40.00,
            imagem: "assets/imagens/Diversos/foto11.png"
        }
    ];
}

class Salaminho extends Produto {
    constructor(id, nome, detalhes, preco, imagem) {
        super(id, "Salaminhos", nome, detalhes, preco, imagem);
    }

    static itens = [
        {
            id: 75,
            categoria: "Salaminhos",
            nome: "Lombo nobre defumado c/ pimenta biquinho",
            detalhes: "200g – Defumado artesanal, toque suave da pimenta biquinho",
            preco: 48.00,
            imagem: "assets/imagens/salaminhos/foto1.png"
        },
        {
            id: 76,
            categoria: "Salaminhos",
            nome: "Lombo nobre defumado c/ alho",
            detalhes: "200g – Sabor marcante com o toque especial do alho",
            preco: 48.00,
            imagem: "assets/imagens/salaminhos/foto2.png"
        },
        {
            id: 77,
            categoria: "Salaminhos",
            nome: "Salame italiano fatiado",
            detalhes: "200g – Receita clássica italiana, sabor intenso e equilibrado",
            preco: 75.00,
            imagem: "assets/imagens/salaminhos/foto3.png"
        },
        {
            id: 78,
            categoria: "Salaminhos",
            nome: "Salaminho c/ azeitona",
            detalhes: "200g – Combinação saborosa de salame com azeitonas selecionadas",
            preco: 48.00,
            imagem: "assets/imagens/salaminhos/foto4.png"
        },
        {
            id: 79,
            categoria: "Salaminhos",
            nome: "Lombo nobre defumado c/ pimenta calabresa",
            detalhes: "200g – Defumado intenso com o toque picante da calabresa",
            preco: 48.00,
            imagem: "assets/imagens/salaminhos/foto5.png"
        },
        {
            id: 80,
            categoria: "Salaminhos",
            nome: "Salame frango c/ azeitona",
            detalhes: "200g – Leve, saboroso e realçado com azeitonas selecionadas",
            preco: 48.00,
            imagem: "assets/imagens/salaminhos/foto6.png"
        },
        {
            id: 81,
            categoria: "Salaminhos",
            nome: "Salame frango c/ provolone",
            detalhes: "200g – Combinação única de frango suave e queijo provolone",
            preco: 48.00,
            imagem: "assets/imagens/salaminhos/foto7.png"
        },
        {
            id: 82,
            categoria: "Salaminhos",
            nome: "Lombo nobre defumado",
            detalhes: "200g – Clássico e saboroso, defumado artesanalmente",
            preco: 48.00,
            imagem: "assets/imagens/salaminhos/foto8.png"
        }
    ];
}

class Rosquinhas extends Produto {
    constructor(id, nome, detalhes, preco, imagem) {
        super(id, "Rosquinhas", nome, detalhes, preco, imagem);
    }

    static itens = [
        {
            id: 69,
            categoria: "Rosquinhas",
            nome: "Rosquinha de nata",
            detalhes: "500g – Pura c/ açúcar, pura sem açúcar e c/ canela",
            preco: 48.00,
            imagem: "assets/imagens/rosquinhas/foto1.png"
        },
        {
            id: 70,
            categoria: "Rosquinhas",
            nome: "Casadinho de goiabada",
            detalhes: "500g Combinação de goiabada e massa de rosquinha",
            preco: 48.00,
            imagem: "assets/imagens/rosquinhas/foto2.png"
        },
        {
            id: 71,
            categoria: "Rosquinhas",
            nome: "Casadinho de leite ninho",
            detalhes: "500g – Combinação saborosa de leite ninho",
            preco: 48.00,
            imagem: "assets/imagens/rosquinhas/foto3.png"
        },
        {
            id: 72,
            categoria: "Rosquinhas",
            nome: "Rosquinha de doce de leite",
            detalhes: "500g – Sabor intenso de doce de leite, crocante e deliciosa",
            preco: 48.00,
            imagem: "assets/imagens/rosquinhas/foto4.png"
        },
        {
            id: 73,
            categoria: "Rosquinhas",
            nome: "Beliscão de goiabada",
            detalhes: "500g – Levemente adocicado, crocante e saborosa",
            preco: 48.00,
            imagem: "assets/imagens/rosquinhas/foto5.png"
        },
        {
            id: 74,
            categoria: "Rosquinhas",
            nome: "Casadinho de chocolate",
            detalhes: "500g – Sabor suave de chocolate, crocante e deliciosa",
            preco: 48.00,
            imagem: "assets/imagens/rosquinhas/foto6.png"
        }
    ];
}

class Doce extends Produto {
    constructor(id, nome, detalhes, preco, imagem) {
        super(id, "Doces", nome, detalhes, preco, imagem);
    }

    static itens = [
        {
            id: 83,
            categoria: "Doces",
            nome: "Doce de leite viçosa tradicional",
            detalhes: "800g – Cremoso e tradicional, com sabor marcante",
            preco: 75.00,
            imagem: "assets/imagens/doces/foto1.png"
        },
        {
            id: 84,
            categoria: "Doces",
            nome: "Doce de leite viçosa com café, chocolate e coco",
            detalhes: "400g – Variedade de sabores: café, chocolate e coco",
            preco: 45.00,
            imagem: "assets/imagens/doces/foto2.png"
        },
        {
            id: 85,
            categoria: "Doces",
            nome: "Goiabada cascão vovó zélia",
            detalhes: "800g – Goiabada artesanal com textura rústica",
            preco: 65.00,
            imagem: "assets/imagens/doces/foto3.png"
        },
        {
            id: 86,
            categoria: "Doces",
            nome: "Bananada vovô olavo",
            detalhes: "450g – Bananada tradicional com sabor marcante",
            preco: 48.00,
            imagem: "assets/imagens/doces/foto6.png"
        },
        {
            id: 87,
            categoria: "Doces",
            nome: "Paçoca em barra delícia mineira",
            detalhes: "500g – Paçoca artesanal com textura única",
            preco: 50.00,
            imagem: "assets/imagens/doces/foto8.png"
        },
        {
            id: 88,
            categoria: "Doces",
            nome: "Bala de banana zero açúcar",
            detalhes: "500g – Sabor de banana sem açúcar",
            preco: 48.00,
            imagem: "assets/imagens/doces/foto9.png"
        },
        {
            id: 89,
            categoria: "Doces",
            nome: "Barrinha cremosa de banana",
            detalhes: "500g – Cremosa e doce, com sabor de banana",
            preco: 70.00,
            imagem: "assets/imagens/doces/foto10.png"
        },
        {
            id: 90,
            categoria: "Doces",
            nome: "Doce de leite rocca tradicional",
            detalhes: "450g – Doce de leite artesanal clássico",
            preco: 48.00,
            imagem: "assets/imagens/doces/foto14.png"
        },
        {
            id: 91,
            categoria: "Doces",
            nome: "Doce de leite rocca c/ café e coco",
            detalhes: "500g – Sabores de café e coco em doce de leite",
            preco: 48.00,
            imagem: "assets/imagens/doces/foto15.png"
        },
        {
            id: 92,
            categoria: "Doces",
            nome: "Doce de leite diet zero lactose fazenda",
            detalhes: "430g – Doce de leite diet sem lactose",
            preco: 60.00,
            imagem: "assets/imagens/doces/foto16.png"
        },
        {
            id: 93,
            categoria: "Doces",
            nome: "Doce de leite vimilk",
            detalhes: "700g – Cremoso e tradicional, com sabor marcante",
            preco: 50.00,
            imagem: "assets/imagens/doces/foto18.png"
        },
        {
            id: 94,
            categoria: "Doces",
            nome: "Bala de doce de leite serra negra",
            detalhes: "400g – Balas de doce de leite artesanais",
            preco: 48.00,
            imagem: "assets/imagens/doces/foto19.png"
        },
        {
            id: 95,
            categoria: "Doces",
            nome: "Doce pingo de leite famoso pote",
            detalhes: "370g – Doce de leite em formato de pingo",
            preco: 48.00,
            imagem: "assets/imagens/doces/foto20.png"
        },
        {
            id: 96,
            categoria: "Doces",
            nome: "Cocada prove & aprove",
            detalhes: "12un – Cocada artesanal, doce e saborosa",
            preco: 60.00,
            imagem: "assets/imagens/doces/foto21.png"
        }
    ];
}

// Lista de produtos combinando todas as categorias
const produtos = [
    ...QueijoTradicional.itens,
    ...Desidratado.itens,
    ...QueijoEspecial.itens,
    ...QueijoTrufado.itens,
    ...QueijoFino.itens,
    ...Diversos.itens,
    ...Rosquinhas.itens,
    ...Salaminho.itens,
    ...Doce.itens
];

// Lista de IDs dos produtos mais vendidos (mapeados para novos IDs)
const maisVendidosIds = [
    7,   // Kit provolone c/ lombo (Queijos tradicionais)
    19,  // Chips de provolone recheado com goiabada (Desidratados)
    40,  // Queijo recheado com doce de leite (Queijos trufados)
    39,  // Queijo recheado com nutella (Queijos trufados)
    61,  // Picanha suína (Diversos)
    75,  // Lombo nobre defumado c/ pimenta biquinho (Salaminhos)
    83,  // Doce de leite viçosa tradicional (Doces)
    95   // Doce pingo de leite famoso pote (Doces)
];

// Estado do carrinho
let carrinho = new Map();

// Seletores globais
let itemsNodeList;
let cartCountEl, cartTotalEl, cartItemsEl, cartEmptyEl;
let cartTotalModalEl, checkoutBtn, checkoutBtnModal, clearCartBtn;

// Utilitários
function parseBRL(str) {
    const n = String(str)
        .replace(/\s|R\$/g, "")
        .replace(/\./g, "")
        .replace(",", ".")
        .trim();
    const v = Number(n);
    return Number.isFinite(v) ? v : 0;
}

const formatBRL = (v) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const loadCart = () => {
    try {
        const cartData = localStorage.getItem("cart");
        return cartData ? new Map(JSON.parse(cartData)) : new Map();
    } catch (e) {
        console.error("Erro ao carregar o carrinho do localStorage:", e);
        return new Map();
    }
};

const saveCart = (cart) => {
    try {
        const cartData = JSON.stringify([...cart]);
        localStorage.setItem("cart", cartData);
    } catch (e) {
        console.error("Erro ao salvar o carrinho no localStorage:", e);
    }
};

// Função para inicializar zoom nas imagens
const initializeZoom = () => {
    const zoomableImages = document.querySelectorAll(".item img, .cart-item img");
    zoomableImages.forEach((img) => {
        let scale = 1;
        let startX = 0;
        let startY = 0;
        let isZooming = false;

        img.addEventListener("touchstart", (e) => {
            if (e.touches.length === 2) {
                isZooming = true;
                const touch1 = e.touches[0];
                const touch2 = e.touches[1];
                startX = (touch1.clientX + touch2.clientX) / 2;
                startY = (touch1.clientY + touch2.clientY) / 2;
                img.style.transformOrigin = `${startX - img.getBoundingClientRect().left}px ${startY - img.getBoundingClientRect().top}px`;
            }
        });

        img.addEventListener("touchmove", (e) => {
            if (isZooming && e.touches.length === 2) {
                e.preventDefault();
                const touch1 = e.touches[0];
                const touch2 = e.touches[1];
                const currentDistance = Math.hypot(
                    touch2.clientX - touch1.clientX,
                    touch2.clientY - touch1.clientY
                );
                const startDistance = Math.hypot(
                    touch2.clientX - touch1.clientX,
                    touch2.clientY - touch1.clientY
                );
                scale = Math.min(Math.max(1, scale * (currentDistance / startDistance)), 3);
                img.style.transform = `scale(${scale})`;
            }
        });

        img.addEventListener("touchend", () => {
            isZooming = false;
            if (scale > 1) {
                setTimeout(() => {
                    scale = 1;
                    img.style.transform = `scale(${scale})`;
                }, 200);
            }
        });
    });
};

// Função para renderizar os produtos na página
function renderizarProdutos() {
    const catalogo = document.getElementById("catalogo");
    if (!catalogo) {
        console.error("Elemento #catalogo não encontrado no DOM");
        return;
    }
    catalogo.innerHTML = "";

    // Seção Mais Vendidos
    const secaoMaisVendidos = document.createElement("section");
    secaoMaisVendidos.className = "secao-mais-vendidos";

    const tituloMaisVendidos = document.createElement("h2");
    tituloMaisVendidos.className = "secao-titulo";
    tituloMaisVendidos.textContent = "Mais Vendidos";
    secaoMaisVendidos.appendChild(tituloMaisVendidos);

    const gridMaisVendidos = document.createElement("div");
    gridMaisVendidos.className = "itens-grid";

    produtos
        .filter((produto) => maisVendidosIds.includes(produto.id))
        .forEach((produto) => {
            const artigo = document.createElement("article");
            artigo.className = "item";
            artigo.dataset.id = produto.id;
            artigo.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}" onerror="this.onerror=null; this.src='assets/imagens/placeholder.png'; console.error('Erro ao carregar imagem: ${produto.imagem}');">
                <h2>${produto.nome}</h2>
                <p class="details">${produto.detalhes}</p>
                <p class="price">${formatBRL(produto.preco)}</p>
                <div class="btn-group">
                    <button class="btn-remove">-</button>
                    <span class="quantity">${getQty(produto.id)}</span>
                    <button class="btn-add">+</button>
                </div>
            `;
            gridMaisVendidos.appendChild(artigo);

            const btnAdd = artigo.querySelector(".btn-add");
            const btnRemove = artigo.querySelector(".btn-remove");
            const quantitySpan = artigo.querySelector(".quantity");

            if (btnAdd && btnRemove && quantitySpan) {
                btnAdd.addEventListener("click", (e) => {
                    console.log(`Adicionando item ${produto.id}: ${produto.nome}`);
                    const img = artigo.querySelector("img");
                    const willFly = !!img;
                    handleQtyChange(artigo, 1, quantitySpan, !willFly);
                    if (willFly) flyToCart(img);
                });
                btnRemove.addEventListener("click", () => {
                    console.log(`Removendo item ${produto.id}: ${produto.nome}`);
                    handleQtyChange(artigo, -1, quantitySpan);
                });
            } else {
                console.error(
                    `Erro: Botões ou span de quantidade não encontrados para o item ${produto.id}`
                );
            }
        });

    secaoMaisVendidos.appendChild(gridMaisVendidos);
    catalogo.appendChild(secaoMaisVendidos);
    catalogo.appendChild(document.createElement("hr")).className = "secao-divisor";

    // Renderizar as demais categorias
    const categorias = [...new Set(produtos.map((produto) => produto.categoria))];

    categorias.forEach((categoria) => {
        const secao = document.createElement("section");
        secao.className = `secao-${categoria.toLowerCase().replace(/\s/g, "-")}`;

        const titulo = document.createElement("h2");
        titulo.className = "secao-titulo";
        titulo.textContent = categoria;
        secao.appendChild(titulo);

        const grid = document.createElement("div");
        grid.className = "itens-grid";

        produtos
            .filter((produto) => produto.categoria === categoria)
            .forEach((produto) => {
                const artigo = document.createElement("article");
                artigo.className = "item";
                artigo.dataset.id = produto.id;
                artigo.innerHTML = `
                    <img src="${produto.imagem}" alt="${produto.nome}" onerror="this.onerror=null; this.src='assets/imagens/placeholder.png'; console.error('Erro ao carregar imagem: ${produto.imagem}');">
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

                const btnAdd = artigo.querySelector(".btn-add");
                const btnRemove = artigo.querySelector(".btn-remove");
                const quantitySpan = artigo.querySelector(".quantity");

                if (btnAdd && btnRemove && quantitySpan) {
                    btnAdd.addEventListener("click", (e) => {
                        console.log(`Adicionando item ${produto.id}: ${produto.nome}`);
                        const img = artigo.querySelector("img");
                        const willFly = !!img;
                        handleQtyChange(artigo, 1, quantitySpan, !willFly);
                        // Animação de voar para o carrinho
                        if (willFly) flyToCart(img);
                    });
                    btnRemove.addEventListener("click", () => {
                        console.log(`Removendo item ${produto.id}: ${produto.nome}`);
                        handleQtyChange(artigo, -1, quantitySpan);
                    });
                } else {
                    console.error(
                        `Erro: Botões ou span de quantidade não encontrados para o item ${produto.id}`
                    );
                }
            });

        secao.appendChild(grid);
        catalogo.appendChild(secao);
        catalogo.appendChild(document.createElement("hr")).className = "secao-divisor";
    });

    itemsNodeList = document.querySelectorAll(".item");
    initializeZoom(); // Inicializa o zoom após renderizar
    console.log(`Itens renderizados: ${itemsNodeList.length}`);
}

// Gerenciamento do carrinho
function handleQtyChange(itemEl, delta, span, triggerHighlight = true) {
    const info = readItemInfo(itemEl);
    console.log(`Atualizando item ${info.id}: ${info.name}, delta: ${delta}`);
    updateCart(info.id, info.name, info.price, info.image, delta);
    span.textContent = getQty(info.id);
    renderCart(triggerHighlight);

    if (delta > 0) {
        showToast(`${info.name} adicionado à sacola!`, 'success');
    }
}

function readItemInfo(itemEl) {
    const h2 = itemEl.querySelector("h2");
    const priceEl = itemEl.querySelector(".price");
    const img = itemEl.querySelector("img");
    const info = {
        id: parseInt(itemEl.dataset.id),
        name: h2 ? h2.textContent.trim() : "Produto sem nome",
        price: priceEl ? parseBRL(priceEl.textContent.trim()) : 0,
        image: img ? img.src : ""
    };
    console.log("Informações do item:", info);
    return info;
}

function updateCart(id, name, price, image, delta) {
    const current = carrinho.get(id.toString()) || { id, name, price, image, qty: 0 };
    current.qty = Math.max(0, current.qty + delta);
    if (current.qty === 0) {
        carrinho.delete(id.toString());
    } else {
        carrinho.set(id.toString(), current);
    }
    saveCart(carrinho);
    console.log("Carrinho atualizado:", [...carrinho]);
}

function getQty(id) {
    return carrinho.get(id.toString())?.qty || 0;
}

function syncGrid() {
    itemsNodeList = document.querySelectorAll(".item");
    if (itemsNodeList.length > 0) {
        itemsNodeList.forEach((el) => {
            const quantitySpan = el.querySelector(".quantity");
            if (quantitySpan) {
                quantitySpan.textContent = getQty(el.dataset.id);
            }
        });
    }
    console.log("Grid sincronizado");
}

function renderCart(triggerHighlight = true) {
    let totalItems = 0;
    let totalAmount = 0;

    carrinho.forEach(({ qty, price }) => {
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

    const cartBar = document.querySelector(".cart-bar");
    if (cartBar && triggerHighlight) {
        cartBar.classList.add("highlight");
        setTimeout(() => cartBar.classList.remove("highlight"), 300);
    }

    if (cartTotalModalEl) {
        cartTotalModalEl.textContent = formatBRL(totalAmount);
    }
    if (checkoutBtnModal) {
        checkoutBtnModal.disabled = totalItems === 0;
    }

    if (cartItemsEl) {
        cartItemsEl.innerHTML = "";
        if (totalItems === 0) {
            if (cartEmptyEl) cartEmptyEl.classList.remove("hidden");
            cartItemsEl.classList.add("hidden");
            return;
        }

        if (cartEmptyEl) cartEmptyEl.classList.add("hidden");
        cartItemsEl.classList.remove("hidden");

        carrinho.forEach((entry) => {
            const row = document.createElement("div");
            row.className = "cart-item";
            const totalItem = entry.price * entry.qty;

            row.innerHTML = `
                <img src="${entry.image}" alt="${entry.name}" onerror="this.onerror=null; this.src='assets/imagens/placeholder.png'; console.error('Erro ao carregar imagem: ${entry.image}');">
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
            const removeBtn = row.querySelector(".cart-remove");

            if (incBtn) {
                incBtn.addEventListener("click", () => {
                    console.log(`Incrementando item ${entry.id}: ${entry.name}`);
                    updateCart(entry.id, entry.name, entry.price, entry.image, 1);
                    syncGrid();
                    renderCart();
                });
            }
            if (decBtn) {
                decBtn.addEventListener("click", () => {
                    console.log(`Decrementando item ${entry.id}: ${entry.name}`);
                    updateCart(entry.id, entry.name, entry.price, entry.image, -1);
                    syncGrid();
                    renderCart();
                });
            }
            if (removeBtn) {
                removeBtn.addEventListener("click", () => {
                    console.log(`Removendo item ${entry.id}: ${entry.name}`);
                    updateCart(entry.id, entry.name, entry.price, entry.image, -entry.qty);
                    syncGrid();
                    renderCart();
                });
            }

            cartItemsEl.appendChild(row);
        });
    }
    initializeZoom(); // Inicializa zoom no carrinho
    console.log("Carrinho renderizado:", { totalItems, totalAmount });
}

function clearCart() {
    carrinho.clear();
    saveCart(carrinho);
    syncGrid();
    renderCart();
}

function finalizeOrder() {
    if (carrinho.size === 0) return;

    const cleanBRL = (val) => formatBRL(val).replace(/\u00a0/g, " ");

    let msg = "PEDIDO RECEBIDO - MARQUES MINEIRO\r\n\r\n";
    msg += "ITENS DO PEDIDO:\r\n\r\n";

    let total = 0;

    carrinho.forEach(({ name, price, qty }) => {
        const subtotal = price * qty;
        total += subtotal;

        msg += "• ITEM: " + name.toUpperCase() + "\r\n";
        msg += "  Qtd: " + qty + " x " + cleanBRL(price) + "\r\n";
        msg += "  Subtotal: " + cleanBRL(subtotal) + "\r\n";
        msg += "--------------------------------\r\n\r\n";
    });

    msg += "--------------------------------\r\n";
    msg += "TOTAL A PAGAR: " + cleanBRL(total) + "\r\n";
    msg += "--------------------------------\r\n\r\n";

    msg += "DADOS PARA PAGAMENTO (PIX):\r\n";
    msg += "Chave CPF: 725.820.576-49\r\n";
    msg += "Banco: Sicoob Credifor\r\n";
    msg += "Nome: Onesio Marques\r\n\r\n";

    msg += "Mande o comprovante aqui quando fizer!\r\n\r\n";
    msg += "Obrigado pela preferência!";

    const phone = "553798074484";
    const url = "https://api.whatsapp.com/send?phone=" + phone + "&text=" + encodeURIComponent(msg);
    window.open(url, "_blank");

    carrinho.clear();
    saveCart(carrinho);
    syncGrid();
    renderCart();
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    carrinho = loadCart();

    cartCountEl = document.getElementById("cartcount");
    cartTotalEl = document.getElementById("carttotal");
    cartItemsEl = document.getElementById("cartItems");
    cartEmptyEl = document.getElementById("cartEmpty");
    cartTotalModalEl = document.getElementById("cartTotalModal");
    checkoutBtn = document.getElementById("checkoutbtn");
    checkoutBtnModal = document.getElementById("checkoutBtnModal");
    clearCartBtn = document.getElementById("clearCart");

    renderizarProdutos();

    if (clearCartBtn) {
        clearCartBtn.addEventListener("click", () => {
            console.log("Limpando carrinho");
            clearCart();
        });
    }
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            console.log("Finalizando pedido (index.html)");
            finalizeOrder();
        });
    }
    if (checkoutBtnModal) {
        checkoutBtnModal.addEventListener("click", () => {
            console.log("Finalizando pedido (sacola.html)");
            finalizeOrder();
        });
    }

    renderCart();
    console.log("Carrinho inicializado:", [...carrinho]);
});

// Toast Notification System
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s forwards';
        setTimeout(() => {
            if (toast.parentElement) toast.remove();
        }, 300);
    }, 3000);
}

// Fly to Cart Animation
function flyToCart(sourceImg) {
    const cartTarget = document.querySelector('.cart-bar');
    if (!cartTarget || !sourceImg) return;

    const clone = sourceImg.cloneNode();
    const rect = sourceImg.getBoundingClientRect();
    const targetRect = cartTarget.getBoundingClientRect();

    clone.style.position = 'fixed';
    clone.style.left = `${rect.left}px`;
    clone.style.top = `${rect.top}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.zIndex = '9999';
    clone.style.borderRadius = '50%';
    clone.style.opacity = '0.8';
    clone.style.transition = 'all 0.3s cubic-bezier(0.2, 1, 0.3, 1)';
    clone.style.pointerEvents = 'none';

    document.body.appendChild(clone);

    void clone.offsetWidth;

    const targetX = targetRect.left + (targetRect.width / 2) - (rect.width / 4);
    const targetY = targetRect.top + (targetRect.height / 2) - (rect.height / 4);

    clone.style.transform = `translate(${targetX - rect.left}px, ${targetY - rect.top}px) scale(0.1)`;
    clone.style.opacity = '0';

    setTimeout(() => {
        clone.remove();
        cartTarget.animate([
            { transform: 'translateX(-50%) scale(1)' },
            { transform: 'translateX(-50%) scale(1.1)' },
            { transform: 'translateX(-50%) scale(1)' }
        ], { duration: 200 });
    }, 300);
}