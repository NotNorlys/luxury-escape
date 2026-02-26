function money(n){ return "$"+n.toLocaleString(); }

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const destino = DESTINOS[id];

if(destino){

  document.getElementById("destinoTitle").textContent = destino.nombre;
  document.getElementById("destinoSubtitle").textContent =
    money(destino.total) + " • " + money(destino.porDia) + "/día";

  document.getElementById("destinoHero").style.backgroundImage =
    `url('${destino.imagen}')`;

  document.getElementById("destinoInfo").innerHTML = `
    <div class="section">
      <h3>Descripción</h3>
      <p>${destino.descripcion}</p>
    </div>
    <div class="section">
      <h3>Hotel</h3>
      <p>${destino.hotel}</p>
    </div>
    <div class="section">
      <h3>Incluye</h3>
      <p>${destino.incluye}</p>
    </div>
  `;

  const map = L.map('map').setView(destino.coords, 6);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution:'© OpenStreetMap'
  }).addTo(map);

  L.marker(destino.coords).addTo(map)
    .bindPopup(destino.nombre)
    .openPopup();
}