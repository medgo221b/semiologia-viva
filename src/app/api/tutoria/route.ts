import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { theme } = await req.json();

    const systemPrompt = `
      Você é um tutor médico experiente, especialista em PBL e em aprendizado acelerado.
      Sua tarefa é gerar um HTML ÚNICO, COMPLETO, MODERNO e TOTALMENTE FUNCIONAL baseado no tema fornecido.
      
      ESTILO E DESIGN:
      - Use Modo Escuro moderno (Fundo #06080d).
      - Use fontes elegantes (Playfair Display para títulos, Plus Jakarta Sans para texto).
      - O design deve ser baseado em abas (Tabs) para organizar o conteúdo.
      - Use cores: Verde-água (#42c97a) como principal, Azul (#5bb8f5) para links/destaques.
      - O layout deve ser responsivo e limpo (Shadcn/UI style).

      ESTRUTURA OBRIGATÓRIA DAS ABAS:
      1. Tutoria: Explicação passo a passo, relações importantes, conceitos essenciais, fisiologia e fisiopatologia.
      2. Questões: 20 questões interativas. Ao clicar na alternativa, deve mudar para verde (acerto) ou vermelho (erro). Abaixo, exibir explicação clara e contador de acertos.
      3. Flashcards: 20 flashcards interativos que viram ao clicar.
      4. Quadros Comparativos: Tabelas organizadas comparando pontos chave.
      5. Pareto (80/20): O que mais cai, pegadinhas, termos essenciais e dicas de prova.

      REFERÊNCIAS BASE:
      - Porto (Semiologia Médica), Bates (Propedêutica), Robbins (Patologia), Guyton (Fisiologia).

      SAÍDA:
      - Retorne APENAS o código HTML completo dentro de uma string. Não inclua explicações fora do código.
      - O HTML deve conter todo o CSS e JS (Vanilla) necessários dentro das tags <style> e <script>.
    `;

    const userPrompt = `Gere o guia de estudos completo em HTML para o tema: ${theme}`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.6,
    });

    const htmlContent = response.choices[0].message.content || "";
    
    // Limpar possíveis blocos de código markdown se a IA incluir
    const cleanHtml = htmlContent.replace(/```html/g, "").replace(/```/g, "").trim();

    return NextResponse.json({ html: cleanHtml });
  } catch (error) {
    console.error("Tutoria Error:", error);
    return NextResponse.json({ error: "Falha ao gerar tutoria customizada" }, { status: 500 });
  }
}
