# Traduzioni PL / EN — bozza per revisione

Bozza di traduzione delle 4 pagine concordate (Home, Chi Sono, FAQ, Offerta
Formativa) più la pagina Grazie (unica per le tre lingue). Percorso di
lavoro: **prima approvi/correggi questo testo, poi lo costruisco sul sito.**
Non ho ancora toccato nessun file `.astro`.

Non sono madrelingua polacca: il polacco qui sotto è scritto con cura ma **va
fatto rileggere da te, da Giada o da una madrelingua polacca** prima di andare
online — è la lingua di conversione principale del sito, quindi è quella dove
un errore di tono pesa di più. L'inglese l'ho scritto con più sicurezza, ma
una rilettura veloce non guasta comunque.

---

## Note e decisioni prese per te (dimmi se qualcosa non va bene)

1. **Struttura URL**: stesso slug sotto `/pl/` e `/en/` di quello italiano —
   `/pl/chi-sono`, `/en/chi-sono`, `/pl/faq`, `/en/faq`,
   `/pl/offerta-formativa`, `/en/offerta-formativa`. La configurazione i18n
   di Astro è già pronta per questo.

2. **Navbar PL/EN semplificata**: solo Home, Chi Sono, FAQ + il bottone
   verde "Iscriviti" che porta a Offerta Formativa. Niente menu a tendina
   "I Percorsi" (quelle pagine restano solo in italiano) e niente voce
   "Contatti" (idem). Il footer segue la stessa logica.

3. **Sezione "I percorsi" della Home**: nella versione italiana sono 4
   riquadri cliccabili che portano alle pagine dei 3 percorsi + Club del
   Libro. Siccome quelle pagine non esistono in PL/EN, ho sostituito la
   griglia con un blocco unico che rimanda direttamente a Offerta
   Formativa (vedi sotto "Home → Sezione percorsi").

4. **Sezione Testimonianze della Home**: le citazioni di Kamila e Małgosia
   sono già una traduzione dal polacco all'italiano (fatta da te in
   precedenza). Tradurle di nuovo dall'italiano al polacco rischia di
   snaturare quello che hanno detto davvero due persone reali con nome e
   cognome — quindi **l'ho tolta da questa bozza per il PL**. Se recuperi
   il testo originale polacco lo inserisco così com'è. Per l'inglese
   invece l'ho tradotta (rischio più basso), ma segnalo comunque la stessa
   cautela.

5. **Link a /contatti e alle pagine /percorsi/\* nei testi**: sostituiti con
   link a Offerta Formativa (nella lingua giusta) o con
   `mailto:giada@italianoservito.it`, dato che Contatti e le pagine
   percorso non hanno versione PL/EN.

