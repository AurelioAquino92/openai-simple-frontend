'use client'

import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThinkingAnimation } from "@/components/thinking-animation"
import { useEffect, useRef, useState } from 'react'
import { UserButton, useUser } from "@clerk/nextjs"
import { ChatMessage } from "@/components/chat-message"
import { Prisma } from "@prisma/client"
import { createAssistantMessage, createUserMessage, getUserChats } from "./actions"

type ChatClientProps = {
  initialChats: Prisma.ChatGetPayload<{
    include: {
      messages: true
    }
  }>[]
}

export function ChatClient({ initialChats }: ChatClientProps) {
  const { user } = useUser()
  const [chatId, setChatId] = useState<number | null>(null)
  const [chats, setChats] = useState(initialChats)
  
  const { messages, input, handleSubmit, handleInputChange, status } = useChat({
    api: `${process.env.NEXT_PUBLIC_API_URL}/ask`,
    streamProtocol: 'text',
    onFinish: async (message) => {
      if (!user) return;
      const newChatId = await createUserMessage(input, user.id, chatId);
      await createAssistantMessage(message.content, newChatId)
      setChatId(newChatId);
      
      const updatedChats = await getUserChats(user.id);
      setChats(updatedChats);
    },
  });

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, status])

  return (
    <div className="flex h-screen w-full">
      <div className="flex flex-col items-center text-center p-4 gap-2 w-64 border-r">
        <UserButton />
        <span className="text-sm">Hello<br />{user?.firstName}!</span>
        <div className="mt-5 flex flex-col gap-2 items-center w-full overflow-y-auto max-h-[calc(100vh-200px)]">
          {chats.map((chat) => (
            <Button
              key={chat.id}
              className="border border-stone-200 w-full overflow-hidden p-1 rounded-lg"
              onClick={() => setChatId(chat.id)}
              variant={chat.id === chatId ? "secondary" : "outline"}
            >
              <span className="truncate">{chat.messages[0].content}</span>
            </Button>
          ))}
        </div>
      </div>
      <div className="flex flex-col h-screen bg-white w-full p-10">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          {status === 'submitted' && (
            <div className="flex justify-start">
              <div className="max-w-[100%] rounded-full px-4 py-2 bg-white text-black">
                <ThinkingAnimation />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2 p-5 bg-stone-100 rounded-lg">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask me anything..."
            className="flex-1 border-none outline-none shadow-none p-4"
            disabled={status !== 'ready'}
          />
          <Button
            className={cn("bg-white text-black rounded-full", input.length > 0 ? "opacity-100" : "opacity-50")}
            type="submit"
            disabled={input.length === 0 || status !== 'ready'}
          >
            <ArrowUpIcon className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  )
} 