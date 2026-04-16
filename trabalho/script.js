/* ============================================================
   DARIA WIKI — script.js
   Interações JS:
     1. Tema claro / escuro (toggle + localStorage)
     2. Cards de personagens expansíveis (toggle)
     3. Gerador de frases com fade
     4. Adicionar tags aleatórias
     5. Scroll suave para âncoras
   ============================================================ */

/* ---- 1. TEMA CLARO / ESCURO ---- */
const themeBtn = document.getElementById('theme-toggle');

// Persiste preferência do usuário
let darkMode = localStorage.getItem('darkMode') === 'true';

function applyTheme() {
    document.body.classList.toggle('dark-mode', darkMode);
    themeBtn.textContent = darkMode ? '☀️ Modo Claro' : '🌙 Modo Escuro';
}

applyTheme(); // aplica ao carregar

themeBtn.addEventListener('click', function () {
    darkMode = !darkMode;
    localStorage.setItem('darkMode', darkMode);
    applyTheme();
});


/* ---- 2. CARDS DE PERSONAGENS EXPANSÍVEIS ---- */
function toggleChar(card) {
    const jáAberto = card.classList.contains('expanded');

    // Fecha todos os outros cards
    document.querySelectorAll('.char-card').forEach(function (c) {
        c.classList.remove('expanded');
    });

    // Abre o clicado (se estava fechado)
    if (!jáAberto) {
        card.classList.add('expanded');
    }
}


/* ---- 3. GERADOR DE FRASES COM FADE ---- */
const frases = [
    '"É difícil fazer amigos quando você prefere livros."',
    '"Minha visão de futuro? Longe daqui."',
    '"Não sou anti-social. Sou seletiva."',
    '"Sorrir demais cansa o rosto. Prefiro economizar."',
    '"A popularidade é o prêmio de consolação da inteligência."',
    '"Eu poderia fingir que me importo. Mas seria muito trabalhoso."',
    '"Lawndale: onde o conformismo tem endereço fixo."',
    '"Não é pessimismo. É realismo com estilo."',
    '"Por que ser normal quando você pode ser você mesmo?"',
    '"Amigos são pessoas que ainda te suportam depois de te conhecerem de verdade."',
    '"A sociedade funciona melhor quando as pessoas fingem gostar umas das outras."',
    '"Nunca subestime o poder de uma boa desculpa para não comparecer."',
    '"Inteligência é saber o que está acontecendo. Sabedoria é não se importar."',
    '"Se ignorância fosse felicidade, Lawndale seria o paraíso."',
];

const quoteDisplay = document.getElementById('quote-display');
const quoteBtn = document.getElementById('quote-btn');

quoteBtn.addEventListener('click', function () {
    // Efeito de fade-out → troca → fade-in
    quoteDisplay.style.opacity = '0';

    setTimeout(function () {
        const indiceAleatorio = Math.floor(Math.random() * frases.length);
        quoteDisplay.textContent = frases[indiceAleatorio];
        quoteDisplay.style.transition = 'opacity 0.4s';
        quoteDisplay.style.opacity = '1';
    }, 250);
});


/* ---- 4. ADICIONAR TAGS ALEATÓRIAS ---- */
const tagsExtras = [
    'Ironia', 'Antissocial', 'Livros', 'Subúrbio', 'Adolescência',
    'Crítica Cultural', 'Spin-off', 'Jaqueta Verde', 'Lawndale', 'Cinismo',
    'Arte Alternativa', 'Mystik Spiral', 'Óculos Redondos',
];

const addTagBtn = document.getElementById('add-tag-btn');
const tagsContainer = document.getElementById('tags-container');
const tagsAdicionadas = new Set();

addTagBtn.addEventListener('click', function () {
    const disponíveis = tagsExtras.filter(function (t) {
        return !tagsAdicionadas.has(t);
    });

    if (disponíveis.length === 0) {
        addTagBtn.textContent = 'Todas as tags adicionadas!';
        addTagBtn.disabled = true;
        return;
    }

    const nova = disponíveis[Math.floor(Math.random() * disponíveis.length)];
    tagsAdicionadas.add(nova);

    // Cria elemento <span class="tag">
    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = nova;
    span.style.opacity = '0';
    span.style.transition = 'opacity 0.4s';

    tagsContainer.appendChild(span);

    // Pequeno delay para acionar a transição de fade-in
    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            span.style.opacity = '1';
        });
    });
});


/* ---- 5. SCROLL SUAVE PARA ÂNCORAS ---- */
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
        const alvo = document.querySelector(this.getAttribute('href'));
        if (alvo) {
            e.preventDefault();
            alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
