import { generateText } from "ai"
import { type NextRequest, NextResponse } from "next/server"
import { groq } from "@ai-sdk/groq"
import { generatePowerPoint } from "@/lib/pptx-generator"
import { extractTextFromFile } from "@/lib/file-processor"
import { fetchUrlContent } from "@/lib/url-fetcher"
import { buildPrompt } from "@/lib/prompt-builder"


export async function POST(request: NextRequest) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        {
          error:
            "GROQ_API_KEY environment variable is not set. Please add your free Groq API key from https://console.groq.com",
        },
        { status: 500 },
      )
    }

    const formData = await request.formData()
    const flow = formData.get("flow") as string
    const outputFormat = formData.get("output_format") as string
    const topic = formData.get("topic") as string | null
    const urlInput = formData.get("url") as string | null
    const fileInput = formData.get("file") as File | null

    // Validate inputs based on flow
    if (flow === "topic" && !topic) {
      return NextResponse.json({ error: "Topic is required for this flow" }, { status: 400 })
    }
    if (flow === "url" && !urlInput) {
      return NextResponse.json({ error: "URL is required for this flow" }, { status: 400 })
    }
    if (flow === "file" && !fileInput) {
      return NextResponse.json({ error: "File is required for this flow" }, { status: 400 })
    }
    if (flow === "combined" && (!topic || !urlInput || !fileInput)) {
      return NextResponse.json({ error: "Topic, URL, and File are all required for combined flow" }, { status: 400 })
    }

    // Process inputs
    let urlContent = ""
    let fileContent = ""

    if (urlInput) {
      urlContent = await fetchUrlContent(urlInput)
    }

    if (fileInput) {
      fileContent = await extractTextFromFile(fileInput)
    }

    // Build prompt
    const prompt = buildPrompt(flow, topic, urlContent, fileContent)

    const { text: generatedContent } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt,
      temperature: 0.7,
      maxOutputTokens: 2000,
    })

    // Return based on output format
    
    if (outputFormat === "ppt") {
      const pptxBuffer = await generatePowerPoint(generatedContent, topic || "Generated Content")
      // Convert Node Buffer to Uint8Array (ArrayBufferView) so it's a valid BodyInit for NextResponse
      const pptxUint8 = new Uint8Array(pptxBuffer)
      return new NextResponse(pptxUint8, {
        headers: {
          "Content-Type": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          "Content-Disposition": 'attachment; filename="Generated_Content.pptx"',
        },
      })
    } else {
      return NextResponse.json({ content: generatedContent })
    }
  } catch (error) {
    console.error("Error generating content:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to generate content",
      },
      { status: 500 },
    )
  }
}
