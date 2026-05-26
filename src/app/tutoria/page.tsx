"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  BrainCircuit, 
  Zap, 
  Loader2,
  Download,
  Maximize2,
  RefreshCw
} from 'lucide-react';

export default function TutoriaPage() {
  const [theme, setTheme] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!theme.trim()) return;
    setLoading(true);
    setGeneratedHtml(null);

    try {
      const response = await fetch('/api/tutoria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme })
      });

      const data = await response.json();
      if (data.html) {
        setGeneratedHtml(data.html);
      }
    } catch (error) {
      console.error("Erro ao gerar tutoria:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadHtml = () => {
    if (!generatedHtml) return;
    const blob = new Blob([generatedHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Tutoria_${theme.substring(0, 20)}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 h-screen flex flex-col">
      <div className="shrink-0">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
          <BrainCircuit className="w-8 h-8 text-emerald-600" />
          Tutoria IA Premium
        </h2>
        <p className="text-muted-foreground">O modelo Semiologia Viva gera um portal de estudos completo para você.</p>
      </div>

      {!generatedHtml && !loading && (
        <Card className="border-2 border-emerald-100 bg-emerald-50/30 shrink-0">
          <CardHeader>
            <CardTitle>O que você quer dominar hoje?</CardTitle>
            <CardDescription>Insira o tema e nossa IA criará um guia interativo com abas, questões e flashcards.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Tema ou Síntese</Label>
              <textarea 
                id="theme"
                className="w-full min-h-[150px] p-4 rounded-xl border-2 border-emerald-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-sm"
                placeholder="Ex: Semiologia Cardiovascular: Ausculta e Edemas..."
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full h-12 text-lg bg-emerald-600 hover:bg-emerald-700" 
              onClick={handleGenerate}
            >
              <Zap className="w-5 h-5 mr-2 fill-current" />
              Gerar Portal de Estudos
            </Button>
          </CardFooter>
        </Card>
      )}

      {loading && (
        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
          <div className="text-center">
            <h3 className="text-xl font-bold">Construindo seu Portal...</h3>
            <p className="text-slate-500">Estamos formatando a tutoria, questões e flashcards conforme seu modelo.</p>
          </div>
        </div>
      )}

      {generatedHtml && (
        <div className="flex-1 flex flex-col space-y-4 min-h-0">
          <div className="flex justify-between items-center shrink-0">
            <Button variant="outline" size="sm" onClick={() => setGeneratedHtml(null)} className="gap-2">
              <RefreshCw className="w-4 h-4" /> Nova Tutoria
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={downloadHtml} className="gap-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                <Download className="w-4 h-4" /> Baixar HTML
              </Button>
              <Button size="sm" className="bg-slate-900 gap-2">
                <Maximize2 className="w-4 h-4" /> Tela Cheia
              </Button>
            </div>
          </div>

          <Card className="flex-1 overflow-hidden border-0 shadow-2xl rounded-2xl">
            <iframe 
              srcDoc={generatedHtml} 
              className="w-full h-full border-0"
              title="Tutoria Gerada"
            />
          </Card>
        </div>
      )}
    </div>
  );
}
