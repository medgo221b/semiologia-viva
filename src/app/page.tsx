import { 
  BrainCircuit, 
  Stethoscope, 
  Calculator, 
  Clock,
  BookOpen,
  GraduationCap,
  BookMarked,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function Home() {
  const stats = [
    { label: 'Tutorias Geradas', value: '0', icon: <BrainCircuit className="w-4 h-4" /> },
    { label: 'Casos Resolvidos', value: '0', icon: <Stethoscope className="w-4 h-4" /> },
    { label: 'Sons de Ausculta', value: '12', icon: <Zap className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 md:p-12 text-white">
        <div className="relative z-10 max-w-2xl space-y-6">
          <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-none px-3 py-1">Versão 1.0 — Protótipo Piloto</Badge>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
            Semiologia <span className="text-emerald-400">Viva.</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            A primeira plataforma brasileira focada em habilidades médicas, baseada nas referências do Porto e Bates. Feita por estudantes, para estudantes.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/tutoria">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold h-12 px-8">
                Começar Agora
              </Button>
            </Link>
            <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800 h-12 px-8">
              Conhecer a Metodologia
            </Button>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none" />
        <BrainCircuit className="absolute -bottom-10 -right-10 w-64 h-64 text-emerald-500/5 rotate-12" />
      </section>

      {/* Social Impact / Plan Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-blue-50 border-blue-100 border-2">
          <CardHeader className="pb-2">
            <GraduationCap className="w-6 h-6 text-blue-600 mb-2" />
            <CardTitle className="text-blue-900">ProUni & FIES</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-800">
              Acesso <strong>100% gratuito</strong> para alunos bolsistas. Nossa missão é democratizar o ensino médico de qualidade.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 border-amber-100 border-2">
          <CardHeader className="pb-2">
            <BookMarked className="w-6 h-6 text-amber-600 mb-2" />
            <CardTitle className="text-amber-900">Parceria Editorial</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-amber-800">
              Comprou o livro do <strong>Porto ou Bates</strong>? Use seu código de acesso para liberar 12 meses de Semiologia Viva Premium.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-emerald-50 border-emerald-100 border-2">
          <CardHeader className="pb-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600 mb-2" />
            <CardTitle className="text-emerald-900">Padrão Ouro</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-emerald-800">
              Conteúdo validado pelas diretrizes da <strong>SBC, SBP e Ministério da Saúde</strong>. Segurança acadêmica total.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none bg-slate-50 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</CardTitle>
              <div className="p-2 bg-white rounded-lg shadow-sm">{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-slate-900">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Módulos Ativos</CardTitle>
            <CardDescription>O que você pode treinar agora.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3">
            {[
              { label: 'Tutoria IA', icon: <BrainCircuit className="w-4 h-4" />, href: '/tutoria' },
              { label: 'Simulação de Casos', icon: <Stethoscope className="w-4 h-4" />, href: '/casos' },
              { label: 'Calculadoras Clínicas', icon: <Calculator className="w-4 h-4" />, href: '/calculadoras' },
              { label: 'Prontuário Digital', icon: <BookOpen className="w-4 h-4" />, href: '/prontuario' },
              { label: 'Ausculta Simulada', icon: <Zap className="w-4 h-4" />, href: '/ausculta' },
            ].map((module) => (
              <Link key={module.label} href={module.href}>
                <div className="flex items-center justify-between p-3 rounded-xl border hover:bg-slate-50 hover:border-emerald-200 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 group-hover:bg-emerald-100 text-slate-600 group-hover:text-emerald-600 rounded-lg transition-colors">
                      {module.icon}
                    </div>
                    <span className="font-semibold text-slate-700">{module.label}</span>
                  </div>
                  <Badge variant="outline" className="text-[10px] group-hover:bg-emerald-50">Disponível</Badge>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Últimas Atualizações</CardTitle>
            <CardDescription>O que há de novo no Semiologia Viva.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4 border-b pb-4 last:border-0">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-bold">Lançamento do Piloto</p>
                  <p className="text-xs text-slate-500">Módulos de Tutoria e Casos com GPT-4o integrados com sucesso.</p>
                </div>
              </div>
              <div className="flex gap-4 border-b pb-4 last:border-0">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-bold">Biblioteca de Sons</p>
                  <p className="text-xs text-slate-500">Adicionados 6 novos sons de ausculta cardíaca e pulmonar.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
