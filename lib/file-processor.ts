export async function extractTextFromFile(file: File): Promise<string> {
  const fileType = file.type
  const fileName = file.name.toLowerCase()

  try {
    if (fileName.endsWith(".txt") || fileType === "text/plain") {
      return await file.text()
    } else if (fileName.endsWith(".pdf") || fileType === "application/pdf") {
      // For PDF, we'll use a simple approach - in production, use pdfjs-dist
      return await extractPdfText(file)
    } else if (
      fileName.endsWith(".docx") ||
      fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return await extractDocxText(file)
    } else {
      throw new Error("Unsupported file type")
    }
  } catch (error) {
    throw new Error(`Error processing file: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

async function extractPdfText(file: File): Promise<string> {
  // For now, return a placeholder. In production, integrate pdfjs-dist
  const buffer = await file.arrayBuffer()
  // This is a simplified version - use pdfjs-dist for production
  return `[PDF Content from ${file.name} - ${buffer.byteLength} bytes]`
}

async function extractDocxText(file: File): Promise<string> {
  // For now, return a placeholder. In production, integrate docx library
  const buffer = await file.arrayBuffer()
  // This is a simplified version - use docx library for production
  return `[DOCX Content from ${file.name} - ${buffer.byteLength} bytes]`
}
