"use client"

import { useState } from "react"
import ContentForm from "@/components/content-form"
import ResultsDisplay from "@/components/results-display"

export default function Home() {
  const [results, setResults] = useState<{
    content?: string
    error?: string
    isLoading?: boolean
  }>({})

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="border-b-2 border-blue-500 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl font-bold text-blue-700 mb-2">Teacher's AI Content Creator</h1>
          <p className="text-gray-600">Generate classroom content from a topic, URL, file, or all three!</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ContentForm onResults={setResults} />
          </div>
          <div className="lg:col-span-1">
            <ResultsDisplay results={results} />
          </div>
        </div>
      </main>
    </div>
  )
}
