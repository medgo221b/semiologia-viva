"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Save, History, User, HeartPulse, Brain, ClipboardCheck } from 'lucide-react';

export default function ProntuarioPage() {
  const [formData, setFormData] = useState({
    patientInitials: '',
    age: '',
    gender: '',
    complaint: '',
    hpi: '', // History of Present Illness (HDA)
    pmh: '', // Past Medical History (AMP)
    physicalExam: '',
    diagnosticHypothesis: '',
    conduct: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    console.log("Salvando prontuário:", formData);
    // Aqui integraremos com Supabase depois
    alert("Prontuário salvo com sucesso (Simulação)!");
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Prontuário Digital de Treino</h2>
          <p className="text-muted-foreground">Registre sua evolução clínica e treine a escrita técnica.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <History className="w-4 h-4" /> Histórico
          </Button>
          <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700" onClick={handleSave}>
            <Save className="w-4 h-4" /> Salvar Registro
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="bg-slate-50 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-600" />
                Identificação do Paciente
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patientInitials">Iniciais do Paciente</Label>
                  <Input id="patientInitials" placeholder="Ex: J.S.O." value={formData.patientInitials} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Idade</Label>
                  <Input id="age" type="number" placeholder="Ex: 45" value={formData.age} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gênero</Label>
                  <Input id="gender" placeholder="Ex: Masculino" value={formData.gender} onChange={handleChange} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="anamnese" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="anamnese">Anamnese</TabsTrigger>
              <TabsTrigger value="exame">Exame Físico</TabsTrigger>
              <TabsTrigger value="conclusao">Conclusão</TabsTrigger>
            </TabsList>
            
            <TabsContent value="anamnese" className="space-y-4 pt-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="complaint">Queixa Principal (QP)</Label>
                    <textarea 
                      id="complaint"
                      className="w-full min-h-[80px] p-3 rounded-md border text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                      placeholder="Relate a queixa principal com as palavras do paciente..."
                      value={formData.complaint}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hpi">História da Doença Atual (HDA)</Label>
                    <textarea 
                      id="hpi"
                      className="w-full min-h-[150px] p-3 rounded-md border text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                      placeholder="Descreva a cronologia e características dos sintomas..."
                      value={formData.hpi}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pmh">Antecedentes Médicos (AMP/AMF)</Label>
                    <textarea 
                      id="pmh"
                      className="w-full min-h-[100px] p-3 rounded-md border text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                      placeholder="Comorbidades, cirurgias, alergias e histórico familiar..."
                      value={formData.pmh}
                      onChange={handleChange}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="exame" className="pt-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="bg-amber-50 border border-amber-100 p-4 rounded-md text-sm text-amber-800 flex gap-2">
                    <HeartPulse className="w-5 h-5 shrink-0" />
                    <p><strong>Dica de Habilidade:</strong> Siga a sequência - Inspeção, Palpação, Percussão e Ausculta (I.P.P.A).</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="physicalExam">Descrição do Exame Físico</Label>
                    <textarea 
                      id="physicalExam"
                      className="w-full min-h-[300px] p-3 rounded-md border text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                      placeholder="Sinais vitais, exame segmentar (cabeça, pescoço, tórax, abdome, membros)..."
                      value={formData.physicalExam}
                      onChange={handleChange}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="conclusao" className="pt-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="diagnosticHypothesis" className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-emerald-600" /> Hipótese Diagnóstica
                    </Label>
                    <textarea 
                      id="diagnosticHypothesis"
                      className="w-full min-h-[100px] p-3 rounded-md border text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                      placeholder="Qual o diagnóstico mais provável e diferenciais?"
                      value={formData.diagnosticHypothesis}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="conduct" className="flex items-center gap-2">
                      <ClipboardCheck className="w-4 h-4 text-emerald-600" /> Conduta Proposta
                    </Label>
                    <textarea 
                      id="conduct"
                      className="w-full min-h-[100px] p-3 rounded-md border text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                      placeholder="Exames complementares, prescrição e orientações..."
                      value={formData.conduct}
                      onChange={handleChange}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader className="bg-emerald-50 border-b border-emerald-100">
              <CardTitle className="text-sm font-bold text-emerald-800 uppercase tracking-wider">Referência Semiologia</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm space-y-4">
              <div className="space-y-1">
                <p className="font-bold text-slate-700">Identificação:</p>
                <p className="text-slate-600">Essencial para o perfil epidemiológico (Porto).</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-slate-700">HDA:</p>
                <p className="text-slate-600">Deve conter: Início, Localização, Característica, Intensidade, Fatores de melhora/piora.</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-slate-700">Exame Físico:</p>
                <p className="text-slate-600 italic">"A clínica é soberana."</p>
              </div>
              <div className="pt-4">
                <Badge variant="outline" className="text-[10px] w-full justify-center">Manual de Propedêutica Bates</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
