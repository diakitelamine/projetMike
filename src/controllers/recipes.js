const Recipes = require('../models/recipesModel');
const recipes = require('../routes/recipes');


module.exports.allRecipes = async(req, res) => {

    const listRecipes = await Recipes.find({}).exec()

    // if(listRecipes)
    // return res.status(501).json({error: true, message: 'data error'});

    listRecipes.map((recipes) => {
        recipes.link = undefined;
        recipes.__v = undefined;
        recipes.createdAt = undefined;
        recipes.updatedAt = undefined;
        recipes.ingredients.map((ingredient) => {
            return ingredient = (ingredient.quantity != null) ? ingredient.quantity.toString() : '' + ingredient.gramming + ' ' + ingredient.name.toString()
        })
    })

    return res.status(200).json(listRecipes);
}


module.exports.allRecipesByType = async(req, res) => {

    const elements = ['original', 'daily', 'light-and-fun', 'kids', 'cocktails'];
    const type = req.params.type;

    if (!elements.includes(type))
        return res.status(406).json({ error: true, message: 'The requested type is not accessible' });

    // if (req.param('apero') !== undefined)
    //     console.log('Add filter ', req.param('apero'))

    const listRecipes = await Recipes.find({ type: type }).exec()

    listRecipes.map((recipes) => {
        recipes.link = undefined;
        recipes.__v = undefined;
        recipes.createdAt = undefined;
        recipes.updatedAt = undefined;
        recipes.ingredients.map((ingredient) => {
            return ingredient = (ingredient.quantity != null) ? ingredient.quantity.toString() : '' + ingredient.gramming + ' ' + ingredient.name.toString()
        })
    })

    return res.status(200).json(listRecipes);
}