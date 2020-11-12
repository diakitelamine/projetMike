const cheerio = require('cheerio'),
    axios = require('axios');
const url = 'https://www.chefclub.tv';

module.exports.allRecipes = () => {
    axios.get(url + '/fr/c/recettes')
        .then((html) => {

            let listRecipes = []

            const $ = cheerio.load(html.data);
            // handle success
            const recipes = $('#recipes li').length;

            for (let i = 0; i < recipes; i++)
                if ($('#recipes li').eq(i).find('h3').text().length !== 0)
                    listRecipes.push({
                        title: $('#recipes li').eq(i).find('h3').text(),
                        link: $('#recipes li').eq(i).find('a').attr('href'),
                        image: $('#recipes li').eq(i).find('div.thumbnail').css('background-image').split("'")[1],
                        numberPeople: parseInt($('#recipes li').eq(i).find('div.details').find('li').eq(0).text().split(' ')[1]),
                        preparationTime: parseInt($('#recipes li').eq(i).find('div.details').find('li').eq(1).text().split(' ')[1]),
                    })

            listRecipes.map(async(recipe) => {
                recipe = await this.detailRecipe(recipe)
                console.log(recipe);
                // return recipe;
            })
            console.log(listRecipes);
        })
        .catch((error) => {
            // handle error
            console.log(error);
        });
}

module.exports.detailRecipe = (recipe) => {
    return new Promise((resolve, reject) => {
        axios.get(url + recipe.link)
            .then((html) => {

                const $ = cheerio.load(html.data);
                const dicoGramming = ['cg', 'mg', 'g', 'kg', 'cl', 'ml', 'l', 'kl', 'tranches', 'gousse', 'sachet', 'c.', 'C.']
                console.log($('div.recipe_ingredients ul').eq(0).find('li').eq(0).find('strong').text().split(' ')[0]);
                // resolve($('div.recipe_ingredients ul').eq(0).find('li').find('strong').split(' ')[0])
            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
    })
}