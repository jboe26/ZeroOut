import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectToDatabase } from "@/app/lib/db";
import Debt from "@/app/models/Debt";

export async function GET() { 
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "No user exists" }, { status: 401 });
  }
  try {
    await connectToDatabase();
    const debts = await Debt.find({ userId: session.user?.email }).sort({ date: -1 });
    return NextResponse.json({ success: true, debts });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching debt" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "No user exists" }, { status: 401 });
  }
  try {
    const { name, balance, interestRate, minimumPayment } = await request.json();
    await connectToDatabase();
    const newDebt = new Debt({
      userId: session.user?.email,
      name,
      balance,
      interestRate,
      minimumPayment,
    });
    await newDebt.save();
    return NextResponse.json({ success: true, debt: newDebt });
  } catch (error) {
    console.error("Debt error:", error);
    return NextResponse.json({ success: false, message: "Error creating debt" }, { status: 500 });
  }
}