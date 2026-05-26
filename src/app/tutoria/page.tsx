"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  BrainCircuit, 
  Search, 
  BookOpen, 
  HelpCircle, 
  Layers, 
  Zap, 
  Loader2,
  FileText,
  Download
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface TutoriaResult {
  tutorial: string;
  questions: Array<{ question: string; options: string[]; answer: number; explanation: string }>;
  flashcards: Array<{ front: string; back: string }>;
  pareto: string[];
}

export default function TutoriaPage() {
  const [theme, setTheme] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TutoriaResult | null>(null);

  const handleGenerate = async () => {
    if (!theme.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/tutoria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          theme,
          sources: ['Porto', 'Bates', 'Guyton']
        })
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Erro ao gerar tutoria:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
          <BrainCircuit className="w-8 h-8 text-emerald-600" />
          Tutoria IA
        </h2>
        <p className="text-muted-foreground">Gere materiais de estudo profundos a partir de temas do PBL ou sínteses.</p>
      </div>

      {!result && !loading && (
        <Card className="border-2 border-emerald-100 bg-emerald-50/30">
          <CardHeader>
            <CardTitle>O que você quer estudar hoje?</CardTitle>
            <CardDescription>Insira o tema, as questões de aprendizagem ou uma síntese provisória.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Tema ou Síntese</Label>
              <textarea 
                id="theme"
                className="w-full min-h-[150px] p-4 rounded-xl border-2 border-emerald-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-sm"
                placeholder="Ex: Anosmia pós-viral e mecanismos de olfação..."
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-white">Porto: Semiologia</Badge>
              <Badge variant="outline" className="bg-white">Bates: Propedêutica</Badge>
              <Badge variant="outline" className="bg-white">Guyton: Fisiologia</Badge>
              <Badge variant="outline" className="bg-white">Diretrizes SBC/SBP</Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full h-12 text-lg bg-emerald-600 hover:bg-emerald-700" 
              onClick={handleGenerate}
            >
              <Zap className="w-5 h-5 mr-2 fill-current" />
              Gerar Tutoria Completa
            </Button>
          </CardFooter>
        </Card>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
          <div className="text-center">
            <h3 className="text-xl font-bold">Consultando as Referências...</h3>
            <p className="text-slate-500">O MedRaiz está processando o conteúdo do Porto e Bates para você.</p>
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={() => setResult(null)}>
              Nova Pesquisa
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" /> PDF
              </Button>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                <FileText className="w-4 h-4" /> Exportar para Word
              </Button>
            </div>
          </div>

          <Tabs defaultValue="tutorial" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-100 p-1">
              <TabsTrigger value="tutorial" className="gap-2"><BookOpen className="w-4 h-4" /> Estudo</TabsTrigger>
              <TabsTrigger value="questions" className="gap-2"><HelpCircle className="w-4 h-4" /> Questões</TabsTrigger>
              <TabsTrigger value="flashcards" className="gap-2"><Layers className="w-4 h-4" /> Flashcards</TabsTrigger>
              <TabsTrigger value="pareto" className="gap-2"><Zap className="w-4 h-4" /> Pareto</TabsTrigger>
            </TabsList>

            <TabsContent value="tutorial" className="mt-4">
              <Card>
                <CardContent className="pt-6 prose prose-slate max-w-none prose-emerald">
                  <ReactMarkdown>{result.tutorial}</ReactMarkdown>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="questions" className="mt-4 space-y-4">
              {result.questions.map((q, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="text-base">Questão {i + 1}</CardTitle>
                    <CardDescription>{q.question}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {q.options.map((opt, optIdx) => (
                      <div key={optIdx} className="p-3 rounded-md border hover:bg-slate-50 cursor-pointer transition-colors text-sm">
                        {opt}
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="bg-slate-50/50 pt-4 border-t">
                    <p className="text-xs text-slate-500 italic">Clique na alternativa para ver o feedback e a fonte.</p>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="flashcards" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.flashcards.map((f, i) => (
                  <Card key={i} className="hover:border-emerald-500 transition-colors cursor-pointer group">
                    <CardHeader className="pb-2">
                      <Badge variant="outline" className="w-fit">Frente</Badge>
                      <CardTitle className="text-sm pt-2">{f.front}</CardTitle>
                    </CardHeader>
                    <CardContent className="border-t pt-4 bg-slate-50 group-hover:bg-emerald-50/30 transition-colors">
                      <Badge className="bg-emerald-600 mb-2">Verso / Resposta</Badge>
                      <p className="text-sm">{f.back}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pareto" className="mt-4">
              <Card className="bg-slate-900 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-emerald-400">
                    <Zap className="w-5 h-5 fill-current" />
                    Regra 80/20 — O que Mais Cai
                  </CardTitle>
                  <CardDescription className="text-slate-400">Foque nestes 5 pontos para dominar 80% do assunto.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {result.pareto.map((item, i) => (
                    <div key={i} className="flex gap-4 items-start border-b border-slate-800 pb-4 last:border-0">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 font-bold text-sm">
                        {i + 1}
                      </div>
                      <p className="text-sm text-slate-200">{item}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
