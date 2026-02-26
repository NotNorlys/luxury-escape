function money(n){ return "$"+n.toLocaleString(); }

function getFavorito(){ return localStorage.getItem("fav"); }
function setFavorito(id){ localStorage.setItem("fav",id); }
function clearFavorito(){ localStorage.removeItem("fav"); }

function renderIndex(){

  const grid=document.getElementById("cards");
  const fav=getFavorito();
  let items=Object.values(DESTINOS);

  if(fav){
    items.sort((a,b)=>a.id===fav?-1:b.id===fav?1:0);
  }

  const hero=document.querySelector(".hero");
  const video=document.getElementById("heroVideo");
  const title=document.getElementById("heroTitle");

  if(fav){
    hero.style.backgroundImage=`url('${DESTINOS[fav].imagen}')`;
    hero.style.backgroundSize="cover";
    video.style.display="none";
    title.textContent=DESTINOS[fav].nombre;
  }else{
    hero.style.backgroundImage="none";
    video.style.display="block";
    title.textContent="Luxury Escape";
  }

  const favBox=document.getElementById("favBox");

  favBox.innerHTML=fav?
  `❤️ Favorito: <strong>${DESTINOS[fav].nombre}</strong>
   <button class="clear-btn" onclick="clearAndRender()">✕</button>`
  :
  `❤️ Favorito: <strong>Ninguno</strong>`;

  grid.innerHTML=items.map(d=>{
    const isFav=fav===d.id;
    return `
      <div class="card ${isFav?'favorite':''}"
           style="background-image:url('${d.imagen}')">
        <div class="card-content">
          <h2>${d.nombre}</h2>
          <p>${d.descripcion}</p>
          <p>${money(d.total)} • ${money(d.porDia)}/día</p>

          <a href="destino.html?id=${d.id}" class="btn btn-outline">
            Ver destino
          </a>

          <button class="btn"
            onclick="toggleFav('${d.id}')">
            ${isFav?'Quitar favorito':'Elegir destino'}
          </button>
        </div>
      </div>
    `;
  }).join("");

  renderChart(items);
}

function toggleFav(id){
  if(getFavorito()===id) clearFavorito();
  else setFavorito(id);
  renderIndex();
}

function clearAndRender(){
  clearFavorito();
  renderIndex();
}

/* ---------- GRÁFICA ---------- */
function renderChart(items){

  const ctx=document.getElementById("priceChart");
  if(!ctx) return;

  if(window.chart) window.chart.destroy();

  window.chart=new Chart(ctx,{
    type:"bar",
    data:{
      labels:items.map(d=>d.nombre),
      datasets:[{
        label:"Precio por día",
        data:items.map(d=>d.porDia),
        backgroundColor:"gold",
        borderRadius:8
      }]
    },
    options:{plugins:{legend:{display:false}}}
  });
}

/* ---------- MÚSICA SIMPLE Y FUNCIONAL ---------- */

document.addEventListener("DOMContentLoaded",()=>{

  renderIndex();

  const music=document.getElementById("bgMusic");
  const btn=document.getElementById("musicBtn");

  if(!music) return;

  music.volume=0.6;

  btn.addEventListener("click",async ()=>{

    if(music.paused){
      try{
        await music.play();
        btn.textContent="🔊";
        btn.classList.add("playing");
        localStorage.setItem("music","on");
      }catch(e){
        alert("El navegador bloqueó el audio. Intenta de nuevo.");
      }
    }else{
      music.pause();
      btn.textContent="🔇";
      btn.classList.remove("playing");
      localStorage.setItem("music","off");
    }

  });

  // Restaurar estado
  if(localStorage.getItem("music")==="on"){
    btn.textContent="🔊";
    btn.classList.add("playing");
  }

});