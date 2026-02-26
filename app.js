/* =========================
   FUNCIONES BASE
========================= */

function money(n){
  return "$" + Number(n).toLocaleString("en-US");
}

function getFavorito(){
  return localStorage.getItem("favorito") || "";
}

function setFavorito(id){
  localStorage.setItem("favorito", id);
}

function clearFavorito(){
  localStorage.removeItem("favorito");
}


/* =========================
   PAGINA PRINCIPAL (INDEX)
========================= */

function renderIndex(){

  const grid = document.getElementById("cards");
  if(!grid) return;

  const fav = getFavorito();
  const items = Object.values(DESTINOS);

  const favBox = document.getElementById("favBox");

  /* ---- HERO FAVORITO ---- */

  if(fav && DESTINOS[fav]){
    favBox.innerHTML = `
      ❤️ Favorito: <strong>${DESTINOS[fav].nombre}</strong>
      <button id="clearFav" class="mini-btn" type="button">Quitar ✕</button>
    `;
  } else {
    favBox.innerHTML = `❤️ Favorito: <strong>Ninguno</strong>`;
  }


  /* ---- RENDER CARDS ---- */

  grid.innerHTML = items.map(d => {

    const isFav = fav === d.id;

    return `
      <div class="card" style="background-image:url('${d.imagen}')">
        <div class="card-content">

          <div class="badge">${TRIP_DATES}</div>

          <h2>${d.nombre} ${d.bandera}</h2>

          <div class="meta">
            ${money(d.total)} total • ${money(d.porDia)}/day • ${d.incluye}
          </div>

          <div class="desc">
            ${d.descripcion}
          </div>

          <div class="row">
            <a class="btn btn-outline" href="destino.html?id=${d.id}">
              Entrar
            </a>

            <button class="btn favToggle" data-id="${d.id}">
              ${isFav ? "Quitar favorito ✕" : "Elegir mi destino ❤️"}
            </button>
          </div>

        </div>
      </div>
    `;

  }).join("");


  /* ---- EVENTO TOGGLE EN CARDS ---- */

  document.querySelectorAll(".favToggle").forEach(btn => {
    btn.addEventListener("click", function(){

      const id = this.getAttribute("data-id");

      if(getFavorito() === id){
        clearFavorito();
      } else {
        setFavorito(id);
      }

      renderIndex();
    });
  });


  /* ---- EVENTO QUITAR DESDE HERO ---- */

  const clearBtn = document.getElementById("clearFav");
  if(clearBtn){
    clearBtn.addEventListener("click", function(){
      clearFavorito();
      renderIndex();
    });
  }

  renderChart(items);
}


/* =========================
   GRAFICO
========================= */

function renderChart(items){

  const canvas = document.getElementById("priceChart");
  if(!canvas || !window.Chart) return;

  const labels = items.map(d => d.nombre);
  const data = items.map(d => d.porDia);

  if(window.__priceChart){
    window.__priceChart.destroy();
  }

  window.__priceChart = new Chart(canvas.getContext("2d"), {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Precio por día (USD)",
        data: data,
        backgroundColor: "#d6c6b3"
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}


/* =========================
   PAGINA DESTINO
========================= */

function renderDestino(){

  const box = document.getElementById("destino");
  if(!box) return;

  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const d = DESTINOS[id];

  if(!d){
    box.innerHTML = `
      <div class="section">
        <h3>No encontrado</h3>
        <div class="list">Ese destino no existe.</div>
      </div>
    `;
    return;
  }

  const isFav = getFavorito() === d.id;

  document.getElementById("heroImg").style.backgroundImage =
    `url('${d.imagen}')`;

  document.getElementById("heroTitle").textContent =
    `${d.nombre} ${d.bandera}`;

  document.getElementById("heroSubtitle").textContent =
    `${money(d.total)} total • ${money(d.porDia)}/day`;


  box.innerHTML = `
    <div class="section">
      <h3>Descripción</h3>
      <div class="list">${d.descripcion}</div>
    </div>

    <div class="section">
      <h3>Resumen</h3>
      <div class="grid">
        <div class="kv">
          <div class="k">FECHAS</div>
          <div class="v">${TRIP_DATES}</div>
        </div>

        <div class="kv">
          <div class="k">INCLUYE</div>
          <div class="v">${d.incluye}</div>
        </div>

        <div class="kv">
          <div class="k">HOTEL / RESORT</div>
          <div class="v">${d.hotel}</div>
        </div>

        <div class="kv">
          <div class="k">PRESUPUESTO</div>
          <div class="v">${money(d.total)}</div>
        </div>
      </div>

      <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;">
        <button id="favBtn" class="btn" type="button">
          ${isFav ? "Quitar favorito ✕" : "Elegir mi destino ❤️"}
        </button>

        <a class="btn" href="index.html">
          Volver
        </a>
      </div>
    </div>

    <div class="section">
      <h3>Actividades</h3>
      <div class="list">
        ${d.actividades.map(a => `• ${a}`).join("<br>")}
      </div>
    </div>

    <div class="section">
      <h3>Notas</h3>
      <div class="list">${d.notas}</div>
    </div>
  `;

  const favBtn = document.getElementById("favBtn");
  favBtn.addEventListener("click", function(){

    if(getFavorito() === d.id){
      clearFavorito();
    } else {
      setFavorito(d.id);
    }

    renderDestino();
  });
}


/* =========================
   INICIALIZACION
========================= */

document.addEventListener("DOMContentLoaded", function(){
  renderIndex();
  renderDestino();
});