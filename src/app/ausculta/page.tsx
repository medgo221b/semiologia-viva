"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Volume2, Play, Pause, Info, Heart, Wind } from 'lucide-react';

interface Sound {
  id: string;
  name: string;
  description: string;
  category: 'cardiac' | 'pulmonary';
  url: string; // Placeholder for now
}

const sounds: Sound[] = [
  { id: '1', name: 'Ritmo Sinusal Normal', description: 'Sons cardíacos normais (B1 e B2).', category: 'cardiac', url: '' },
  { id: '2', name: 'Sopro Sistólico', description: 'Ruído entre B1 e B2, comum em estenose aórtica.', category: 'cardiac', url: '' },
  { id: '3', name: 'Terceira Bulha (B3)', description: 'Sinal de sobrecarga de volume, comum na ICC.', category: 'cardiac', url: '' },
  { id: '4', name: 'Murmúrio Vesicular', description: 'Som pulmonar normal em todas as áreas.', category: 'pulmonary', url: '' },
  { id: '5', name: 'Crepitantes Finos', description: 'Sons de "velcro", comuns em edema pulmonar.', category: 'pulmonary', url: '' },
  { id: '6', name: 'Sibilos Expiratórios', description: 'Sons musicais, comuns em asma e DPOC.', category: 'pulmonary', url: '' },
];

export default function AuscultaPage() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const togglePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
      // Aqui integrariamos com a Web Audio API futuramente
    }
  };

  const cardiacSounds = sounds.filter(s => s.category === 'cardiac');
  const pulmonarySounds = sounds.filter(s => s.category === 'pulmonary');

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
          <Volume2 className="w-8 h-8 text-emerald-600" />
          Simulador de Ausculta
        </h2>
        <p className="text-muted-foreground">Treine seu ouvido para identificar ruídos fisiológicos e patológicos.</p>
      </div>

      <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-lg flex gap-3 text-emerald-800 text-sm">
        <Info className="w-5 h-5 shrink-0" />
        <div>
          <p className="font-bold">Dica de Estudo:</p>
          <p>Utilize fones de ouvido para uma melhor percepção das frequências graves (como B3 e B4). Referência: Semiologia Porto.</p>
        </div>
      </div>

      <Tabs defaultValue="cardiac" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="cardiac" className="gap-2">
            <Heart className="w-4 h-4" /> Cardíaca
          </TabsTrigger>
          <TabsTrigger value="pulmonary" className="gap-2">
            <Wind className="w-4 h-4" /> Pulmonar
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cardiac" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cardiacSounds.map((sound) => (
              <Card key={sound.id} className={`${playingId === sound.id ? 'border-emerald-500 ring-1 ring-emerald-500' : ''}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{sound.name}</CardTitle>
                    <Badge variant="secondary">Cardíaca</Badge>
                  </div>
                  <CardDescription>{sound.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant={playingId === sound.id ? "destructive" : "default"}
                    className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => togglePlay(sound.id)}
                  >
                    {playingId === sound.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {playingId === sound.id ? "Parar Reprodução" : "Ouvir Som"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pulmonary" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pulmonarySounds.map((sound) => (
              <Card key={sound.id} className={`${playingId === sound.id ? 'border-emerald-500 ring-1 ring-emerald-500' : ''}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{sound.name}</CardTitle>
                    <Badge variant="secondary">Pulmonar</Badge>
                  </div>
                  <CardDescription>{sound.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant={playingId === sound.id ? "destructive" : "default"}
                    className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => togglePlay(sound.id)}
                  >
                    {playingId === sound.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {playingId === sound.id ? "Parar Reprodução" : "Ouvir Som"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 p-8 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center space-y-4 bg-slate-50">
        <div className="p-4 bg-white rounded-full shadow-sm">
          <Volume2 className="w-8 h-8 text-slate-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Biblioteca de Sons Premium</h3>
          <p className="text-slate-500 max-w-md">Em breve: Integre sua ausculta com casos clínicos reais e veja o fonocardiograma em tempo real.</p>
        </div>
        <Button variant="outline">Ver Roadmap</Button>
      </div>
    </div>
  );
}
