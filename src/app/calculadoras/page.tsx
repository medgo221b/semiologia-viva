"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calculator, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

export default function CalculadorasPage() {
  // IMC State
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [imc, setImc] = useState<number | null>(null);

  // Glasgow State
  const [eye, setEye] = useState<number>(4);
  const [verbal, setVerbal] = useState<number>(5);
  const [motor, setMotor] = useState<number>(6);

  useEffect(() => {
    if (weight && height) {
      const h = parseFloat(height) / 100;
      const w = parseFloat(weight);
      if (h > 0) setImc(w / (h * h));
    } else {
      setImc(null);
    }
  }, [weight, height]);

  const getImcCategory = (val: number) => {
    if (val < 18.5) return { label: 'Abaixo do peso', color: 'bg-yellow-500' };
    if (val < 25) return { label: 'Peso normal', color: 'bg-emerald-500' };
    if (val < 30) return { label: 'Sobrepeso', color: 'bg-yellow-500' };
    if (val < 35) return { label: 'Obesidade Grau I', color: 'bg-orange-500' };
    return { label: 'Obesidade Grave', color: 'bg-red-500' };
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Calculadoras Clínicas</h2>
        <p className="text-muted-foreground">Ferramentas de suporte à decisão baseadas em diretrizes.</p>
      </div>

      <Tabs defaultValue="imc" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="imc">IMC</TabsTrigger>
          <TabsTrigger value="glasgow">Glasgow</TabsTrigger>
          <TabsTrigger value="pam">PAM</TabsTrigger>
        </TabsList>

        {/* IMC TAB */}
        <TabsContent value="imc">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-emerald-500" />
                Índice de Massa Corporal (IMC)
              </CardTitle>
              <CardDescription>Referência: OMS / ABESO</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input 
                    id="weight" 
                    type="number" 
                    placeholder="Ex: 70" 
                    value={weight} 
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Altura (cm)</Label>
                  <Input 
                    id="height" 
                    type="number" 
                    placeholder="Ex: 175" 
                    value={height} 
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
              </div>

              {imc && (
                <div className="p-4 rounded-lg bg-slate-100 border flex flex-col items-center justify-center space-y-2">
                  <span className="text-sm text-slate-500 uppercase font-bold">Resultado</span>
                  <span className="text-4xl font-black text-slate-900">{imc.toFixed(1)}</span>
                  <Badge className={getImcCategory(imc).color}>
                    {getImcCategory(imc).label}
                  </Badge>
                </div>
              )}

              <div className="bg-blue-50 p-4 rounded-md flex gap-3 text-sm text-blue-800 border border-blue-100">
                <Info className="w-5 h-5 shrink-0" />
                <p>O IMC é uma medida internacional usada para calcular se uma pessoa está no peso ideal. Não considera massa muscular ou densidade óssea (Referência: Porto, Semiologia Médica).</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* GLASGOW TAB */}
        <TabsContent value="glasgow">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Escala de Coma de Glasgow
              </CardTitle>
              <CardDescription>Avaliação do nível de consciência (Atualização 2018)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Abertura Ocular</Label>
                  <select 
                    className="w-full p-2 rounded-md border bg-white"
                    value={eye}
                    onChange={(e) => setEye(parseInt(e.target.value))}
                  >
                    <option value={4}>4 - Espontânea</option>
                    <option value={3}>3 - À ordem verbal</option>
                    <option value={2}>2 - À pressão</option>
                    <option value={1}>1 - Ausente</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Resposta Verbal</Label>
                  <select 
                    className="w-full p-2 rounded-md border bg-white"
                    value={verbal}
                    onChange={(e) => setVerbal(parseInt(e.target.value))}
                  >
                    <option value={5}>5 - Orientado</option>
                    <option value={4}>4 - Confuso</option>
                    <option value={3}>3 - Palavras inapropriadas</option>
                    <option value={2}>2 - Sons incompreensíveis</option>
                    <option value={1}>1 - Ausente</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Resposta Motora</Label>
                  <select 
                    className="w-full p-2 rounded-md border bg-white"
                    value={motor}
                    onChange={(e) => setMotor(parseInt(e.target.value))}
                  >
                    <option value={6}>6 - Obedece comandos</option>
                    <option value={5}>5 - Localiza dor</option>
                    <option value={4}>4 - Flexão normal (retirada)</option>
                    <option value={3}>3 - Flexão anormal (decorticação)</option>
                    <option value={2}>2 - Extensão (decerebração)</option>
                    <option value={1}>1 - Ausente</option>
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-900 text-white flex flex-col items-center justify-center space-y-2">
                <span className="text-xs text-slate-400 uppercase font-bold tracking-widest">Score Total</span>
                <span className="text-5xl font-black text-emerald-400">{eye + verbal + motor}</span>
                <Badge variant="outline" className="border-emerald-400 text-emerald-400">
                  {eye + verbal + motor <= 8 ? 'Trauma Grave (IOT)' : eye + verbal + motor <= 12 ? 'Trauma Moderado' : 'Trauma Leve'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pam">
           <Card>
            <CardHeader>
              <CardTitle>Pressão Arterial Média (PAM)</CardTitle>
              <CardDescription>Cálculo da perfusão tecidual (Referência: SBC)</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground italic">Módulo em desenvolvimento...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
