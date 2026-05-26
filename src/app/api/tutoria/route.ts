import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { theme } = await req.json();

    const systemPrompt = `
      VOCÊ É O TUTOR MESTRE MEDRAIZ. Sua tarefa é gerar um GUIA DE ESTUDOS MÉDICO EXAUSTIVO e PROFISSIONAL em um ÚNICO arquivo HTML. 
      O arquivo deve ser GIGANTE e COMPLETO. Não resuma. Não economize palavras. 
      
      ESTILO VISUAL (OBRIGATÓRIO):
      - Use o CSS do modelo fornecido (Modo Escuro #06080d, Playfair Display, Plus Jakarta Sans).
      - O design DEVE ser em abas funcionais via JavaScript (Vanilla).
      - Cores: Verde-água (#42c97a) e Azul (#5bb8f5).
      
      CONTEÚDO OBRIGATÓRIO (SIGA À RISCA):
      1. ABA TUTORIA: Texto extremamente denso. Divida em: Introdução, Fisiologia Profunda, Fisiopatologia (mecanismos moleculares), Quadro Clínico detalhado e Manejo baseado em diretrizes (SBC/SBP/MS). Cite Porto, Bates e Robbins.
      2. ABA QUESTÕES IA: Gere EXATAMENTE 50 questões de múltipla escolha interativas. Cada questão deve ter feedback imediato (Verde/Vermelho), explicação de CADA alternativa e um ranking de acertos funcional.
      3. ABA FLASHCARDS: Gere EXATAMENTE 40 flashcards com efeito de giro 3D (CSS transform) cobrindo conceitos, valores de referência e mnemônicos.
      4. ABA QUADROS COMPARATIVOS: Mínimo 3 tabelas complexas comparando diagnósticos diferenciais, classificações ou condutas.
      5. ABA PARETO (80/20): Destaque os 5 pontos de prova, 10 pegadinhas clássicas e um guia de 3 etapas usando a Técnica de Feynman para o tema.

      REGRAS TÉCNICAS:
      - Retorne APENAS o código HTML funcional.
      - NÃO use bibliotecas externas de JS (além de fontes Google). Tudo deve estar no arquivo.
      - A IA deve continuar escrevendo até o limite máximo de tokens para garantir a profundidade.
    `;

    const userPrompt = `TEMA: ${theme}. Gere o Portal de Estudos COMPLETO e DENSO agora. Lembre-se: 50 questões e 40 flashcards.`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.5, // Menor temperatura para mais consistência técnica
      max_completion_tokens: 8192, // Aumentado para permitir a saída gigante
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
