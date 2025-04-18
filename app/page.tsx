import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { ChatClient } from "./chat-client"
import prisma from "@/lib/prisma"

export default async function Home() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect("/getstarted")
  }

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
  
  return <ChatClient chats={chats}/>
}
