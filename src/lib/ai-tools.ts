// Deep-link URL query params for prefilling a prompt are unofficial/undocumented
// for most of these tools and can change without notice. ChatGPT, Perplexity, and
// Grok are reliable as of writing; Claude is best-effort; Gemini has no known
// prefill param, so it just opens the app.
export type AiTool = {
  name: string;
  icon: string;
  buildUrl: (prompt: string) => string;
};

export const AI_TOOLS: AiTool[] = [
  {
    name: "ChatGPT",
    icon: "https://svgl.app/library/openai.svg",
    buildUrl: (prompt) => `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`,
  },
  {
    name: "Claude",
    icon: "https://cdn.simpleicons.org/claude",
    buildUrl: (prompt) => `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
  },
  {
    name: "Perplexity",
    icon: "https://svgl.app/library/perplexity.svg",
    buildUrl: (prompt) => `https://www.perplexity.ai/search?q=${encodeURIComponent(prompt)}`,
  },
  {
    name: "Gemini",
    icon: "https://svgl.app/library/gemini.svg",
    buildUrl: () => "https://gemini.google.com/app",
  },
  {
    name: "Grok",
    icon: "/icons/grok.svg",
    buildUrl: (prompt) => `https://grok.com/?q=${encodeURIComponent(prompt)}`,
  },
];
