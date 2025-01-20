import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../utils/mongodb';
import Recipe from '../../../models/Recipe';

export async function GET() {
  await connectToDatabase();
  const recipes = await Recipe.find().populate('userId');
  return NextResponse.json(recipes);
}

export async function POST(req: Request) {
  const { title, ingredients, instructions, userId } = await req.json();
  await connectToDatabase();

  const recipe = new Recipe({ title, ingredients, instructions, userId });
  await recipe.save();

  return NextResponse.json(recipe);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await connectToDatabase();

  await Recipe.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Recipe deleted successfully' });
}
