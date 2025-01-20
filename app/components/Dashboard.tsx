'use client';

import { useEffect, useState } from 'react';
import RecipeManager from "./RecipeManager";

const Dashboard = () => {
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
            <h2 className="text-3xl font-bold mb-4">Welcome to Your Recipe Dashboard</h2>
            <p className="mb-4 text-gray-700">Here you can manage your recipes, add new ones, and explore your culinary creations.</p>
            <RecipeManager recipes={recipes} setRecipes={setRecipes} />
            {recipes.length === 0 && (
                <p className="mt-4 text-gray-500">You have no recipes yet. Start adding some!</p>
            )}
        </div>
    );
};

export default Dashboard;