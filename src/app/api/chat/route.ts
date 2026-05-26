import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages, caseDetails } = await req.json();

    const systemPrompt = `
      Você é um paciente em uma consulta médica simulada para estudantes de medicina brasileiros.
      Seu objetivo é agir de forma realista, respondendo às perguntas do "médico" (estudante) de acordo com o caso clínico fornecido.

      REGRAS DE COMPORTAMENTO:
      1. Siga estritamente os detalhes do caso: ${JSON.stringify(caseDetails)}.
      2. Baseie seus sintomas e descrições na Semiologia Médica (Porto) e Propedêutica (Bates).
      3. Seja um pouco vago no início, como um paciente real. O aluno deve "investigar" para obter detalhes.
      4. Não use termos médicos técnicos avançados (você é o paciente, não o médico). Diga "dor no peito" em vez de "precordialgia".
      5. Responda de forma curta e direta, mantendo o tom da conversa.
      6. Se o aluno fizer algo errado ou for grosseiro, reaja como um paciente reagiria.

      CONTEXTO DO CASO:
      - Nome: ${caseDetails.patient}
      - Queixa Principal: ${caseDetails.complaint}
      - Histórico e Sintomas: (Extraídos do PRD MedRaiz)
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ],
      temperature: 0.7,
    });

    return NextResponse.json({ content: response.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI Error:", error);
    return NextResponse.json({ error: "Falha ao processar resposta do paciente" }, { status: 500 });
  }
}
