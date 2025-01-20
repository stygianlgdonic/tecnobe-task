'use client';

import { useEffect, useState } from 'react';

const MixItUp = () => {
    const [recipes, setRecipes] = useState<any[]>([]);
    const [creativeRecipe, setCreativeRecipe] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await fetch('/api/recipes');
            const data = await response.json();
            setRecipes(data);
        };
        fetchRecipes();
    }, []);

    const generateCreativeRecipe = () => {
        if (recipes.length === 0) {
            setCreativeRecipe("No recipes available to mix.");
            return;
        }

        // Randomly select ingredients and instructions from existing recipes
        const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
        const randomIngredients = randomRecipe.ingredients.split(',').sort(() => 0.5 - Math.random()).slice(0, 3).join(', ');
        const randomInstructions = `Combine ${randomIngredients} and cook until done.`;

        setCreativeRecipe(`Try this creative recipe: ${randomIngredients}. Instructions: ${randomInstructions}`);
    };

    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold mb-6">Mix It Up!</h1>
            <button onClick={generateCreativeRecipe} className="bg-blue-500 text-white p-3 rounded">Generate Creative Recipe</button>
            {creativeRecipe && <p className="mt-4">{creativeRecipe}</p>}
        </div>
    );
};

export default MixItUp; 