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