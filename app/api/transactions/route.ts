import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectToDatabase } from "@/app/lib/db";
import Transaction from "@/app/models/Transaction";

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "No user exists" }, { status: 401 });
  }
  try {
    await connectToDatabase();
    const transactions = await Transaction.find({ userId: session.user?.email }).sort({ date: -1 });
    return NextResponse.json({ success: true, transactions });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching transactions" }, { status: 500 });
  }
}