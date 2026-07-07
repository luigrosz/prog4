import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Article } from './articles/entities/article.entity';
import { User } from './users/entities/user.entity';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USER ?? 'daria',
  password: process.env.DB_PASS ?? 'daria123',
  database: process.env.DB_NAME ?? 'daria_wiki',
  entities: [Article, User],
  synchronize: true,
});

async function seed() {
  await dataSource.initialize();

  // Default user
  const userRepo = dataSource.getRepository(User);
  const existing = await userRepo.findOneBy({ username: 'admin' });
  if (!existing) {
    const hash = await bcrypt.hash('admin123', 10);
    await userRepo.save(userRepo.create({ username: 'admin', password: hash }));
    console.log('Created default user: admin / admin123');
  }

  const repo = dataSource.getRepository(Article);

  const articles: Array<{
    title: string;
    content: string;
    imageUrl?: string;
    sortOrder: number;
    category: string;
  }> = [
    // Sobre a Série
    {
      title: 'Sobre a Série',
      content: `Daria é uma série de animação americana criada por Glenn Eichler e Susie Lewis Lynn, exibida originalmente pelo canal MTV de 1997 a 2002. Conhecida por seu humor sarcástico e crítica social afiada, tornou-se um marco cultural da geração dos anos 90.

A protagonista, Daria Morgendorffer, é uma adolescente inteligente e cínica que se muda com a família para a fictícia cidade de Lawndale. Lá ela precisa navegar pelo universo superficial do ensino médio americano acompanhada de sua única amiga verdadeira, a artista Jane Lane.

Daria surgiu como personagem secundária em Beavis and Butt-Head (1993), também da MTV. Seu sucesso foi tamanho que ganhou seu próprio spin-off.

Produzida pela MTV Animation, cada episódio tem aproximadamente 22 minutos. O estilo visual é propositalmente simples, reforçando a estética indie e alternativa da série.

Criadores: Glenn Eichler e Susie Lewis Lynn | Rede: MTV | Produtora: MTV Animation | Número de episódios: 65 + 2 filmes especiais | País de origem: Estados Unidos | Idioma original: Inglês`,
      imageUrl: 'img/poster.webp',
      sortOrder: 1,
      category: 'sobre',
    },
    // Personagens
    {
      title: 'Daria Morgendorffer',
      content: 'Adolescente intelectual e sarcástica. Adora literatura e despreza superficialidade. Usa óculos redondos e jaqueta verde-oliva. Sua voz é a mais honesta de Lawndale. Protagonista da série.',
      imageUrl: 'img/daria.webp',
      sortOrder: 10,
      category: 'personagens',
    },
    {
      title: 'Jane Lane',
      content: 'Artista visual excêntrica e sardônica. Única amiga verdadeira de Daria. Família disfuncional mas criativa. Parceira perfeita no cinismo.',
      imageUrl: 'img/jane.webp',
      sortOrder: 20,
      category: 'personagens',
    },
    {
      title: 'Quinn Morgendorffer',
      content: 'Irmã popular e obcecada com moda. Oposto total de Daria. Nega ter parentesco com ela nas primeiras temporadas. Evolui bastante ao longo da série.',
      imageUrl: 'img/quinn.webp',
      sortOrder: 30,
      category: 'personagens',
    },
    {
      title: 'Trent Lane',
      content: 'Músico da banda Mystik Spiral. Preguiçoso e sonhador. Interesse amoroso de Daria nas primeiras temporadas.',
      imageUrl: 'img/trent.webp',
      sortOrder: 40,
      category: 'personagens',
    },
    {
      title: 'Helen Morgendorffer',
      content: 'Advogada ambiciosa e workaholic. Prioriza a carreira mas tenta ser uma boa mãe, nem sempre com sucesso. Exigente, competitiva e frequentemente distraída pelo celular.',
      imageUrl: 'img/helen.webp',
      sortOrder: 50,
      category: 'personagens',
    },
    {
      title: 'Jake Morgendorffer',
      content: 'Consultor de marketing ansioso e ingênuo. Carrega traumas do pai severo e explode em crises existenciais sem aviso. Afetivo mas completamente perdido como figura paterna.',
      imageUrl: 'img/jake.webp',
      sortOrder: 60,
      category: 'personagens',
    },
    // Temporadas
    {
      title: '1ª Temporada',
      content: 'Ano: 1997 | Episódios: 13. Daria chega a Lawndale e conhece Jane.',
      sortOrder: 70,
      category: 'temporadas',
    },
    {
      title: '2ª Temporada',
      content: 'Ano: 1998 | Episódios: 13. Aprofundamento das amizades e rivalidades.',
      sortOrder: 80,
      category: 'temporadas',
    },
    {
      title: '3ª Temporada',
      content: 'Ano: 1999 | Episódios: 13. Jane namora; Daria conhece Tom Sloane.',
      sortOrder: 90,
      category: 'temporadas',
    },
    {
      title: '4ª Temporada',
      content: 'Ano: 2000 | Episódios: 13. Daria e Tom namoram; tensão com Jane.',
      sortOrder: 100,
      category: 'temporadas',
    },
    {
      title: '5ª Temporada',
      content: 'Ano: 2001 | Episódios: 13. Preparação para faculdade; término com Tom.',
      sortOrder: 110,
      category: 'temporadas',
    },
    {
      title: 'Is It Fall Yet?',
      content: 'Ano: 2000 | Especial. Verão antes do último ano do colégio.',
      sortOrder: 120,
      category: 'temporadas',
    },
    {
      title: 'Is It College Yet?',
      content: 'Ano: 2002 | Especial. Fim do colégio; encerramento da série.',
      sortOrder: 130,
      category: 'temporadas',
    },
    // Episódios Marcantes
    {
      title: "Esteemsters (S01E01)",
      content: 'Episódio piloto; Daria chega a Lawndale.',
      sortOrder: 140,
      category: 'episodios',
    },
    {
      title: 'The Misery Chick (S01E13)',
      content: 'Reflexão sobre popularidade e tristeza.',
      sortOrder: 150,
      category: 'episodios',
    },
    {
      title: 'Lane Miserables (S03E09)',
      content: 'A família disfuncional de Jane em destaque.',
      sortOrder: 160,
      category: 'episodios',
    },
    {
      title: 'See Jane Run (S02E07)',
      content: 'Jane no time de corrida gera tensão com Daria.',
      sortOrder: 170,
      category: 'episodios',
    },
    {
      title: 'Prize Fighters (S05E03)',
      content: 'Dilemas sobre bolsas de estudo e integridade.',
      sortOrder: 180,
      category: 'episodios',
    },
    {
      title: "My Night at Daria's (S05E12)",
      content: 'Episódio mais polêmico da série.',
      sortOrder: 190,
      category: 'episodios',
    },
    // Legado
    {
      title: 'Legado Cultural',
      content: `Daria deixou uma marca profunda na cultura pop americana e mundial. A série foi pioneira em retratar uma personagem feminina intelectual, sarcástica e anti-conformista como protagonista positiva em uma animação voltada para o público jovem.

Ao contrário de outras séries da época, Daria não precisava ser popular ou socialmente adaptada para ser a heroína. Isso ressoou com toda uma geração de adolescentes que se sentiam deslocados.

Influenciou séries como Bojack Horseman e Big Mouth. Gerou ampla cultura de fan art e fan fiction. Considerada ícone do feminismo pop dos anos 90. Listada entre as melhores animações pela Rolling Stone e Time. Disponível para streaming na Paramount+. Em 2021 a MTV encomendou o reboot Jodie.`,
      sortOrder: 200,
      category: 'legado',
    },
    // Curiosidades
    {
      title: 'Curiosidades sobre Daria',
      content: `Daria é um spin-off de Beavis and Butt-Head (1993–1997).
O sobrenome "Morgendorffer" é propositalmente incomum.
A cidade Lawndale representa qualquer subúrbio americano genérico.
A voz de Daria foi feita por Tracy Grandstaff, sem experiência anterior.
A série no streaming não tem trilha sonora original por direitos autorais.
A banda fictícia Mystik Spiral inspirou músicas reais de fãs.
A expressão inexpressiva de Daria virou símbolo de deadpan humor nos memes.
Quinn chama Daria de "primo distante" para esconder o parentesco durante toda a série.

Gêneros: Animação, Comédia, Anos 90, Sátira Social, Feminismo, Cult Classic, MTV, Ensino Médio, Ironia, Antissocial, Livros, Subúrbio, Adolescência, Crítica Cultural, Spin-off, Jaqueta Verde, Lawndale, Cinismo, Arte Alternativa, Mystik Spiral, Óculos Redondos.`,
      sortOrder: 210,
      category: 'curiosidades',
    },
    // Frases
    {
      title: 'Frases de Daria',
      content: JSON.stringify([
        'É difícil fazer amigos quando você prefere livros.',
        'Minha visão de futuro? Longe daqui.',
        'Não sou anti-social. Sou seletiva.',
        'Sorrir demais cansa o rosto. Prefiro economizar.',
        'A popularidade é o prêmio de consolação da inteligência.',
        'Eu poderia fingir que me importo. Mas seria muito trabalhoso.',
        'Lawndale: onde o conformismo tem endereço fixo.',
        'Não é pessimismo. É realismo com estilo.',
        'Por que ser normal quando você pode ser você mesmo?',
        'Amigos são pessoas que ainda te suportam depois de te conhecerem de verdade.',
        'A sociedade funciona melhor quando as pessoas fingem gostar umas das outras.',
        'Nunca subestime o poder de uma boa desculpa para não comparecer.',
        'Inteligência é saber o que está acontecendo. Sabedoria é não se importar.',
        'Se ignorância fosse felicidade, Lawndale seria o paraíso.',
      ]),
      sortOrder: 220,
      category: 'frases',
    },
    // Infobox
    {
      title: 'Daria (Série) — Ficha Técnica',
      content: JSON.stringify({
        formato: 'Animação / Comédia',
        criadoPor: 'Glenn Eichler & Susie Lewis Lynn',
        rede: 'MTV',
        estreia: '3 de março de 1997',
        encerramento: '25 de janeiro de 2002',
        temporadas: '5 + 2 filmes',
        episodios: '65',
        pais: 'Estados Unidos',
        idioma: 'Inglês',
        spinOffDe: 'Beavis and Butt-Head',
      }),
      imageUrl: 'img/poster.webp',
      sortOrder: 0,
      category: 'infobox',
    },
  ];

  for (const a of articles) {
    await repo.save(repo.create(a));
  }

  console.log(`Seeded ${articles.length} articles.`);
  await dataSource.destroy();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
