'use server'

import prisma from "@/lib/prisma"

export async function createUserMessage(content: string, userId: string, chatId: number | null) {
  if (!chatId) {
    const newChat = await prisma.chat.create({
      data: {
        userId: userId,
        messages: {
          create: {
            content: content,
            role: 'user'
          }
        }
      },
    })
    chatId = newChat.id
  } else {
    await prisma.message.create({
      data: {
        chatId: chatId,
        content: content,
        role: 'user'
      }
    }) 
  }

  return chatId
}

export async function createAssistantMessage(content: string, chatId: number) {
  await prisma.message.create({
    data: {
      content: content,
      role: 'assistant',
      chatId: chatId
    }
  })
}

export async function getUserChats(userId: string) {
  const chats = await prisma.chat.findMany({
    where: {
      userId: userId
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      messages: true
    }
  })
  return chats
}
