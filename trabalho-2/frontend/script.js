/* ============================================================
   DARIA WIKI — script.js
   Todas as seções carregadas dinamicamente via API.
   Autenticação JWT via formulário de login.
   Nenhum dado estático/mockado no HTML.
   ============================================================ */

var API = '/api/articles';
var AUTH_API = '/api/auth';
var token = '';

/* ---- 0. AUTENTICAÇÃO JWT ---- */
var loginOverlay = document.getElementById('login-overlay');
var loginForm = document.getElementById('login-form');
var loginError = document.getElementById('login-error');

loginForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  var username = document.getElementById('login-username').value;
  var password = document.getElementById('login-password').value;

  try {
    var loginRes = await fetch(AUTH_API + '/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password }),
    });

    if (!loginRes.ok) {
      loginError.textContent = 'Credenciais inválidas.';
      return;
    }

    var data = await loginRes.json();
    token = data.access_token;
    loginError.textContent = '';

    // Esconde overlay e carrega wiki
    loginOverlay.classList.add('hidden');
    loadContent();
  } catch (err) {
    loginError.textContent = 'Erro ao conectar ao servidor.';
    console.error('Erro ao autenticar:', err);
  }
});

function authHeaders() {
  return token ? { Authorization: 'Bearer ' + token } : {};
}

/* ---- 1. CARREGAR CONTEÚDO DA API ---- */
async function loadContent() {
  try {
    var res = await fetch(API, { headers: authHeaders() });
    var articles = await res.json();

    var byCategory = {};
    articles.forEach(function (a) {
      if (!byCategory[a.category]) byCategory[a.category] = [];
      byCategory[a.category].push(a);
    });

    if (byCategory['sobre'])        renderTextSection('sobre-content', byCategory['sobre'][0]);
    if (byCategory['personagens'])  renderCharacters(byCategory['personagens']);
    if (byCategory['temporadas'])   renderSeasons(byCategory['temporadas']);
    if (byCategory['episodios'])    renderEpisodes(byCategory['episodios']);
    if (byCategory['legado'])       renderTextSection('legado-content', byCategory['legado'][0]);
    if (byCategory['curiosidades']) renderCuriosidades(byCategory['curiosidades'][0]);
    if (byCategory['frases'])       renderQuotes(byCategory['frases']);
    if (byCategory['infobox'])      renderInfobox(byCategory['infobox'][0]);
  } catch (err) {
    console.error('Falha ao carregar conteúdo da API:', err);
  }
}

/* ---- 1. TEMA CLARO / ESCURO ---- */
var themeBtn = document.getElementById('theme-toggle');
var darkMode = localStorage.getItem('darkMode') === 'true';

function applyTheme() {
  document.body.classList.toggle('dark-mode', darkMode);
  themeBtn.textContent = darkMode ? '☀️ Modo Claro' : '🌙 Modo Escuro';
}

applyTheme();

themeBtn.addEventListener('click', function () {
  darkMode = !darkMode;
  localStorage.setItem('darkMode', darkMode);
  applyTheme();
});

/* ---- 2. SEÇÕES DE TEXTO (sobre, legado) ---- */
function renderTextSection(containerId, article) {
  var el = document.getElementById(containerId);
  if (!el || !article) return;

  // Converte newlines duplos em parágrafos, newlines simples em <br>
  var html = article.content
    .split(/\n\n+/)
    .map(function (p) {
      return '<p>' + p.replace(/\n/g, '<br>') + '</p>';
    })
    .join('');

  el.innerHTML = html;
}

/* ---- 3. CURIOSIDADES (API) ---- */
function renderCuriosidades(article) {
  var el = document.getElementById('curiosidades-content');
  if (!el || !article) return;

  var lines = article.content.split('\n').filter(function (l) { return l.trim(); });
  var curiosidadesEnd = false;
  var curiosidadesItems = [];
  var afterText = [];

  for (var i = 0; i < lines.length; i++) {
    if (lines[i].indexOf('Gêneros:') === 0) {
      curiosidadesEnd = true;
      afterText.push(lines[i]);
      continue;
    }
    if (!curiosidadesEnd) {
      curiosidadesItems.push(lines[i]);
    } else {
      afterText.push(lines[i]);
    }
  }

  var html = '<ul class="wiki-list">';
  curiosidadesItems.forEach(function (item) {
    html += '<li>' + item + '</li>';
  });
  html += '</ul>';

  if (afterText.length > 0) {
    html += '<p>' + afterText.join('<br>') + '</p>';
  }

  el.innerHTML = html;
}

/* ---- 4. CARDS DE PERSONAGENS (API) ---- */
function renderCharacters(characters) {
  var grid = document.querySelector('.characters-grid');
  if (!grid) return;

  grid.innerHTML = '';

  characters.forEach(function (char) {
    var card = document.createElement('article');
    card.className = 'char-card';
    card.onclick = function () { toggleChar(card); };

    card.innerHTML =
      '<div class="char-avatar-wrap">' +
      (char.imageUrl
        ? '<img src="' + char.imageUrl + '" alt="' + char.title + '" class="char-img" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';">'
        : '') +
      '<div class="char-avatar-fallback" style="background:#4a5240;">🤓</div>' +
      '</div>' +
      '<h3>' + char.title + '</h3>' +
      '<div class="char-detail">' + char.content + '</div>';

    grid.appendChild(card);
  });
}

