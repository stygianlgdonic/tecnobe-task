import { useState } from 'react';

const RecipeManager = ({ recipes, setRecipes }: { recipes: any[]; setRecipes: React.Dispatch<React.SetStateAction<any[]>> }) => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');

    const addRecipe = async () => {
        const response = await fetch('/api/recipes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, ingredients, instructions }),
        });
        const newRecipe = await response.json();
        setRecipes([...recipes, newRecipe]);
        setTitle('');
        setIngredients('');
        setInstructions('');
    };

    const removeRecipe = async (id: any) => {
        await fetch('/api/recipes', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });
        setRecipes(recipes.filter((recipe: any) => recipe._id !== id));
    };

    return (
        <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Manage Your Recipes</h2>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full mb-2" />
            <input value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Ingredients" className="w-full mb-2" />
            <input value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Instructions" className="w-full mb-2" />
            <button onClick={addRecipe} className="bg-blue-500 text-white p-2 rounded">Add Recipe</button>
            <ul className="mt-4">
                {recipes.map((recipe: any) => (
                    <li key={recipe._id} className="flex justify-between items-center">
                        <span>{recipe.title}</span>
                        <button onClick={() => removeRecipe(recipe._id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeManager;