6. **Pagina Grazie**: resta un'unica pagina per tutti e tre i siti, come
   richiesto. Propongo di riconoscere la lingua da dove arriva la persona
   (se viene da `/pl/...` mostro il blocco polacco, da `/en/...` quello
   inglese, altrimenti l'italiano di default) e di tenere comunque tutti e
   tre i testi nell'HTML come fallback, per sicurezza SEO/accessibilità.
   Il testo delle tre versioni è qui sotto.

7. Le etichette del **form di iscrizione** (Nome, Email, Telefono...) e delle
   **card dei corsi** (Livello, Orario, Giorno libero...) sono in un
   componente condiviso: le trovi tradotte in fondo al documento, sezione
   "Stringhe condivise".

---

## HOME

### Hero

**IT (per riferimento)**
- Eyebrow: *Ciao, sono Giada!*
- Titolo: *Non lezioni di italiano. Un percorso per entrare* nel cuore *dell'Italia.*
- Sottotitolo: *Corsi online di italiano per chi si è innamorato dell'Italia. Sono Giada Longo, insegnante certificata che capisce esattamente dove ti blocchi, perché ci sono passata anche io, dall'altra parte.*
- CTA piena: *Trova il tuo percorso in italiano* (in Home punta a Offerta Formativa)
- CTA vuota: *Scopri la mia storia* → Chi Sono

**PL**
- Eyebrow: *Cześć, jestem Giada!*
- Titolo: *To nie są lekcje włoskiego. To droga prosto* do serca *Włoch.*
- Sottotitolo: *Kursy włoskiego online dla osób zakochanych we Włoszech. Jestem Giada Longo, dyplomowana nauczycielka, która dokładnie wie, w którym miejscu się blokujesz — bo sama, po drugiej stronie, przeszłam przez to samo.*
- CTA piena: *Znajdź swoją ścieżkę do włoskiego* → /pl/offerta-formativa
- CTA vuota: *Poznaj moją historię* → /pl/chi-sono

**EN**
- Eyebrow: *Hi, I'm Giada!*
- Titolo: *Not just Italian lessons. A path* into the heart *of Italy.*
- Sottotitolo: *Online Italian courses for anyone who has fallen in love with Italy. I'm Giada Longo, a certified teacher who knows exactly where you get stuck — because I've been on the other side of it myself.*
- CTA piena: *Find your path in Italian* → /en/offerta-formativa
- CTA vuota: *Discover my story* → /en/chi-sono

### Striscia promesse (Autonomia / Voce / Cultura)

**IT**: Autonomia — Viaggi in Italia senza mai perderti. · Voce — Parli senza il terrore del giudizio. · Cultura — Entri nei gesti, nelle tradizioni, nel modo di pensare italiano.

**PL**: Samodzielność — Podróżujesz po Włoszech, nigdy się nie gubiąc. · Głos — Mówisz bez lęku przed oceną. · Kultura — Wchodzisz w gesty, tradycje, włoski sposób myślenia.

**EN**: Independence — You travel through Italy without ever feeling lost. · Voice — You speak without the fear of being judged. · Culture — You step into the gestures, traditions, and the Italian way of thinking.

### Paragrafo "promessa"

**IT**: *Non ti insegnerò solo la grammatica. Ti accompagnerò a costruire la sicurezza per tentare, sbagliare, ridere dell'errore e riprovare, finché l'italiano non sarà più "una lingua straniera da studiare", ma un pezzo di te.*

**PL**: *Nie nauczę cię tylko gramatyki. Będę przy tobie, kiedy będziesz budować pewność siebie, żeby próbować, mylić się, śmiać się z błędów i próbować dalej — aż włoski przestanie być „obcym językiem do nauki", a stanie się częścią ciebie.*

**EN**: *I won't just teach you grammar. I'll help you build the confidence to try, get it wrong, laugh about the mistake, and try again — until Italian stops being "a foreign language to study" and becomes a part of you.*

### Sezione percorsi (adattata: un blocco unico invece della griglia a 4)

**PL**
- Eyebrow: *Oferta*
- H2: *Nie stworzyłam zwykłych kursów „na poziomie". Stworzyłam ścieżki dla osoby, którą jesteś dziś.*
- CTA: *Zobacz aktualną ofertę kursów* → /pl/offerta-formativa

**EN**
- Eyebrow: *The paths*
- H2: *I didn't build simple "leveled" courses. I designed paths for the person you are today.*
- CTA: *See the current course offering* → /en/offerta-formativa

### Citazione "spazio sicuro"

**IT**: *Qui sbagliare fa parte del percorso, non è un fallimento. I gruppi sono piccoli (massimo 6 persone) perché la fiducia si costruisce solo quando ci si conosce davvero.*

**PL**: *Tutaj błądzenie jest częścią drogi, a nie porażką. Grupy są małe (maksymalnie 6 osób), bo zaufanie buduje się tylko wtedy, gdy naprawdę się poznajemy.*

**EN**: *Here, making mistakes is part of the journey, not a failure. Groups are small (six people maximum), because trust only builds when people truly get to know each other.*

### Testimonianze (solo EN in questa bozza — vedi nota 4 sopra)

**EN**
- Kamila, Explore the Language course — *"Genuine professionalism, combined with a smart and enjoyable way of teaching the language."*
- Małgosia, Find Your Voice course — *"I highly recommend Giada, a professional and warm teacher with whom you learn to hold a conversation in Italian naturally — and when things get difficult, you can ask for explanations in Polish to really understand what you need. Signing up for one of her courses was one of the nicest things I've done for myself lately, and it certainly won't end after just one semester."*

### FAQ in Home (3 domande brevi)

**PL**
1. **Co się stanie, jeśli boję się mówić?** — *To najczęstszy punkt wyjścia, a nie przeszkoda. Na pierwszych spotkaniach celowo obniżam presję: trochę się mówi, dużo się słucha, a pewność siebie rośnie z lekcji na lekcję.*
2. **Jak wyglądają lekcje dla polskich uczniów?** — *Buduję lekcje, biorąc pod uwagę specyficzne trudności osób, które zaczynają od polskiego, i pokonuję je razem z tobą, używając porównań, które mnie — jako rodzimej Włoszce — nigdy by nie przyszły do głowy, gdybym nie nauczyła się polskiego i nie mieszkała w Polsce.*
3. **Czy muszę już znać trochę włoskiego, żeby zacząć?** — *Nie. Kurs „Odblokuj się od zera" stworzyłam właśnie z myślą o osobach zaczynających od zupełnego zera.*
- Link: *Zobacz wszystkie najczęściej zadawane pytania →* /pl/faq

**EN**
1. **What happens if I'm afraid to speak?** — *It's the most common starting point, not an obstacle. In the first sessions I work on purpose to lower the pressure: you speak a little, listen a lot, and confidence grows lesson after lesson.*
2. **How are lessons structured for Polish-speaking students?** — *I build lessons around the specific difficulties people face when starting from Polish, and I work through them with you using comparisons that, as a native Italian speaker, I would never have thought of before learning Polish myself and living in Poland.*
3. **Do I need to already know some Italian to start?** — *No. "Unlock from Zero" was designed exactly for people starting from absolute zero.*
- Link: *See all frequently asked questions →* /en/faq

### Teaser "Chi sono"

**PL**
- Eyebrow: *Kim jestem*
- H2: *Zanim zostałam twoją nauczycielką, przez prawie 7 lat byłam adoptowaną Polką.*
- P: *Mieszkałam w Krakowie, pracowałam we Włoskim Instytucie Kultury i dokładnie wiem, gdzie polski język stawia ci kłody pod nogi, kiedy próbujesz mówić po włosku.*
- CTA: *Poznaj moją historię →* /pl/chi-sono

**EN**
- Eyebrow: *About me*
- H2: *Before I was your teacher, I was an adopted Pole for almost 7 years.*
- P: *I lived in Kraków, worked at the Italian Institute of Culture, and know exactly where the Polish language trips you up when you try to speak Italian.*
- CTA: *Discover my story →* /en/chi-sono

### Blocco finale

**PL**: H2 *Nie potrzebujesz perfekcji. Wystarczy pierwszy krok.* — CTA *Zobacz ofertę kursów* → /pl/offerta-formativa

**EN**: H2 *You don't need perfection. Just the first step.* — CTA *See the course offering* → /en/offerta-formativa

---

## CHI SONO

**IT (apertura, per riferimento)**: *Sono Giada, insegnante certificata di italiano, ma prima ancora sono stata per quasi 7 anni una polacca d'adozione.* / *Ho vissuto a Cracovia. Ho fatto la spesa in polacco, ho discusso in polacco, ho sognato (qualche volta) anche in polacco...*

**PL**
- Eyebrow: *O mnie*
- H1: *Jestem Giada, dyplomowana nauczycielka języka włoskiego, ale zanim nią zostałam, przez prawie 7 lat byłam adoptowaną Polką.*
- Lede: *Mieszkałam w Krakowie. Robiłam zakupy po polsku, kłóciłam się po polsku, czasem nawet śniłam po polsku. I pośród tego wszystkiego nauczyłam się czegoś, czego nie znajdziesz w żadnym podręczniku metodyki: dokładnie wiem, gdzie polski język stawia ci przeszkody, kiedy próbujesz zanurzyć się we włoskim choćby na godzinę dziennie.*

**EN**
- Eyebrow: *About me*
- H1: *I'm Giada, a certified Italian teacher — but before that, I was an adopted Pole for almost seven years.*
- Lede: *I lived in Kraków. I did my grocery shopping in Polish, argued in Polish, and sometimes even dreamed in Polish. And somewhere in the middle of all that, I learned something you won't find in any teaching manual: I know exactly where the Polish language trips you up when you try to immerse yourself in Italian, even for just an hour a day.*

### "La storia, prima ancora della professione"

**PL**
- Eyebrow: *Historia, zanim jeszcze zawód*
- H2: *Ukończyłam filologię nowożytną ze specjalizacją w języku polskim i rosyjskim.*
- P1: *Moja ścieżka od początku była nastawiona na dydaktykę włoskiego, a moja praca magisterska poświęcona była właśnie temu, jak uczy się języka włoskiego w Polsce. Potem teoria stała się prawdziwym życiem: prawie 7 lat w Krakowie, spędzonych między innymi na pracy we Włoskim Instytucie Kultury, wśród kursów, wydarzeń i ludzi, którzy — tak jak ty — zakochali się we Włoszech, jeszcze zanim tam pojechali.*
- P2: *Widziałam z bliska, co działa, a co nie, kiedy Polka lub Polak próbuje nauczyć się włoskiego. Widziałam frustrację wobec gramatyki tłumaczonej jak twierdzenia matematyczne. Widziałam strach przed otwarciem ust i popełnieniem błędu przy kimś. I zrozumiałam, że problemem prawie nigdy nie była zdolność do nauki — tylko sposób, w jaki tej nauki uczono.*

**EN**
- Eyebrow: *The story, before the profession*
- H2: *I graduated in Modern Languages, specializing in Polish and Russian.*
- P1: *My studies were already geared toward teaching Italian, and my thesis focused specifically on how Italian is taught in Poland. Then theory became real life: almost seven years in Kraków, spent, among other things, working at the Italian Institute of Culture, surrounded by courses, events, and people who — just like you — had fallen in love with Italy before ever setting foot there.*
- P2: *I saw up close what works and what doesn't when a Polish speaker tries to learn Italian. I saw the frustration of grammar explained like mathematical theorems. I saw the fear of opening your mouth and getting it wrong in front of someone. And I understood that the problem almost never was the ability to learn — it was how it was being taught.*

### "Il metodo"

**PL**
- H2: *Metoda*
- P1: *Nie uczę włoskiego jako listy reguł do zapamiętania. Uczę go jako sposobu bycia w świecie, przeżywania języka włoskiego i Włoch we wszystkich możliwych odcieniach.*
- P2: *Zaletą tego, że mieszkałam „po drugiej stronie", jest to, że nie tłumaczę ci włoskiego tak, jak zrobiłaby to przypadkowa rodzima Włoszka wobec zagranicznego ucznia. Wyjaśniam ci go, wychodząc od miejsca, w którym teraz jesteś, od tego, jak myśli twoja głowa, kiedy myśli po polsku — i stamtąd buduję most.*

**EN**
- H2: *The method*
- P1: *I don't teach Italian as a list of rules to memorize. I teach it as a way of being in the world, of living the Italian language and Italy in all their possible facets.*
- P2: *The advantage of having lived "on the other side" is that I don't explain Italian to you the way any native speaker would explain it to a foreign student. I explain it starting from where you are right now, from how your mind thinks when it thinks in Polish — and I build a bridge from there.*

### Tre pillole (competenza / esperienza / comprensione)

**PL**
1. 🎓 *Certyfikowane kompetencje* — *Studia z filologii nowożytnej, specjalizacja slawistyczna, praca magisterska o dydaktyce włoskiego dla polskich studentów, studia podyplomowe z nauczania włoskiego jako języka obcego.*
2. 🏛️ *Doświadczenie w praktyce* — *6 lat we Włoskim Instytucie Kultury w Krakowie, setki osób, którym towarzyszyłam w nauce.*
3. 🇵🇱 *Autentyczne zrozumienie* — *7 lat życia w Polsce: znam nie tylko język, znam kulturę, historię, mentalność.*

**EN**
1. 🎓 *Certified expertise* — *Degree in Modern Languages, Slavic specialization, thesis on teaching Italian to Polish students, master's in teaching Italian to foreigners.*
2. 🏛️ *Hands-on experience* — *6 years at the Italian Institute of Culture in Kraków, hundreds of students guided along the way.*
3. 🇵🇱 *Genuine understanding* — *7 years lived in Poland: I don't just know the language, I know the culture, the history, the mindset.*

### Citazione "spazio sicuro" (versione Chi Sono)

**PL**: *Ze mną błąd to nie porażka: to dowód, że się uczysz. Lekcje to małe, kameralne spotkania, maksymalnie 6 osób, zaprojektowane specjalnie po to, żebyś mogła/mógł mówić bez lęku przed oceną.*
*(nota: "mogła/mógł" per restare neutro sul genere anche in polacco — fammi sapere se preferite una formulazione diversa)*

**EN**: *With me, making a mistake isn't a failure — it's proof that you're learning. Lessons are small, intimate groups, six people maximum, designed specifically so you can speak without the fear of being judged.*

### Chiusura

**PL**
- H2: *Jeśli szukasz kogoś, kto wytłumaczy ci gramatykę w chłodny, podręcznikowy sposób, prawdopodobnie nie jestem odpowiednią nauczycielką dla ciebie.*
- P: *Jeśli natomiast szukasz przewodniczki, która naprawdę wprowadzi cię w język, w kulturę, we Włochy — to być może właśnie się odnalazłyśmy.*
- CTA1: *Zobacz ofertę kursów* → /pl/offerta-formativa
- CTA2: *Napisz do mnie* → mailto:giada@italianoservito.it

**EN**
- H2: *If you're looking for someone to explain grammar to you in a cold, textbook way, I'm probably not the right teacher for you.*
- P: *But if you're looking for a guide who will truly bring you into the language, into the culture, into Italy — then maybe we've found each other.*
- CTA1: *See the course offering* → /en/offerta-formativa
- CTA2: *Write to me* → mailto:giada@italianoservito.it

---

## FAQ

### Intestazione

**PL**: Eyebrow *Najczęściej zadawane pytania* — H1 *Wszystko, co warto wiedzieć, zanim zaczniesz* — Lede *Jeśli masz inne wątpliwości, spotkanie zapoznawcze lub wiadomość na giada@italianoservito.it to wciąż najszybszy sposób, żeby uzyskać odpowiedź skrojoną na miarę.*

**EN**: Eyebrow *Frequently asked questions* — H1 *Everything you want to know before you start* — Lede *If you have other questions, a get-to-know-you lesson or a message to giada@italianoservito.it is still the fastest way to get an answer tailored to you.*

### Le 9 domande

**1. Le lezioni sono individuali o di gruppo?**
- PL: *Czy lekcje są indywidualne, czy grupowe?* — *Wszystkie kursy „L'Italiano è Servito" to lekcje grupowe, nigdy indywidualne: małe grupy online, od 3 do maksymalnie 6 osób. To świadomy wybór, a nie ograniczenie: wierzę w siłę interakcji między ludźmi. Uczysz się więcej i szybciej, rozmawiając z innymi, którzy mierzą się z tymi samymi trudnościami co ty.*
- EN: *Are the lessons individual or group lessons?* — *All "L'Italiano è Servito" courses are group lessons, never individual ones: small online groups, from 3 to a maximum of 6 people. It's a deliberate choice, not a limitation: I believe in the power of interaction between people. You learn more, and faster, by talking with others who are facing the same challenges as you.*

**2. Perché scegliere un corso di gruppo invece di un'insegnante privata?**
- PL: *Dlaczego wybrać kurs grupowy zamiast prywatnej nauczycielki?* — *Ponieważ języka uczysz się, rozmawiając z innymi ludźmi. W małej grupie konfrontujesz się z innymi, słuchasz, jak wyrażają się osoby na twoim poziomie, a przede wszystkim ćwiczysz prowadzenie prawdziwej rozmowy. To ta sama zasada, na której zbudowałam swoją metodę, wypracowaną przez lata nauczania w Polsce.*
- EN: *Why choose a group course instead of a private tutor?* — *Because a language is trained by talking with other people. In a small group you compare notes, listen to how others at your level express themselves, and above all, you train yourself to hold a real conversation. It's the same principle my method is built on, developed over years of teaching in Poland.*

**3. Come si svolgono i corsi e su quale piattaforma?**
- PL: *Jak wyglądają kursy i na jakiej platformie się odbywają?* — *Lekcje są online, na żywo na Zoomie, w małych grupach (maksymalnie 6 osób). To nie są nagrane wideolekcje: mówi się, zadaje pytania, naprawdę rozmawia się już od pierwszej lekcji.*
- EN: *How do the courses work and on which platform?* — *Lessons are online, live on Zoom, in small groups (six people maximum). They're not pre-recorded video lessons: you speak, ask questions, and have real conversations from the very first lesson.*

**4. Che livello di italiano serve per iniziare?**
- PL: *Jaki poziom włoskiego jest potrzebny, żeby zacząć?* — *Żaden. Kurs „Odblokuj się od zera" został pomyślany właśnie dla osób, które nigdy nie mówiły po włosku albo tylko próbowały. Od tego miejsca dalej są ścieżki na każdy poziom, od B1 do C2: „Znajdź swój głos" dla osób, które mają podstawy, ale blokują się przy mówieniu, „Odkryj język" dla tych, którzy chcą uchwycić najsubtelniejsze niuanse kulturowe. W razie wątpliwości spotkanie zapoznawcze pomaga zrozumieć, od czego zacząć.*
- EN: *What level of Italian do I need to start?* — *None. "Unlock from Zero" was designed exactly for people who have never spoken Italian, or have only tried. From there, there are paths for every level, from B1 to C2: "Find Your Voice" for those who have the basics but freeze up when speaking, "Explore the Language" for those who want to grasp the finest cultural nuances. If you're unsure, a get-to-know-you session helps figure out where to start.*

**5. Le spiegazioni sono disponibili anche in polacco?**
- PL: *Czy wyjaśnienia są dostępne również po polsku?* — *Tak. Mieszkałam siedem lat w Polsce, w tym sześć pracując we Włoskim Instytucie Kultury w Krakowie, i dokładnie wiem, gdzie struktura polskiego utrudnia naukę włoskiego. Kiedy trzeba, tłumaczę najtrudniejszą gramatykę, wychodząc właśnie od porównania z polskim, a nie z przetłumaczonego włoskiego podręcznika.*
- EN: *Are explanations also available in Polish?* — *Yes. I lived in Poland for seven years, six of them working at the Italian Institute of Culture in Kraków, and I know exactly where the structure of Polish makes learning Italian harder. When needed, I explain the trickiest grammar starting from a comparison with Polish, not from a translated Italian textbook.*

**6. Quanto costano i corsi e quando iniziano?**
- PL: *Ile kosztują kursy i kiedy się zaczynają?* — *Ceny, godziny i daty zmieniają się przy każdej edycji: zawsze znajdziesz je aktualne na stronie z bieżącą ofertą kursów, z ograniczoną liczbą miejsc, żeby zagwarantować małe grupy. W razie wątpliwości można napisać bezpośrednio na giada@italianoservito.it.* (link a /pl/offerta-formativa + mailto)
- EN: *How much do the courses cost, and when do they start?* — *Prices, times and dates change with every session: you'll always find them up to date on the current course offering page, with limited spots to keep groups small. For any questions, you can write directly to giada@italianoservito.it.* (link a /en/offerta-formativa + mailto)

**7. Cosa succede se sbaglio o ho paura di parlare davanti agli altri?**
- PL: *Co się stanie, jeśli się pomylę albo boję się mówić przy innych?* — *To najczęstszy punkt wyjścia, a nie przeszkoda. Grupy są celowo małe, żeby zaufanie budowało się szybko, a na każdej lekcji błądzenie jest częścią drogi: to dowód, że próbujesz, a nie porażka.*
- EN: *What happens if I make a mistake or I'm afraid to speak in front of others?* — *It's the most common starting point, not an obstacle. Groups are small on purpose so trust builds quickly, and in every lesson, making mistakes is part of the process: it's proof that you're trying, not a failure.*

**8. Come mi iscrivo a un corso?**
- PL: *Jak zapisać się na kurs?* — *Wypełniasz formularz na stronie z aktualną ofertą kursów albo piszesz bezpośrednio na giada@italianoservito.it: po zapisaniu się otrzymujesz potwierdzenie mailowe ze wszystkimi szczegółami dotyczącymi udziału.* (link a /pl/offerta-formativa + mailto)
- EN: *How do I sign up for a course?* — *You fill in the form on the current course offering page, or you can write directly to giada@italianoservito.it: after signing up, you'll receive an email confirmation with all the details you need to take part.* (link a /en/offerta-formativa + mailto)

**9. Devo versare una caparra per confermare il mio posto?**
- PL: *Czy muszę wpłacić zadatek, żeby potwierdzić swoje miejsce?* — *Tak: żeby realnie zarezerwować miejsce, potrzebny jest zadatek w wysokości 100 PLN, który później jest odejmowany od całkowitego kosztu kursu. To rozwiązanie wynikające z konkretnego doświadczenia: w przeszłości niektóre osoby zapisywały się, rezerwując miejsce, a potem się nie pojawiały, zabierając miejsce tym, którym naprawdę na nim zależało. Ponieważ grupy są małe, a miejsc jest niewiele, słusznie jest, żeby zostały dla osób gotowych zacząć. Szczegóły dotyczące wpłaty wyjaśniam osobiście w momencie potwierdzenia.*
- EN: *Do I need to pay a deposit to confirm my spot?* — *Yes: to actually reserve your spot, a 100 PLN deposit is required, which is then subtracted from the total cost of the course. This came from a real experience: in the past, some people signed up, reserving a spot, and then never showed up, leaving out people who genuinely wanted it. Since groups are small and spots are limited, it's only fair that they go to people who are ready to start. The details on how to pay it are explained personally when your spot is confirmed.*

---

## OFFERTA FORMATIVA

### Hero

**PL**
- Timbro: *Zapisz się na nowe kursy*
- H1: *Kursy online języka włoskiego*
- Sottotitolo verde: *Bo włoski to przyjemność!*
- Lede 1: *Cześć! Jestem Giada, nauczycielka języka i kultury włoskiej dla osób obcokrajowców. Po latach nauczania w Polsce założyłam „L'Italiano è Servito", żeby pomóc osobom ze świata słowiańskiego naprawdę przeżywać język włoski, a nie tylko się go uczyć.*
- Lede 2: *Dla mnie nauczanie włoskiego oznacza wejście w samo serce Włoch: w gesty, smaki, tradycje.*
- CTA: *Zarezerwuj swoje miejsce*

**EN**
- Timbro: *Enroll in the new courses*
- H1: *Online Italian language courses*
- Sottotitolo verde: *Because Italian is a pleasure!*
- Lede 1: *Hi! I'm Giada, a teacher of Italian language and culture for people from abroad. After years of teaching in Poland, I founded "L'Italiano è Servito" to help people from the Slavic world truly experience the Italian language, not just study it.*
- Lede 2: *To me, teaching Italian means stepping into the heart of Italy: into its gestures, its flavors, its traditions.*
- CTA: *Reserve your spot*

### Intestazione calendario corsi

**PL**: H2 *Kalendarz kursów | {sezon}* — Intro *W tym semestrze proponuję ci kursy online w małych grupach (od 3 do 6 osób), żeby uczyć się, rozmawiać i doskonalić swój włoski w przyjaznej atmosferze. Niezależnie od twojego poziomu, znajdziesz kurs pomyślany właśnie dla ciebie, z programem dopasowanym do twoich potrzeb i twojego tempa.*

**EN**: H2 *Course calendar | {season}* — Intro *This semester I'm offering online courses in small groups (3 to 6 people) so you can learn, converse, and improve your Italian in a welcoming environment. Whatever your level, you'll find a course designed for you, with a program suited to your needs and your pace.*

### Riga info

**PL**: *Potrzebujesz więcej informacji? Napisz do mnie na giada@italianoservito.it*
**EN**: *Need more information? Write to me at giada@italianoservito.it*

### "Perché scegliere i miei corsi" (4 voci)

**PL** — H2 *Dlaczego warto wybrać moje kursy*
1. *Doświadczona native speakerka* — *8 lat nauczania osób dorosłych na każdym poziomie językowym.*
2. *Jasne wyjaśnienia także po polsku* — *Rozumiesz najtrudniejszą gramatykę dzięki wsparciu w twoim ojczystym języku.*
3. *Praktyczne lekcje, nigdy sama teoria* — *Mówisz od pierwszego dnia, w realnych sytuacjach, a kiedy potrzeba gramatyki, wyjaśniam ją od razu, bez zbędnych ozdobników.*
4. *Maksymalnie 6 osób w grupie* — *Odpowiednia przestrzeń, żeby mówić i zadawać pytania na każdej lekcji.*

**EN** — H2 *Why choose my courses*
1. *Experienced native speaker* — *8 years teaching adults at every language level.*
2. *Clear explanations, in Polish too* — *You understand even the hardest grammar thanks to support in your native language.*
3. *Practical lessons, never just theory* — *You speak from day one, in real contexts, and when grammar is needed, I explain it right away, no frills.*
4. *Six people per group, maximum* — *The right amount of space to speak and ask questions in every lesson.*

### Sezione "La mia storia"

**PL**
- Eyebrow: *Moja historia*
- H2: *Cześć! Jestem Giada Longo i mam szczęście wykonywać najpiękniejszy zawód świata: uczę włoskiego osoby spoza Włoch.*
- P1: *Ukończyłam filologię nowożytną ze specjalizacją w języku polskim i rosyjskim, a moja praca magisterska poświęcona była właśnie dydaktyce włoskiego w Polsce.*
- P2: *W Polsce naprawdę się zakochałam: po stażu na Uniwersytecie Jagiellońskim w Krakowie zdecydowałam się mieszkać tam przez siedem lat, budując tam swoje doświadczenie w nauczaniu, ze szczególną uwagą poświęconą osobom polskiego lub słowiańskiego pochodzenia.*
- P3: *Przez sześć lat pracowałam we Włoskim Instytucie Kultury w Krakowie, doskonaląc się na tematycznych warsztatach i rozwijając swoje umiejętności w nauczaniu online.*

**EN**
- Eyebrow: *My story*
- H2: *Hi! I'm Giada Longo, and I'm lucky enough to do the most beautiful job in the world: teaching Italian to people from abroad.*
- P1: *I graduated in Modern Languages with a specialization in Polish and Russian, with a master's thesis focused specifically on teaching Italian in Poland.*
- P2: *As for Poland, I truly fell in love with it: after an internship at the Jagiellonian University in Kraków, I chose to live there for seven years, building my teaching experience with particular attention to people of Polish or Slavic origin.*
- P3: *I worked for six years at the Italian Institute of Culture in Kraków, keeping up to date with themed workshops and refining my skills in online teaching.*

### Sezione "Dettagli"

**PL**
- H2: *Szczegóły*
- 📅 {okres} · 💻 *Online na Zoomie* · 🧑‍🏫 *Ograniczona liczba miejsc: żeby realnie zarezerwować swoje miejsce, poproszę cię o niewielki zadatek w wysokości 100 PLN.*
- Card scadenza: *Termin zapisów: {data}* — countdown *Dni / Godziny / Min / Sek*
- CTA: *Zarezerwuj swoje miejsce już teraz*

**EN**
- H2: *Details*
- 📅 {period} · 💻 *Online on Zoom* · 🧑‍🏫 *Limited spots: to actually reserve your spot, I'll ask you for a small 100 PLN deposit.*
- Card scadenza: *Enrollment deadline: {date}* — countdown *Days / Hours / Min / Sec*
- CTA: *Reserve your spot now*

### Etichette e testi delle card corso (dati da corsiStagione.js)

Questi sono valori dati, non testo statico della pagina: quando costruisco
la versione multilingua aggiungo i campi PL/EN accanto a quelli italiani in
`corsiStagione.js`. Traduzioni pronte:

| Campo | IT | PL | EN |
|---|---|---|---|
| Etichetta "Giorno libero:" | Giorno libero: | Dzień wolny: | Day off: |
| Etichetta bundle | In abbinamento a un corso: | W pakiecie z kursem: | Bundled with a course: |
| Tipo — Sbloccati A1 | Corso base da zero | Kurs podstawowy od zera | Basic course from zero |
| Tipo — Sbloccati A2 | Corso di consolidamento delle basi | Kurs utrwalający podstawy | Foundations consolidation course |
| Tipo — Trova la tua Voce B1 | Corso di gruppo con grammatica mirata | Kurs grupowy z ukierunkowaną gramatyką | Group course with targeted grammar |
| Tipo — Esplora la Lingua (C1/C1-C2/C2) | Corso di approfondimento avanzato | Kurs pogłębiony, poziom zaawansowany | Advanced in-depth course |
| Tè e Riviste — come funziona | A casa leggi un articolo da una rivista italiana che ti fornisco io; a lezione (circa ogni due settimane) lo analizziamo e commentiamo insieme. Le riviste e gli articoli cambiano ogni volta genere e argomento. | W domu czytasz artykuł z włoskiego czasopisma, które ci dostarczam; na spotkaniu (mniej więcej co dwa tygodnie) analizujemy go i komentujemy razem. Czasopisma i artykuły za każdym razem zmieniają gatunek i temat. | At home, you read an article from an Italian magazine that I provide; in the session (roughly every two weeks) we analyze and discuss it together. The magazines and articles change genre and topic each time. |
| Club del Libro — come funziona | A casa leggi un brano da un libro italiano che ti fornisco io; a lezione (circa ogni due settimane) lo analizziamo e commentiamo insieme. | W domu czytasz fragment włoskiej książki, którą ci dostarczam; na spotkaniu (mniej więcej co dwa tygodnie) analizujemy go i komentujemy razem. | At home, you read a passage from an Italian book that I provide; in the session (roughly every two weeks) we analyze and discuss it together. |

Le date/orari/prezzi restano numeri e non serve tradurli, tranne il
formato data se preferite un altro stile in inglese (es. "Sept 22" invece
di "22.09.26") — ditemi se volete che lo adatti.

---

## PAGINA GRAZIE (unica per le 3 lingue)

**IT (per riferimento)**: Timbro *Iscrizione ricevuta* — H1 *Grazie! Il tuo posto è prenotato.* — *Ho ricevuto i tuoi dati e ti scrivo personalmente entro 24-48 ore, per confermarti tutti i dettagli e i prossimi passi.* — *Nel frattempo, se hai già controllato la posta e non trovi nulla, dai un'occhiata anche nella cartella spam...* — CTA *Torna alla home*

**PL**: Timbro *Zgłoszenie zostało odebrane* — H1 *Dziękuję! Twoje miejsce jest zarezerwowane.* — *Otrzymałam twoje dane i napiszę do ciebie osobiście w ciągu 24-48 godzin, żeby potwierdzić wszystkie szczegóły i kolejne kroki.* — *W międzyczasie, jeśli sprawdziłaś/eś już pocztę i nic nie widzisz, zajrzyj też do folderu spam: czasem maile potwierdzające tam trafiają.* — CTA *Wróć do strony głównej*

**EN**: Timbro *Enrollment received* — H1 *Thank you! Your spot is reserved.* — *I've received your details and I'll write to you personally within 24-48 hours to confirm all the details and next steps.* — *In the meantime, if you've already checked your inbox and can't find anything, take a look in your spam folder too: confirmation emails sometimes end up there.* — CTA *Back to home*

**Proposta tecnica**: mostro il blocco giusto rilevando la lingua dal
referrer (se arrivi da `/pl/offerta-formativa` vedi il testo polacco, da
`/en/...` l'inglese, altrimenti l'italiano di default), con tutti e tre i
blocchi presenti nell'HTML come fallback. Fammi sapere se preferite un
approccio diverso (es. un parametro nell'URL tipo `/grazie?lang=pl`).

---

## Stringhe condivise (Navbar, Footer, Form di iscrizione)

### Navbar (versione semplificata PL/EN — vedi nota 2)

| IT | PL | EN |
|---|---|---|
| Home | Home | Home |
| Chi Sono | O mnie | About me |
| FAQ | FAQ | FAQ |
| Corsi I semestre 2026/27 (bottone) | Kursy, I semestr 2026/27 | I semester 2026/27 courses |
| Iscriviti (versione mobile del bottone) | Zapisz się | Enroll |

### Footer

| IT | PL | EN |
|---|---|---|
| Un percorso di trasformazione linguistica, non una lista di regole da studiare. | Droga transformacji językowej, a nie lista reguł do wykucia. | A path of linguistic transformation, not a list of rules to memorize. |
| Il sito | Strona | Site |
| Chi Sono | O mnie | About me |
| FAQ | FAQ | FAQ |
| Privacy Policy | Polityka Prywatności | Privacy Policy |
| Seguimi | Obserwuj mnie | Follow me |

*(Le voci "I Percorsi" e "Contatti" sono omesse dal footer PL/EN per lo stesso motivo della navbar — nota 2. "Privacy Policy" continuerà a puntare alla pagina italiana, unica esistente, salvo diversa indicazione.)*

### Form di iscrizione (componente SignupForm, usato in Offerta Formativa)

| IT | PL | EN |
|---|---|---|
| Iscriviti ora (titolo) | Zapisz się teraz | Enroll now |
| Compila il modulo per prenotare il tuo posto: non è una semplice richiesta di informazioni, è la tua iscrizione. Ti confermo tutto via email appena la ricevo. | Wypełnij formularz, żeby zarezerwować swoje miejsce: to nie jest zwykłe zapytanie o informacje, to twój zapis. Potwierdzę wszystko mailowo, jak tylko go otrzymam. | Fill in the form to reserve your spot: this isn't a simple information request, it's your enrollment. I'll confirm everything by email as soon as I receive it. |
| Nome | Imię | Name |
| Email | Email | Email |
| Telefono (anche WhatsApp) | Telefon (także WhatsApp) | Phone (WhatsApp works too) |
| Es. +48 123 456 789 | Np. +48 123 456 789 | E.g. +48 123 456 789 |
| A quale corso vuoi iscriverti? | Na jaki kurs chcesz się zapisać? | Which course would you like to join? |
| Scegli il corso | Wybierz kurs | Choose a course |
| (solo) | (samodzielnie) | (standalone) |
| Non ho ancora deciso, aiutami a scegliere | Jeszcze nie zdecydowałam/em, pomóż mi wybrać | I haven't decided yet, help me choose |
| Vuoi abbinare anche un club di conversazione? (prezzo bundle da confermare via email) | Chcesz dołączyć też klub konwersacyjny? (cenę pakietu potwierdzę mailowo) | Would you like to add a conversation club too? (bundle price to be confirmed by email) |
| Voglio abbinare anche {corso}, {orario} (a partire da PLN {prezzo}). | Chcę dołączyć też {corso}, {orario} (już od {prezzo} PLN). | I'd also like to add {corso}, {orario} (starting from PLN {prezzo}). |
| Raccontami di più (facoltativo) | Opowiedz mi więcej (opcjonalnie) | Tell me more (optional) |
| Il tuo livello, i tuoi obiettivi, qualunque dubbio: aiutami a capire qual è il corso giusto per te. | Twój poziom, twoje cele, wszelkie wątpliwości: pomóż mi zrozumieć, który kurs będzie dla ciebie odpowiedni. | Your level, your goals, any doubts: help me understand which course is right for you. |
| Iscrivimi anche alla newsletter | Zapisz mnie też na newsletter | Sign me up for the newsletter too |
| Ho letto e accetto la Privacy Policy * | Przeczytałam/em i akceptuję Politykę Prywatności * | I have read and accept the Privacy Policy * |
| Prenota il tuo posto (bottone invio) | Zarezerwuj swoje miejsce | Reserve your spot |

---

## Cosa mi serve da te per procedere

1. Conferma (o correzioni) sul testo PL ed EN qui sopra — anche solo un
   "ok, vai" o correzioni puntuali per sezione.
2. Il testo originale in polacco delle testimonianze di Kamila e Małgosia,
   se vuoi che compaiano nella Home in PL (vedi nota 4).
3. Un parere sulla pagina Grazie: va bene il riconoscimento automatico
   della lingua dal referrer, o preferisci un altro modo?
4. Una volta approvato, costruisco le 4 pagine × 2 lingue + Grazie
   aggiornata, aggiorno Navbar/Footer/SignupForm, e poi verifico tutto con
   build e screenshot prima di consegnare.
