import Message from "@/database/message.model";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { email, message } = body;


    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required" },
        { status: 400 }
      );
    }

    const newMessage = await Message.create({
      email,
      message,
    });

    return NextResponse.json(
      {
        success: true,
        data: newMessage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating message:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}