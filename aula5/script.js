const BASE = 'https://pokeapi.co/api/v2';
const INITIAL_COUNT = 150;

const grid = document.getElementById('pokemon-grid');
const loading = document.getElementById('loading');
const statusMsg = document.getElementById('status-msg');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const clearBtn = document.getElementById('clear-btn');
const typeFilter = document.getElementById('type-filter');

let allPokemon = [];
let currentFilter = 'all';

function showLoading(show) {
  loading.classList.toggle('hidden', !show);
}

function setStatus(msg, isError = false) {
  statusMsg.textContent = msg;
  statusMsg.className = 'status-msg' + (isError ? ' error' : '');
}

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function fetchPokemonDetail(nameOrId) {
  const data = await fetchJSON(`${BASE}/pokemon/${nameOrId}`);
  const image =
    (data.sprites.other &&
      data.sprites.other['official-artwork'] &&
      data.sprites.other['official-artwork'].front_default) ||
    data.sprites.front_default ||
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`;
  return {
    id: data.id,
    name: data.name,
    image,
    types: data.types.map(t => t.type.name),
  };
}

async function fetchBatch(names, batchSize = 10) {
  const results = [];
  for (let i = 0; i < names.length; i += batchSize) {
    const batch = names.slice(i, i + batchSize);
    const settled = await Promise.allSettled(batch.map(n => fetchPokemonDetail(n)));
    settled.forEach(r => {
      if (r.status === 'fulfilled') results.push(r.value);
    });
    setStatus(`Carregando... ${Math.min(i + batchSize, names.length)}/${names.length}`);
  }
  return results;
}

function buildCard(poke) {
  const card = document.createElement('div');
  card.className = 'pokemon-card';
  card.innerHTML = `
    <div class="pokemon-id">#${String(poke.id).padStart(3, '0')}</div>
    <img class="pokemon-img" src="${poke.image}" alt="${poke.name}" loading="lazy" />
    <div class="pokemon-name">${poke.name}</div>
    <div class="type-badges">
      ${poke.types.map(t => `<span class="type-badge type-${t}">${t}</span>`).join('')}
    </div>
  `;
  return card;
}

function renderPokemon(list) {
  grid.innerHTML = '';
  if (list.length === 0) {
    setStatus('Nenhum Pokémon encontrado.', true);
    return;
  }
  setStatus(`${list.length} Pokémon${list.length > 1 ? 's' : ''} encontrado${list.length > 1 ? 's' : ''}`);
  list.forEach(p => grid.appendChild(buildCard(p)));
}

function applyFilter() {
  if (currentFilter === 'all') {
    renderPokemon(allPokemon);
  } else {
    renderPokemon(allPokemon.filter(p => p.types.includes(currentFilter)));
  }
}

async function loadInitial() {
  showLoading(true);
  grid.innerHTML = '';
  setStatus('Carregando Pokémons...');
  try {
    const list = await fetchJSON(`${BASE}/pokemon?limit=${INITIAL_COUNT}&offset=0`);
    const names = list.results.map(p => p.name);
    allPokemon = (await fetchBatch(names)).sort((a, b) => a.id - b.id);
    await loadTypes();
    applyFilter();
  } catch (e) {
    console.error(e);
    setStatus('Erro ao carregar. Verifique conexão e recarregue.', true);
  } finally {
    showLoading(false);
  }
}

async function loadTypes() {
  try {
    const data = await fetchJSON(`${BASE}/type`);
    const types = data.results.map(t => t.name).filter(t => !['unknown', 'shadow'].includes(t));
    types.sort();
    // clear existing options except "Todos"
    while (typeFilter.options.length > 1) typeFilter.remove(1);
    types.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t;
      opt.textContent = t.charAt(0).toUpperCase() + t.slice(1);
      typeFilter.appendChild(opt);
    });
  } catch (_) {}
}

async function searchPokemon() {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) return;

  showLoading(true);
  setStatus('Buscando...');
  grid.innerHTML = '';
  try {
    const poke = await fetchPokemonDetail(query);
    allPokemon = [poke];
    currentFilter = 'all';
    typeFilter.value = 'all';
    renderPokemon(allPokemon);
  } catch (_) {
    setStatus(`Pokémon "${query}" não encontrado.`, true);
  } finally {
    showLoading(false);
  }
}

function clearSearch() {
  searchInput.value = '';
  currentFilter = 'all';
  typeFilter.value = 'all';
  loadInitial();
}

searchBtn.addEventListener('click', searchPokemon);
searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') searchPokemon(); });
clearBtn.addEventListener('click', clearSearch);
typeFilter.addEventListener('change', () => {
  currentFilter = typeFilter.value;
  applyFilter();
});

loadInitial();
