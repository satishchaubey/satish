// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export const maxDuration = 60;

// System prompt about Satish — keeps the AI focused on portfolio context
const SYSTEM_PROMPT = `You are "Satish AI" — a helpful assistant on Satish Kumar Chaubey's portfolio website.

About Satish Kumar Chaubey:
- Full Stack Engineer with 3+ years of experience
- Currently at plutosONE (FinTech & SaaS Enterprise) as Software Engineer (Feb 2024–Present)
- Previously at Saarthi.ai (AI SaaS Startup) and Cygen Consultant (Startup)
- Expertise: React 19.x, Next.js 16, TypeScript, Node.js, NestJS, Express.js
- Databases: MongoDB, PostgreSQL, MySQL, Redis
- Payment: PayU, Razorpay, BBPS API integrations
- Cloud: AWS (EC2, S3), GCP deployment
- Built high-traffic bill payment engines processing 20,000+ daily transactions
- Built SheetSync (bulk email lead automation), BBPS SaaS platforms, AI call monitoring tools
- Based in New Delhi/Ghaziabad, India
- GitHub: github.com/satishchaubey
- LinkedIn: linkedin.com/in/satish-chaubey

Guidelines:
- Answer ONLY questions about Satish, his skills, projects, experience, or general tech questions.
- Be concise and professional (2-4 sentences max).
- If asked something unrelated to Satish or tech, politely redirect.
- Never make up information — only share what is listed above.`;

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.NVIDIA_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'AI service not configured' }, { status: 500 });
    }

    const client = new OpenAI({
      apiKey,
      baseURL: 'https://integrate.api.nvidia.com/v1',
    });

    // Build conversation history (excluding the current user message to prevent duplication)
    const conversationHistory: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: SYSTEM_PROMPT },
    ];

    if (Array.isArray(history)) {
      // Exclude the last message if it matches the current input
      const previousHistory = history.filter(
        (msg) => !(msg.sender === 'user' && msg.text === message)
      ).slice(-6);

      for (const msg of previousHistory) {
        if (msg.sender === 'user') {
          conversationHistory.push({ role: 'user', content: msg.text });
        } else if (msg.sender === 'ai') {
          conversationHistory.push({ role: 'assistant', content: msg.text });
        }
      }
    }

    // Add current user message
    conversationHistory.push({ role: 'user', content: message });

    const completion = await client.chat.completions.create({
      model: 'meta/llama-3.2-11b-vision-instruct',
      messages: conversationHistory,
      temperature: 0.5,
      top_p: 1,
      max_tokens: 512,
      stream: false,
    });

    const reply = completion.choices[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json({ error: 'No response from AI' }, { status: 500 });
    }

    return NextResponse.json({ reply });

  } catch (error: unknown) {
    console.error('NVIDIA AI API error:', error);

    const err = error as { status?: number; message?: string };

    if (err?.status === 401) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
    }
    if (err?.status === 429) {
      return NextResponse.json({ error: 'Rate limit reached. Please try again shortly.' }, { status: 429 });
    }
    if (err?.status === 410) {
      return NextResponse.json({ error: 'Model unavailable. Please contact site admin.' }, { status: 410 });
    }

    return NextResponse.json(
      { error: 'AI service temporarily unavailable. Please try again.' },
      { status: 500 }
    );
  }
}
