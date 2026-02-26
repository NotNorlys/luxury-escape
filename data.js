const TRIP_DATES = "5–13 de septiembre (9 días)";

const DESTINOS = {
  santorini: {
    id: "santorini",
    nombre: "Santorini",
    bandera: "🇬🇷",
    imagen: "images/santorini.jpg",
    descripcion: "Isla volcánica de casitas blancas y vistas a la caldera: sunsets icónicos y vibe romántico de lujo.",
    total: 10000,
    porDia: 1111,
    incluye: "Vuelo + hospedaje",
    hotel: "Canaves Ena / Canaves Oia Suites (Small Luxury Hotels of the World)",
    notas: "Ideal para: romance, lujo, fotos y vistas a la caldera.",
    actividades: [
      "Atardecer en Oia",
      "Paseo en catamarán por la caldera",
      "Playas volcánicas (Kamari / Perissa)",
      "Akrotiri (sitio arqueológico)",
      "Cata de vinos locales"
    ]
  },
  ibiza: {
    id: "ibiza",
    nombre: "Ibiza",
    bandera: "🇪🇸",
    imagen: "images/ibiza.jpg",
    descripcion: "Playas y calas cristalinas con energía mediterránea: día de beach club y noches mundialmente famosas.",
    total: 5000,
    porDia: 556,
    incluye: "Solo hotel",
    hotel: "Bless Hotel Ibiza (The Leading Hotels of the World)",
    notas: "Ideal para: playa + vibe social + vida nocturna.",
    actividades: [
      "Cala Comte / calas escondidas",
      "Dalt Vila (ciudad vieja)",
      "Beach clubs",
      "Excursión en barco a Formentera",
      "Snorkel / deportes acuáticos"
    ]
  },
  rio: {
    id: "rio",
    nombre: "Rio de Janeiro",
    bandera: "🇧🇷",
    imagen: "images/rio.jpg",
    descripcion: "Ciudad vibrante entre montañas y mar: vistas icónicas, cultura, samba y playas legendarias.",
    total: 2600,
    porDia: 289,
    incluye: "Vuelo + hotel",
    hotel: "Hotel Nacional Rio de Janeiro",
    notas: "Ideal para: ciudad + playa + vistas icónicas.",
    actividades: [
      "Cristo Redentor",
      "Pan de Azúcar",
      "Copacabana e Ipanema",
      "Museo del Mañana / centro",
      "Miradores + atardecer"
    ]
  },
  hawaii: {
    id: "hawaii",
    nombre: "Hawaii (Waikiki)",
    bandera: "🇺🇸",
    imagen: "images/hawaii.jpg", // si es hawaii.avif cámbialo aquí
    descripcion: "Paraíso tropical con olas perfectas: surf en Waikiki, snorkel y atardeceres de película.",
    total: 3500,
    porDia: 389,
    incluye: "Vuelo + hotel",
    hotel: "Alohilani Resort Waikiki Beach",
    notas: "Ideal para: surf, snorkel y días de playa.",
    actividades: [
      "Clases de surf en Waikiki",
      "Snorkel con peces tropicales",
      "Sendero / cascada (Manoa Falls)",
      "Miradores de la costa",
      "Luau (cena + show cultural)"
    ]
  },
  bali: {
    id: "bali",
    nombre: "Bali",
    bandera: "🇮🇩",
    imagen: "images/bali.jpg",
    descripcion: "Templos, arrozales y spas: una mezcla perfecta de cultura, relax y sunsets increíbles.",
    total: 3800,
    porDia: 422,
    incluye: "Vuelo + hotel",
    hotel: "The Bandha Hotel & Suites",
    notas: "Ideal para: cultura, spa, templos y playa.",
    actividades: [
      "Templo Uluwatu",
      "Ubud + arrozales",
      "Spa balinés",
      "Mercados locales / comida",
      "Atardecer en la costa"
    ]
  },
  phuket: {
    id: "phuket",
    nombre: "Phuket",
    bandera: "🇹🇭",
    imagen: "images/phuket.jpg",
    descripcion: "Aguas turquesa y excursiones en bote: islas cercanas, mercados nocturnos y vibe tropical.",
    total: 3300,
    porDia: 367,
    incluye: "Pasaje + hospedaje",
    hotel: "Private Pool Villas by The Slate",
    notas: "Ideal para: islas, agua turquesa, tours en bote.",
    actividades: [
      "Excursión a Phi Phi",
      "Mercados nocturnos",
      "Clases de cocina tailandesa",
      "James Bond Island",
      "Snorkel / buceo"
    ]
  },
  sulawesi: {
    id: "sulawesi",
    nombre: "Sulawesi (Manado)",
    bandera: "🇮🇩",
    imagen: "images/sulawesi.jpg",
    descripcion: "Indonesia más auténtica: naturaleza intensa, mar, snorkel y una experiencia menos turística.",
    total: 5200,
    porDia: 578,
    incluye: "Hotel (vuelo no especificado)",
    hotel: "The Sentra Hotel Manado",
    notas: "Ideal para: naturaleza, mar y experiencias menos turísticas.",
    actividades: [
      "Playas y puntos de snorkel",
      "Mercados y comida local",
      "Excursiones de naturaleza",
      "Visitas culturales en la zona",
      "Días de relax y fotos"
    ]
  },
  maldives: {
    id: "maldives",
    nombre: "Maldives",
    bandera: "🇲🇻",
    imagen: "images/maldives.jpg",
    descripcion: "El sueño overwater: arena blanca, arrecifes y agua cristalina para relax total y lujo.",
    total: 7000,
    porDia: 778,
    incluye: "Pasaje por separado (hotel aparte)",
    hotel: "Kurumva",
    notas: "OJO: este precio es del pasaje; al añadir resort sube más.",
    actividades: [
      "Villas sobre el agua",
      "Snorkel y arrecifes",
      "Cena privada al atardecer",
      "Tour para ver delfines",
      "Deportes acuáticos"
    ]
  },
  msc: {
    id: "msc",
    nombre: "MSC World America",
    bandera: "🚢",
    imagen: "images/msc.jpg",
    descripcion: "Crucero todo incluido: pools, shows, comida y descanso con paradas en destinos increíbles.",
    total: 3300,
    porDia: 367,
    incluye: "Todo incluido",
    hotel: "Crucero MSC World America",
    notas: "Ideal para: entretenimiento, comida, shows y descanso.",
    actividades: [
      "Piscinas y toboganes",
      "Shows en vivo",
      "Restaurantes y buffets",
      "Gimnasio / spa (según paquete)",
      "Excursiones en puertos (según itinerario)"
    ]
  }
};