-- Tabella dei lead raccolti dai form del sito (landing ads + pagina Contatti).
-- Da eseguire una volta sola nell'SQL Editor di Supabase.

create table leads (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text not null,
  telefono text,
  percorso text,
  club_del_libro boolean default false,  -- bundle Club del Libro richiesto in fase di iscrizione (solo landing-ads)
  fonte text,               -- es. 'landing-ads' o 'contatti'
  newsletter boolean default false,
  privacy_accettata boolean not null default false,
  stato text default 'nuovo',  -- nuovo / contattata-o / iscritta-o
  created_at timestamp default now()
);

-- Se la tabella "leads" esiste già (progetto Supabase creato prima di questa
-- modifica), esegui invece queste due righe nell'SQL Editor per aggiungere
-- solo le colonne mancanti, senza perdere i dati già raccolti:
-- alter table leads add column if not exists telefono text;
-- alter table leads add column if not exists club_del_libro boolean default false;

-- Sicurezza: il pubblico può SOLO inserire righe, mai leggerle.
alter table leads enable row level security;

create policy "Chiunque può iscriversi"
  on leads for insert
  to anon
  with check (true);

-- Nessuna policy di SELECT per "anon": significa che dal sito pubblico
-- nessuno può leggere i dati degli altri iscritti. Solo tu, dal pannello
-- Supabase (con la tua utenza), puoi vedere e gestire la tabella.
