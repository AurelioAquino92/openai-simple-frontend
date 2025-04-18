'use client'

import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThinkingAnimation } from "@/components/thinking-animation"
import { useEffect, useRef } from 'react'
import { UserButton, useUser } from "@clerk/nextjs"
import { ChatMessage } from "@/components/chat-message"
import { Chat } from "@prisma/client"

type ChatClientProps = {
  chats: Chat[]
}

export function ChatClient({ chats }: ChatClientProps) {
  const { user } = useUser()
  const { messages, input, handleSubmit, handleInputChange, status } = useChat({
    api: `${process.env.NEXT_PUBLIC_API_URL}/ask`,
    streamProtocol: 'text',
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
      <div className="flex flex-col items-center text-center p-4 gap-2">
        <UserButton />
        <span className="text-sm">Hello<br />{user?.firstName}!</span>
        <div>
          {chats.map((chat) => (
            <div key={chat.id}>
              <span>{chat.id}</span>
            </div>
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