import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../utils/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ?? 'your_secret_key';

export async function POST(req: Request) {
  const { action, username, password } = await req.json();
  await connectToDatabase();

  if (action === 'register') {
    const user = new User({ username, password: await bcrypt.hash(password, 10) });
    await user.save();
    return NextResponse.json({ message: 'User registered successfully' });
  } else if (action === 'login') {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
    
    // Generate a JWT token
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    return NextResponse.json({ message: 'Login successful', token }); // Include the token in the response
  }

  return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
}
