import Link from "next/link"
import { ArrowRight, Brain } from "lucide-react"

import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { SignUpButton } from "@clerk/nextjs"

export default async function GetStartedPage() {

    const { userId } = await auth()
    console.log(userId)
    if (userId) {
        return redirect("/")
    }

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
            <header className="flex items-center justify-center py-6">
                <div className="flex items-center gap-2">
                    <Brain className="h-8 w-8 text-gray-800" />
                    <span className="text-xl font-bold text-gray-800">Aurelio&apos;s Simple AI Chat Assistant</span>
                </div>
            </header>
            <main className="flex-1">
                <section className="flex flex-col items-center justify-center space-y-10 py-20 text-center md:py-32">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold tracking-tighter text-gray-900 sm:text-5xl md:text-6xl">
                            Intelligent Conversations, Powered by OpenAI
                        </h1>
                        <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                            Experience the power of AI with our intelligent chat assistant. Get instant answers, creative ideas, and helpful insights for any topic.
                        </p>
                    </div>
                    <SignUpButton mode="modal" signInFallbackRedirectUrl="/">
                        <Button className="group h-12 px-8 text-lg bg-gray-900 hover:bg-gray-800" size="lg">
                            Get Started
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </SignUpButton>
                    <div className="text-sm text-gray-500">No credit card required</div>
                </section>
            </main>
            <footer className="border-t border-gray-200 py-6">
                <div className="px-20 flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} AI Chat Assistant. All rights reserved.
                    </div>
                    <div className="flex">
                        <Link href="https://www.linkedin.com/in/aurelio-aquino-9876ba95/" target="_blank" className="text-sm text-gray-500 hover:text-gray-700">
                            Contact
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}