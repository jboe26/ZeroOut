import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/app/lib/db";
import User from "@/app/models/User";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { name, email, password } = body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ success: false, message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return NextResponse.json({ success: true, user: { id: newUser._id, name: newUser.name, email: newUser.email } });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
  }
}