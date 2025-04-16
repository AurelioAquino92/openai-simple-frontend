'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { ArrowUpIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { getAIResponse, type Message } from "./actions"


export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newUserMessage: Message = {
      role: 'user',
      content: input
    }

    setMessages(prev => [...prev, newUserMessage])
    setInput("")

    try {
      const newAIResponseData = await getAIResponse([newUserMessage])
      
      setMessages(prev => [...prev, newAIResponseData])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I couldn't connect to the server. Please try again later.",
        error: error instanceof Error ? error.message : 'Unknown error'
      }])
    }
  }

  return (
    <div className="flex flex-col h-screen bg-white max-w-3xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[100%] rounded-full px-4 py-2 
                ${message.role === 'user'
                  ? 'bg-gray-200 text-black'
                  : 'bg-white text-black'
                }`
              }
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 p-5 bg-stone-100 rounded-lg">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 border-none outline-none shadow-none p-4"
        />
        <Button
          className={cn("bg-white text-black rounded-full", input.length > 0 ? "opacity-100" : "opacity-50")}
          type="submit"
          disabled={input.length === 0}
        >
          <ArrowUpIcon className="w-4 h-4" />
        </Button>
      </form>
    </div>
  )
}
