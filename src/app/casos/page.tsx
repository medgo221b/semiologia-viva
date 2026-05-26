"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { 
  Stethoscope, 
  Send, 
  User, 
  ChevronLeft, 
  Activity, 
  Info,
  Loader2
} from 'lucide-react';

interface ClinicalCase {
  id: string;
  title: string;
  specialty: string;
  difficulty: 'Iniciante' | 'Moderado' | 'Avançado';
  patient: string;
  complaint: string;
}

const cases: ClinicalCase[] = [
  {
    id: '1',
    title: 'Anosmia Pós-Viral',
    specialty: 'Neurologia',
    difficulty: 'Moderado',
    patient: 'A.L.M., 34 anos, feminino',
    complaint: 'Perda do olfato há 3 semanas após quadro gripal.'
  },
  {
    id: '2',
    title: 'HAS com Dispneia aos Esforços',
    specialty: 'Cardiologia',
    difficulty: 'Moderado',
    patient: 'M.S.O., 62 anos, masculino',
    complaint: 'Cansaço ao subir escadas há 3 semanas.'
  },
  {
    id: '3',
    title: 'Pneumonia Adquirida na Comunidade',
    specialty: 'Pneumologia',
    difficulty: 'Iniciante',
    patient: 'A.P.R., 28 anos, feminino',
    complaint: 'Tosse com catarro amarelado e febre há 5 dias.'
  }
];

export default function CasosClinicosPage() {
  const [selectedCase, setSelectedCase] = useState<ClinicalCase | null>(null);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleStartCase = (c: ClinicalCase) => {
    setSelectedCase(c);
    setMessages([
      { 
        role: 'assistant', 
        content: `Bom dia, doutor(a). Meu nome é ${c.patient.split(',')[0]}. ${c.complaint}` 
      }
    ]);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = { role: 'user' as const, content: input };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          caseDetails: selectedCase
        })
      });

      const data = await response.json();
      
      if (data.content) {
        setMessages([...updatedMessages, { role: 'assistant', content: data.content }]);
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (selectedCase) {
    return (
      <div className="flex flex-col h-[calc(100vh-8rem)] space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setSelectedCase(null)} className="gap-2">
            <ChevronLeft className="w-4 h-4" /> Voltar para lista
          </Button>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
              <Activity className="w-3 h-3 mr-1" /> Sinais Vitais: Estáveis
            </Badge>
            <Badge>{selectedCase.difficulty}</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 flex-1 overflow-hidden">
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Informações</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p><strong>Paciente:</strong> {selectedCase.patient}</p>
                <p><strong>Queixa:</strong> {selectedCase.complaint}</p>
                <div className="pt-2 border-t mt-2">
                  <p className="text-xs text-muted-foreground uppercase font-bold">Objetivo</p>
                  <p className="text-xs italic">Realizar anamnese e propor hipótese diagnóstica baseada no Porto/Bates.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-100 text-blue-800">
              <CardContent className="p-4 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wider">
                  <Info className="w-4 h-4" /> Dica de Habilidades
                </div>
                <p>Lembre-se de perguntar sobre antecedentes mórbidos pessoais e familiares (AMP/AMF) conforme o manual de propedêutica.</p>
              </CardContent>
            </Card>
          </div>

          <Card className="lg:col-span-3 flex flex-col h-full overflow-hidden">
            <CardHeader className="border-b bg-slate-50 py-3 shrink-0">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Consulta em Andamento
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0 relative">
              <ScrollArea className="h-full w-full">
                <div className="p-4 space-y-4">
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        m.role === 'user' 
                          ? 'bg-emerald-600 text-white rounded-tr-none' 
                          : 'bg-slate-100 text-slate-800 rounded-tl-none border'
                      }`}>
                        <div className="flex items-center gap-2 mb-1 opacity-70 text-[10px] font-bold uppercase">
                          {m.role === 'user' ? <Stethoscope className="w-3 h-3" /> : <User className="w-3 h-3" />}
                          {m.role === 'user' ? 'Médico' : 'Paciente'}
                        </div>
                        {m.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-slate-100 p-3 rounded-lg border flex items-center gap-2 text-slate-500 text-sm">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Paciente respondendo...
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="p-3 border-t bg-white shrink-0">
              <form className="flex w-full gap-2" onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
                <Input 
                  placeholder="Faça uma pergunta ao paciente..." 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" className="bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Casos Clínicos</h2>
        <p className="text-muted-foreground">Simulações conversacionais baseadas em situações reais do PBL.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cases.map((c) => (
          <Card key={c.id} className="hover:shadow-lg transition-shadow border-slate-200">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary">{c.specialty}</Badge>
                <Badge variant="outline">{c.difficulty}</Badge>
              </div>
              <CardTitle className="text-xl">{c.title}</CardTitle>
              <CardDescription className="line-clamp-2">{c.complaint}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-slate-600 flex items-center gap-2">
                <User className="w-4 h-4" /> {c.patient}
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 gap-2" onClick={() => handleStartCase(c)}>
                <Stethoscope className="w-4 h-4" /> Iniciar Consulta
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
