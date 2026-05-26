import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { theme, sources } = await req.json();

    const systemPrompt = `
      Você é um tutor médico especialista em metodologia PBL e nas referências: Semiologia Médica (Porto), Propedêutica (Bates), Guyton (Fisiologia) e Diretrizes Brasileiras.
      Seu objetivo é gerar um material de estudo completo e estruturado baseado no tema fornecido pelo estudante.

      O retorno DEVE ser um objeto JSON estritamente com as seguintes chaves:
      - "tutorial": Texto rico em Markdown com: Fisiologia, Fisiopatologia, Quadro Clínico e Manejo.
      - "questions": Array de 5 objetos com { "question": string, "options": string[], "answer": number, "explanation": string }.
      - "flashcards": Array de 10 objetos com { "front": string, "back": string }.
      - "pareto": Array de 5 pontos principais (os 20% que geram 80% do conhecimento).

      REGRAS:
      1. Use terminologia médica correta e brasileira.
      2. Cite as fontes (Porto/Bates/Diretrizes) ao longo do texto.
      3. O conteúdo deve ser profundo o suficiente para um estudante de medicina.
    `;

    const userPrompt = `Gere uma tutoria completa para o tema: ${theme}. Fontes selecionadas: ${sources.join(", ")}.`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const content = JSON.parse(response.choices[0].message.content || "{}");
    return NextResponse.json(content);
  } catch (error) {
    console.error("Tutoria Error:", error);
    return NextResponse.json({ error: "Falha ao gerar tutoria" }, { status: 500 });
  }
}
