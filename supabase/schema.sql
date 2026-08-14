-- Tabella dei lead raccolti dai form del sito (landing ads + pagina Contatti).
-- Da eseguire una volta sola nell'SQL Editor di Supabase.

create table leads (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text not null,
  telefono text,
  percorso text,
  club_del_libro boolean default false,  -- bundle Club del Libro richiesto in fase di iscrizione
  fonte text,               -- pagina di provenienza: 'landing-ads', 'percorso:sbloccati-da-zero', 'percorso:trova-la-tua-voce', 'percorso:esplora-la-lingua', 'contatti'
  newsletter boolean default false,
  privacy_accettata boolean not null default false,
  livello text,             -- solo da /contatti: livello attuale dichiarato
  obiettivo text,           -- solo da /contatti: obiettivo libero
  messaggio text,           -- messaggio libero (da /contatti sempre, dalle altre pagine solo se "aiutami a scegliere")
  stato text default 'nuovo',  -- nuovo / contattata-o / iscritta-o
  created_at timestamp default now()
);

-- Se la tabella "leads" esiste già (progetto Supabase creato prima di questa
-- modifica), esegui invece queste righe nell'SQL Editor per aggiungere
-- solo le colonne mancanti, senza perdere i dati già raccolti:
-- alter table leads add column if not exists telefono text;
-- alter table leads add column if not exists club_del_libro boolean default false;
-- alter table leads add column if not exists livello text;
-- alter table leads add column if not exists obiettivo text;
-- alter table leads add column if not exists messaggio text;

-- Sicurezza: il pubblico può SOLO inserire righe, mai leggerle.
alter table leads enable row level security;

create policy "Chiunque può iscriversi"
  on leads for insert
  to anon
  with check (true);

-- Nessuna policy di SELECT per "anon": significa che dal sito pubblico
-- nessuno può leggere i dati degli altri iscritti. Solo tu, dal pannello
-- Supabase (con la tua utenza), puoi vedere e gestire la tabella.
