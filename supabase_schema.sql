-- TABELA DE USUÁRIOS (Extensão do Auth do Supabase)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  plan TEXT DEFAULT 'free', -- free, premium, institutional, prouni_fies
  institution TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- TABELA DE CASOS CLÍNICOS
CREATE TABLE public.clinical_cases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  specialty TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  patient_data JSONB NOT NULL,
  complaint TEXT NOT NULL,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- TABELA DE PRONTUÁRIOS (Registros dos alunos)
CREATE TABLE public.medical_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  patient_initials TEXT NOT NULL,
  age INTEGER,
  gender TEXT,
  data JSONB NOT NULL, -- Contém anamnese, exame físico e hipótese
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- TABELA DE TUTORIAS IA GERADAS
CREATE TABLE public.ai_tutorials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  theme TEXT NOT NULL,
  content JSONB NOT NULL, -- Contém o tutorial, questões e flashcards
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- HABILITAR RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_tutorials ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE ACESSO
CREATE POLICY "Usuários podem ver seu próprio perfil" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Usuários podem ver seus próprios prontuários" ON public.medical_records FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Usuários podem ver suas próprias tutorias" ON public.ai_tutorials FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Todos podem ver casos clínicos públicos" ON public.clinical_cases FOR SELECT USING (is_public = true);
