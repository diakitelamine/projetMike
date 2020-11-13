const cheerio = require('cheerio'),
    axios = require('axios');
const url = 'https://www.chefclub.tv';

const Recipes = require('../models/recipesModel');

module.exports.allRecipes = () => {
    const elements = ['original', 'daily', 'light-and-fun', 'kids', 'cocktails'];
    for (let k = 0; k < elements.length; k++)
        axios.get(url + '/fr/recettes/' + elements[k])
        .then((html) => {

            let listRecipes = []

            const $ = cheerio.load(html.data);
            // handle success
            const recipes = $('#recipes li').length;

            for (let i = 0; i < recipes; i++)
                if ($('#recipes li').eq(i).find('h3').text().length !== 0)
                    listRecipes.push({
                        type: elements[k],
                        title: $('#recipes li').eq(i).find('h3').text(),
                        link: $('#recipes li').eq(i).find('a').attr('href'),
                        image: $('#recipes li').eq(i).find('div.thumbnail').css('background-image').split("'")[1],
                        numberPeople: parseInt($('#recipes li').eq(i).find('div.details').find('li').eq(0).text().split(' ')[1]),
                        preparationTime: parseInt($('#recipes li').eq(i).find('div.details').find('li').eq(1).text().split(' ')[1]),
                    })

            Recipes.deleteMany({}, (err) => console.log((err) ? err : 'The data of the recipe collection is deleted'));

            listRecipes.map(async(recipe) => {
                    detailRecipe = await this.detailRecipe(recipe)
                    recipe.ingredients = detailRecipe.ingredients;
                    recipe.step = detailRecipe.steps;

                    Recipes.create(recipe);
                })
                // console.log(listRecipes);
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
                const nbLi = $('div.recipe_ingredients ul').eq(0).find('li').length
                const nbP = $('ol li p').length
                let steps = [],
                    ingredients = [];
                for (let i = 0; i < nbLi; i++) {
                    ingredients.push(searchDico($('div.recipe_ingredients ul').eq(0).find('li').eq(i).find('strong').text().trim().split(' ')[0]));
                    ingredients[i].name = $('div.recipe_ingredients ul').eq(0).find('li').eq(i).text().split($('div.recipe_ingredients ul').eq(0).find('li').eq(i).find('strong').text())[1];
                }
                for (let i = 0; i < nbP; i++)
                    steps.push($('ol li p').eq(i).text())

                resolve({ ingredients, steps })

            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
    })
}

const searchDico = (text) => {
    let retour = { number: '', gramming: '' }
    let isSpace = false
    if (text.length > 1) {
        for (let i = 0; i < text.length; i++) {
            if (text[i].trim().length === 0)
                isSpace = true
            if (isSpace)
                retour.gramming += text[i]
            else if (text[i] === ',')
                retour.number += '.'
            else
                retour.number += text[i]
        }
        return { quantity: parseFloat(retour.number), gramming: retour.gramming };
    } else
        return { quantity: (text.trim().length === 0) ? '' : parseFloat(text), gramming: '' }

}