function toggleChar(card) {
  var jaAberto = card.classList.contains('expanded');

  document.querySelectorAll('.char-card').forEach(function (c) {
    c.classList.remove('expanded');
  });

  if (!jaAberto) {
    card.classList.add('expanded');
  }
}

/* ---- 5. TEMPORADAS (API) ---- */
function renderSeasons(seasons) {
  var tbody = document.querySelector('#temporadas .data-table tbody');
  if (!tbody) return;

  tbody.innerHTML = '';

  seasons.forEach(function (s) {
    var parts = s.content.split(' | ');
    var ano = (parts.find(function (p) { return p.startsWith('Ano:'); }) || '').replace('Ano: ', '');
    var eps = (parts.find(function (p) { return p.startsWith('Episódios:') || p.startsWith('Especial'); }) || '').replace('Episódios: ', '');
    var destaque = parts[parts.length - 1];

    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td><strong>' + s.title + '</strong></td>' +
      '<td>' + ano + '</td>' +
      '<td>' + eps + '</td>' +
      '<td>' + destaque + '</td>';
    tbody.appendChild(tr);
  });
}

/* ---- 6. EPISÓDIOS MARCANTES (API) ---- */
function renderEpisodes(episodes) {
  var list = document.querySelector('#temporadas ol.wiki-list');
  if (!list) return;

  list.innerHTML = '';

  episodes.forEach(function (ep) {
    var li = document.createElement('li');
    li.innerHTML = '<em>' + ep.title + '</em> — ' + ep.content;
    list.appendChild(li);
  });
}

/* ---- 7. GERADOR DE FRASES (API) ---- */
var frases = [];

function renderQuotes(quoteArticles) {
  if (quoteArticles.length > 0) {
    try {
      frases = JSON.parse(quoteArticles[0].content);
    } catch (e) {
      frases = [quoteArticles[0].content];
    }
  }
}

var quoteDisplay = document.getElementById('quote-display');
var quoteBtn = document.getElementById('quote-btn');

if (quoteBtn) {
  quoteBtn.addEventListener('click', function () {
    if (frases.length === 0) {
      quoteDisplay.textContent = '"Sem frases no banco. Tanto faz."';
      return;
    }

    quoteDisplay.style.opacity = '0';

    setTimeout(function () {
      var indiceAleatorio = Math.floor(Math.random() * frases.length);
      quoteDisplay.textContent = '"' + frases[indiceAleatorio] + '"';
      quoteDisplay.style.transition = 'opacity 0.4s';
      quoteDisplay.style.opacity = '1';
    }, 250);
  });
}

/* ---- 8. INFOBOX (API) ---- */
function renderInfobox(infoArticle) {
  if (!infoArticle) return;

  try {
    var info = JSON.parse(infoArticle.content);
    var table = document.querySelector('.infobox-table');
    if (!table) return;

    var rows = [
      ['Formato', info.formato],
      ['Criado por', info.criadoPor],
      ['Rede', info.rede],
      ['Estreia', info.estreia],
      ['Encerramento', info.encerramento],
      ['Temporadas', info.temporadas],
      ['Episódios', info.episodios],
      ['País', info.pais],
      ['Idioma', info.idioma],
      ['Spin-off de', info.spinOffDe],
    ];

    table.innerHTML = '';
    rows.forEach(function (r) {
      var tr = document.createElement('tr');
      tr.innerHTML = '<td>' + r[0] + '</td><td>' + r[1] + '</td>';
      table.appendChild(tr);
    });

    if (infoArticle.imageUrl) {
      var img = document.querySelector('.infobox-img');
      if (img) img.src = infoArticle.imageUrl;
    }
  } catch (e) {
    // ponytail: infobox content might not be JSON, skip
  }
}

/* ---- 9. ADICIONAR TAGS ALEATÓRIAS ---- */
var tagsExtras = [
  'Ironia', 'Antissocial', 'Livros', 'Subúrbio', 'Adolescência',
  'Crítica Cultural', 'Spin-off', 'Jaqueta Verde', 'Lawndale', 'Cinismo',
  'Arte Alternativa', 'Mystik Spiral', 'Óculos Redondos',
];

var addTagBtn = document.getElementById('add-tag-btn');
var tagsContainer = document.getElementById('tags-container');
var tagsAdicionadas = new Set();

if (addTagBtn) {
  addTagBtn.addEventListener('click', function () {
    var disponiveis = tagsExtras.filter(function (t) {
      return !tagsAdicionadas.has(t);
    });

    if (disponiveis.length === 0) {
      addTagBtn.textContent = 'Todas as tags adicionadas!';
      addTagBtn.disabled = true;
      return;
    }

    var nova = disponiveis[Math.floor(Math.random() * disponiveis.length)];
    tagsAdicionadas.add(nova);

    var span = document.createElement('span');
    span.className = 'tag';
    span.textContent = nova;
    span.style.opacity = '0';
    span.style.transition = 'opacity 0.4s';

    tagsContainer.appendChild(span);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        span.style.opacity = '1';
      });
    });
  });
}

/* ---- 10. SCROLL SUAVE PARA ÂNCORAS ---- */
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    var alvo = document.querySelector(this.getAttribute('href'));
    if (alvo) {
      e.preventDefault();
      alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---- INICIALIZAÇÃO ---- */
// Login form escuta submit. Nada carrega até autenticação manual.
