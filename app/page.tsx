'use client'

import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThinkingAnimation } from "@/components/thinking-animation"
import ReactMarkdown from 'react-markdown'
import { useEffect, useRef } from 'react'

export default function Home() {

  const { messages, input, handleSubmit, handleInputChange, status } = useChat({
    api: `http://localhost:8000/ask`,
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
              {typeof message.content === 'string' ? (
                <ReactMarkdown
                  components={{
                    ul: ({ children }) => <ul className="list-disc pl-4">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal pl-4">{children}</ol>,
                    li: ({ children }) => <li className="mb-1">{children}</li>,
                    p: ({ children }) => <p className="mb-2">{children}</p>,
                    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                    em: ({ children }) => <em className="italic">{children}</em>,
                    code: ({ children }) => <code className="bg-gray-100 rounded px-1 py-0.5 font-mono text-sm">{children}</code>,
                    pre: ({ children }) => <pre className="bg-gray-100 rounded p-2 overflow-x-auto">{children}</pre>,
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              ) : ''}
            </div>
          </div>
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
  )
}
