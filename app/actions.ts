'use server'

export type Message = {
  role: 'user' | 'assistant'
  content: string
  error?: string
  details?: string
}

export async function getAIResponse(messages: Message[]) : Promise<Message> {
  try {
    const response = await fetch(`${process.env.API_URL}/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ messages })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error in getAIResponse:', error)
    return {
      role: 'assistant',
      content: "Sorry, I couldn't connect to the server. Please try again later.",
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}
