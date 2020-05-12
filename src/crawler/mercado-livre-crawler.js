const axios = require('axios');
const cheerio = require('cheerio');

const url_base = 'https://lista.mercadolivre.com.br/';
const qtd_page = 50;

class MercadoLivreCrawler {
    async pesquisar (search, limit) {
        return this.carregarProdutos(search, limit, 1);
    }

    async carregarProdutos (search, limit, pag, produtos = []) {
        let url = url_base + search + '_Desde_' + pag + '_DisplayType_LF';
        let response = await axios.get(url);

        let $ = cheerio.load(response.data);
        let lista = $('#searchResults > li > div.rowItem');

        if (lista.length > 0) {
            if (limit < qtd_page) {
                lista = lista.slice(0, limit);
            }

            lista.each((index, element) => {
                if (produtos.length < limit) {
                    let name = $(element).find('.main-title').text();
                    let link = $(element).find('div > div > a');
                    let price__fraction = parseInt($(element).find('.price__fraction').text().replace(/\D/g, ""));
                    let price__decimals = parseInt($(element).find('.price__decimals').text());
                    let store = $(element).find('.item__brand-title-tos').text();
                    let state = $(element).find('.item__condition').text();

                    let price = price__fraction + (price__decimals ? (price__decimals / 100) : 0);

                    produtos.push({
                        name: (name && name.trim() != '') ? name.trim() : null,
                        link: link ? link.attr('href') : null,
                        price: price,
                        store: (store && store.trim() != '') ? store.substring(5).trim() : null,
                        state: (state && state.trim() != '') ? state.trim() : null
                    });
                }
            });
        }

        if (lista.length < qtd_page || produtos.length == limit) {
            return produtos;
        } else {
            return this.carregarProdutos(search, limit, pag + qtd_page, produtos);
        }
    }
}

module.exports = new MercadoLivreCrawler();
