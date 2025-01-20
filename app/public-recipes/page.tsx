'use client';

import { useEffect, useState } from 'react';

const PublicRecipes = () => {
    const [recipes, setRecipes] = useState<any[]>([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await fetch('/api/recipes');
            const data = await response.json();
            setRecipes(data);
        };
        fetchRecipes();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold mb-6">Public Recipes</h1>
            <ul className="space-y-4">
                {recipes.map((recipe) => (
                    <li key={recipe._id} className="bg-white p-4 rounded shadow-md">
                        <h2 className="text-2xl font-semibold">{recipe.title}</h2>
                        <p className="mt-2"><strong>Ingredients:</strong> {recipe.ingredients}</p>
                        <p><strong>Instructions:</strong> {recipe.instructions}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PublicRecipes; 