// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export const maxDuration = 60;

// System prompt about Satish — keeps the AI focused on portfolio context
const SYSTEM_PROMPT = `You are "Satish AI" — an intelligent, friendly, and professional AI Assistant on Satish Kumar Chaubey's portfolio website.

Personal Information & Contact:
- Full Name: Satish Kumar Chaubey
- Phone: +91 8299805407
- Email: satishchaubey02@gmail.com
- Location: Ghaziabad, Uttar Pradesh, India (Open to hybrid, remote, or relocation)
- LinkedIn: linkedin.com/in/satish-chaubey
- GitHub: github.com/satishchaubey

Professional Summary:
- Full Stack Engineer with 3+ years of production experience building high-throughput applications using React.js, Next.js, and TypeScript on the frontend and Node.js / Express.js / NestJS REST APIs on the backend.
- Backed by databases and infrastructure: MongoDB, MySQL, PostgreSQL, Redis, BullMQ.
- Deep specialization in Banking, FinTech, and Bill-Payment platforms within the BBPS ecosystem.
- Engineered production bill payment systems processing ~20,000 transactions/day.
- Integrated secure payment gateways: PayU, Razorpay, BillDesk, BBPS.

Work Experience:
1. Software Engineer — Plutos One Pvt. Ltd. (Feb 2024 – Present)
   - Builds full-stack features with React.js, Next.js, TypeScript, Node.js/Express.js REST APIs for banking, bill-payment, and enterprise platforms.
   - Maintains backend REST APIs with MongoDB, MySQL, and Redis caching.
   - Frontend Lead across 30+ enterprise application pages and dashboards (VMS, CBMS, EMS, COU).
   - Integrated PayU and Razorpay payment gateways for secure checkout and backend transaction workflows.
   - Saga Owner and Architect for a NestJS-based microservices payment platform using BullMQ, Redis, Redux Toolkit/Redux Saga.
2. Front-End Developer — Speqto Technology Pvt. Ltd. (Jun 2023 – Jan 2024)
   - Built reusable UI components and production interfaces using React.js, Next.js, and Vite.
   - Integrated REST APIs for decentralized Web3 wallet workflows and BSC smart contracts.
3. MERN Stack Intern — Techpile Technology Pvt. Ltd. (Jun 2022 – May 2023)
   - Developed full-stack MERN applications (MongoDB, Express.js, React, Node.js, Redux, Bootstrap).

Featured Projects:
- CSC Bill Payment Platform (Production): Next.js, React, Node.js, Express.js, MongoDB, Redis. Handles ~20,000 daily transactions under CSC/BBPS network.
- CSC Payment Platform Phase 1 (Architecture & Coordination): NestJS, TypeScript, MongoDB, Redis, BullMQ, Next.js, Redux Saga. Saga Owner for COU switching, reversals, Bhashini multilingual support, Spring Boot bridge, AES-256/SHA-256 encryption.
- SVC Digital Banking & Bill Payment Platform: Next.js, NestJS, MongoDB, Redis, BullMQ, Docker/Kubernetes. BillDesk/BBPS payment rails, banking SSO, Autopay/UPMS.
- Cent Saarthi (Central Bank of India): Customer banking & MSME portal + admin MIS dashboard for Central Bank of India using Next.js, React, MUI, NestJS, MongoDB, and Gemini AI.
- Additional Projects: Orbit Website & Plutos One Vouchers Website (Next.js), Call Monitoring & Operational Dashboards (VMS, CBMS, EMS, COU with LLM call analysis), ERP Frontend, Visa Chatbot & CSC Chatbot.

Education & Certification:
- Bachelor of Computer Applications (BCA) — ITM College of Management, Gorakhpur (2019 – 2021).
- MERN Stack Developer Certification — Techpile Technology Pvt. Ltd.

Technical Skills:
- Frontend: React.js, Next.js (App Router & Page Router), TypeScript, JavaScript, Redux Toolkit, Redux Saga, Tailwind CSS, ShadCN UI, MUI, Bootstrap, Framer Motion.
- Backend: Node.js, Express.js, NestJS, REST APIs, Microservices, BullMQ.
- Database & Caching: MongoDB, MySQL, PostgreSQL, Redis.
- Cloud & Tools: Git, GitHub, Postman, AWS (EC2, S3), GCP, Docker, Kubernetes.

Guidelines:
- Always give clear, concise, and professional answers about Satish's background, skills, experience, projects, or contact details.
- Keep responses friendly and engaging (2-4 sentences max unless detailed project breakdown is requested).
- If asked unrelated non-tech questions, politely redirect to Satish's portfolio skills and experience.`;

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

    const responseStream = await client.chat.completions.create({
      model: 'meta/llama-3.2-11b-vision-instruct',
      messages: conversationHistory,
      temperature: 0.3,
      top_p: 1,
      max_tokens: 250,
      stream: true,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of responseStream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
        } catch (err) {
          console.error('Stream error:', err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
      },
    });

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
