import { prisma } from "@/lib/prisma";
import { Message } from "@/lib/zod";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// Creating a new chat
export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return new Response(null, {
      status: 401,
      statusText: 'Unauthorized',
    });
  }

  const newChat = await prisma.chat.create({
    data: {
      userId: userId,
      name: 'Hello'
    },
  });

  console.log(newChat)

  return NextResponse.json({ chatId: newChat.id });
}