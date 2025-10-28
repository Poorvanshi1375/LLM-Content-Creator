"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

type FlowType = "topic" | "url" | "file" | "combined"
type OutputFormat = "raw" | "ppt"

interface ContentFormProps {
  onResults: (results: any) => void
}

export default function ContentForm({ onResults }: ContentFormProps) {
  const [flow, setFlow] = useState<FlowType>("topic")
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("raw")
  const [topic, setTopic] = useState("")
  const [url, setUrl] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    onResults({ isLoading: true })

    try {
      const formData = new FormData()
      formData.append("flow", flow)
      formData.append("output_format", outputFormat)

      if (flow === "topic" || flow === "combined") {
        formData.append("topic", topic)
      }
      if (flow === "url" || flow === "combined") {
        formData.append("url", url)
      }
      if (flow === "file" || flow === "combined") {
        if (file) formData.append("file", file)
      }

      const response = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Unknown server error")
      }

      const contentType = response.headers.get("content-type")

      if (
        contentType &&
        contentType.includes("application/vnd.openxmlformats-officedocument.presentationml.presentation")
      ) {
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = downloadUrl
        a.download = "Generated_Content.pptx"
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(downloadUrl)
        a.remove()

        onResults({
          content: "Success! Your PowerPoint file is downloading.",
          isLoading: false,
        })
      } else if (contentType && contentType.includes("application/json")) {
        const data = await response.json()
        onResults({ content: data.content, isLoading: false })
      } else {
        throw new Error("Received an unexpected response format from the server.")
      }
    } catch (error) {
      onResults({
        error: error instanceof Error ? error.message : "An error occurred",
        isLoading: false,
      })
    }
    finally {
    setIsLoading(false); 
  }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Flow Selection */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Step 1: Choose Your Input Flow</h2>
        <div className="space-y-3">
          {[
            { value: "topic" as FlowType, label: "Topic Name Only" },
            { value: "url" as FlowType, label: "URL Only" },
            { value: "file" as FlowType, label: "File Upload Only" },
            { value: "combined" as FlowType, label: "Combined (Topic + URL + File)" },
          ].map((option) => (
            <label key={option.value} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="flow"
                value={option.value}
                checked={flow === option.value}
                onChange={(e) => setFlow(e.target.value as FlowType)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="ml-3 text-gray-700 font-medium">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Content Source */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Step 2: Provide Your Content Source</h2>
        <div className="space-y-4">
          {(flow === "topic" || flow === "combined") && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Topic Name:</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., 'The Roman Republic'"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          {(flow === "url" || flow === "combined") && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">URL:</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="e.g., 'https://en.wikipedia.org/wiki/Roman_Republic'"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          {(flow === "file" || flow === "combined") && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Upload File:</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                accept=".pdf,.docx,.txt"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Supported types: .pdf, .docx, .txt</p>
            </div>
          )}
        </div>
      </div>

      {/* Output Format */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Step 3: Choose Your Output Format</h2>
        <div className="space-y-3">
          {[
            { value: "raw" as OutputFormat, label: "Raw Text Output" },
            { value: "ppt" as OutputFormat, label: "PowerPoint (.pptx) Output" },
          ].map((option) => (
            <label key={option.value} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="output_format"
                value={option.value}
                checked={outputFormat === option.value}
                onChange={(e) => setOutputFormat(e.target.value as OutputFormat)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="ml-3 text-gray-700 font-medium">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        {isLoading ? "Generating... ⏳" : "Generate Content ✨"}
      </Button>
    </form>
  )
}
