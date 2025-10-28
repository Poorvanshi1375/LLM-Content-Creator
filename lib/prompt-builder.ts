// File: src/lib/prompt-builder.ts (FULL CORRECTED CODE)

export function buildPrompt(
  flow: string,
  topic: string | null,
  urlContent: string,
  fileContent: string
): string {
  let prompt = "";
  
  // --- CORE SLIDE INSTRUCTIONS ---
  const slideFormatInstructions = `
    **YOUR ENTIRE RESPONSE MUST BE IN THE EXACT MARKDOWN SLIDE FORMAT BELOW.**
    * Use Markdown H2 (##) for the Slide Title.
    * Use Markdown bullet points (*) for all content on the slide.
    * Generate exactly 5-6 slides.
    * DO NOT include any text, introductions, or conversational filler outside of the slide format.

    --- REQUIRED OUTPUT FORMAT ---
    ## [Slide Title 1]
    * [Bullet Point 1]
    * [Bullet Point 2]
    
    ## [Slide Title 2]
    * [Bullet Point 1]
    * [Bullet Point 2]
    // ... continue for 5-6 slides.
  `;

  if (flow === "topic" && topic) {
    prompt = `
      You are an expert content designer for a classroom.
      Create comprehensive educational content for a presentation about the topic: "${topic}".
      ${slideFormatInstructions}
    `;
  } else if (flow === "url" && urlContent) {
    prompt = `
      You are an expert content designer for a classroom.
      Based on the following content from a URL, create a presentation:
      ${urlContent}
      ${slideFormatInstructions}
    `;
  } else if (flow === "file" && fileContent) {
    prompt = `
      You are an expert content designer for a classroom.
      Based on the following document content, create a presentation:
      ${fileContent}
      ${slideFormatInstructions}
    `;
  } else if (flow === "combined" && topic && urlContent && fileContent) {
    prompt = `
      You are an expert content designer for a classroom.
      Create a cohesive presentation combining the following sources:
      Topic: ${topic}
      URL Content: ${urlContent}
      Document Content: ${fileContent}
      ${slideFormatInstructions}
    `;
  } else {
      prompt = "Invalid flow or missing content. Please check inputs.";
  }

  return prompt.trim();
}