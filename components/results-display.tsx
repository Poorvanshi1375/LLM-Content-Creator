"use client"

interface ResultsDisplayProps {
  results: {
    content?: string
    error?: string
    isLoading?: boolean
  }
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200 sticky top-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Results</h2>
      <div className="min-h-64 bg-gray-50 rounded-lg p-4 border border-dashed border-gray-300">
        {results.isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-gray-600">Generating content...</p>
            </div>
          </div>
        ) : results.error ? (
          <p className="text-red-600 font-semibold">❌ Error: {results.error}</p>
        ) : results.content ? (
          <div className="text-gray-800 whitespace-pre-wrap break-words text-sm leading-relaxed">{results.content}</div>
        ) : (
          <p className="text-gray-500">Your generated content will appear here...</p>
        )}
      </div>
    </div>
  )
}
