import ReactMarkdown from 'react-markdown'

type ChatMessageProps = {
    message: {
        role: string
        content: string
    }
}

export function ChatMessage({ message }: ChatMessageProps) {
    return (
        <div
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
    )
}