# My Next.js Project: AI Content Creator

This project is a Next.js application that uses AI for *content creation. It leverages the **@ai-sdk/groq* library for powerful large language model capabilities, and features a modern user interface built with *shadcn/ui* (New York style) and *Tailwind CSS v4*.

---

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

* *Node.js*
* *pnpm* for package management.

### Installation

1.  *Clone the repository:*

    bash
    git clone <your-repo-url>
    cd my-v0-project
    

2.  *Install dependencies using pnpm:*

    bash
    pnpm install
    

3.  *Set up Environment Variables:*

    The application requires a *Groq API Key* to function. Create a file named .env.local in the root of your project and add your key.

    > *Note:* For security, keep your API key out of version control. The application currently uses the GROQ_API_KEY.

    *.env.local*

    
    GROQ_API_KEY="<Your-Groq-API-Key-Here>"
    

### Running the Application

| Script | Command | Description |
| :--- | :--- | :--- |
| *Development* | pnpm dev | Runs the app in development mode at http://localhost:3000 |
| *Build* | pnpm build | Builds the application for production deployment |
| *Start* | pnpm start | Starts the Next.js production server |
| *Lint* | pnpm lint | Runs the configured ESLint checks |

---

## Technology Stack

### Core Technologies

* *Framework:* *Next.js 16.0.0*.
* *Language:* *TypeScript 5.x*.
* *AI Integration:* @ai-sdk/groq.

### UI and Styling

* *Styling:* *Tailwind CSS 4.x* with PostCSS.
* *Components:* *Radix UI* primitives customized by *shadcn/ui*.
* *Icons:* lucide-react.

### Key Functionalities

| Package | Purpose |
| :--- | :--- |
| **pptxgenjs** | Enables the creation and export of presentation files (PPTX) directly from the application. |
| **react-hook-form, zod** | Used for robust and type-safe form management and input validation. |
| **recharts** | Provides components for generating charts and data visualizations. |
| **@vercel/analytics** | Integration for usage and performance analytics. |

---

## Content Generation Capability

The application converts AI-generated text into a structured presentation format. 

---

## Contributing

23f2001336
rensi6padmani@gmail.com
krishahpatel
Utsimul
