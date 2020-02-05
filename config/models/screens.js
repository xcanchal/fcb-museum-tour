/**
 * Para configurar "animationDuration" en floor: utilizar segundos (ej: 10)
 * Para configurar posiciones utilizar px (ej: 25)
 * Para configurar subtitle: siempre [] y tantos elementos dentro como queramos
 * ej: ['elemento uno', 'elemento dos']
 */

module.exports = [{
  alias: 'waiting',
  type: 'waiting',
  video: 'TOUCHME_FC_BARCELONA_HORIZONTAL.mp4',
  drawings: {},
  texts: {},
  labels: {},
},
{
  alias: 'home',
  type: 'home',
  images: {
    floors: [
      'home_stadium.png',
      'home_floor-1.png',
      'home_floor0.png',
      'home_floor1.png',
      'home_floor2.png',
      'home_floor3.png',
      'home_floor4.png',
    ],
    icons: 'icons_home.png',
  },
  texts: {
    title: {
      CA: 'Mapa camp nou experience',
      EN: 'Camp nou experience map',
      ES: 'Mapa de la camp nou experience',
      FR: 'Plan camp nou experience',
    },
    subtitle: {
      CA: ['Tria la planta i troba més informació'],
      EN: ['Choose a floor and find more information'],
      ES: ['Elige el piso y obtén más información'],
      FR: ['Sélectionner l\'étage pour en savoir plus'],
    },
  },
},
{
  alias: '-1',
  type: 'floor',
  pathDuration: 3,
  sectionsDuration: 2,
  images: {
    legend: 'legend_floor-1.png',
    detail: 'detail_floor-1.png',
    icons: 'detail_icons-1.png',
  },
  texts: {
    title: {
      CA: 'PLANTA -1',
      EN: 'FLOOR -1',
      ES: 'PISO -1',
      FR: 'ÉTAGE -1',
    },
    subtitle: {
      CA: ['ZONA MIXTA SALA DE PREMSA CAMP TÚNEL DE JUGADORS'],
      EN: ['MIXED ZONE PRESS ROOM PITCH PLAYERS\' TUNNEL'],
      ES: ['ZONA MIXTA SALA DE PRENSA CÉSPED TÚNEL DE JUGADORES'],
      FR: ['ZONE MIXTE SALLE DE PRESSE TERRAIN TUNNEL DES JOUEURS'],
    },
    button: {
      CA: 'Tour camp nou',
      EN: 'Tour camp nou',
      ES: 'Visita el camp nou',
      FR: 'Tour camp nou',
    },
  },
},
{
  alias: '0',
  type: 'floor',
  pathDuration: 3,
  sectionsDuration: 2,
  images: {
    legend: 'legend_floor0.png',
    detail: 'detail_floor0.png',
    icons: 'detail_icons0.png',
  },
  texts: {
    title: {
      CA: 'PLANTA 0',
      EN: 'FLOOR 0',
      ES: 'PISO 0',
      FR: 'REZ-DE-CHAUSSÉE',
    },
    subtitle: {
      CA: ['HALL TRIBUNA'],
      EN: ['GRANDSTAND HALL'],
      ES: ['SALA DE LA TRIBUNA'],
      FR: ['HALL TRIBUNE'],
    },
    button: {
      CA: 'Tour camp nou',
      EN: 'Tour camp nou',
      ES: 'Visita el camp nou',
      FR: 'Tour camp nou',
    },
  },
},
{
  alias: '1',
  type: 'floor',
  pathDuration: 3,
  sectionsDuration: 2,
  images: {
    legend: 'legend_floor1.png',
    detail: 'detail_floor1.png',
    icons: 'detail_icons1.png',
  },
  texts: {
    title: {
      CA: 'PLANTA 1',
      EN: 'FLOOR 1',
      ES: 'PISO 1',
      FR: 'ÉTAGE 1',
    },
    subtitle: {
      CA: ['MUSEU GRADERIA...'],
      EN: ['MUSEUM GRAND STAND...Y'],
      ES: ['MUSEO TRIBUNA...'],
      FR: ['MUSÉE GRADINS...'],
    },
    button: {
      CA: ['Museu'],
      EN: ['Museum'],
      ES: ['Museo'],
      FR: ['Musée'],
    },
  },
},
{
  alias: '2',
  type: 'floor',
  pathDuration: 3,
  sectionsDuration: 2,
  images: {
    legend: 'legend_floor2.png',
    detail: 'detail_floor2.png',
    icons: 'detail_icons2.png',
  },
  texts: {
    title: {
      CA: 'PLANTA 2',
      EN: 'FLOOR 2',
      ES: 'PISO 2',
      FR: 'ÉTAGE 2',
    },
    subtitle: {
      CA: ['ESPAI MULTIMÈDIA'],
      EN: ['MULTIMEDIA ZONE'],
      ES: ['ESPACIO MULTIMEDIA'],
      FR: ['ESPACE MULTIMÉDIA'],
    },
    button: {
      CA: ['Espai Multimedia'],
      EN: ['Multimedia Space'],
      ES: ['Espacio Multimedia'],
      FR: ['Space Multimedia'],
    },
  },
},
{
  alias: '3',
  type: 'floor',
  pathDuration: 3,
  sectionsDuration: 2,
  images: {
    legend: 'legend_floor3.png',
    detail: 'detail_floor3.png',
    icons: 'detail_icons3.png',
  },
  texts: {
    title: {
      CA: 'PLANTA 3',
      EN: 'FLOOR 3',
      ES: 'PISO 3',
      FR: 'ÉTAGE 3',
    },
    subtitle: {
      CA: [' '],
      EN: [' '],
      ES: [' '],
      FR: [' '],
    },
    button: {
      CA: '_ ',
      EN: '_ ',
      ES: '_ ',
      FR: '_ ',
    },
  },
},
{
  alias: '4',
  type: 'floor',
  pathDuration: 3,
  sectionsDuration: 2,
  images: {
    legend: 'legend_floor4.png',
    detail: 'detail_floor4.png',
    icons: 'detail_icons4.png',
  },
  texts: {
    title: {
      CA: 'PLANTA 4',
      EN: 'FLOOR 4',
      ES: 'PISO 4',
      FR: 'ÉTAGE 4',
    },
    subtitle: {
      CA: ['TRIBUNA DE PREMSA'],
      EN: ['PRESS BOX'],
      ES: ['CABINA DE PRENSA'],
      FR: ['TRIBUNE DE PRESSE'],
    },
    button: {
      CA: 'Tour camp nou',
      EN: 'Tour camp nou',
      ES: 'Visita el camp nou',
      FR: 'Tour camp nou',
    },
  },
},
{
  alias: 'must_see',
  type: 'must_see',
  legendBaseImage: 'bgmustsee.png',
  texts: {
    title: {
      ES: 'Destacados',
      EN: 'Must see',
      CA: 'Destacats',
	  FR: 'Destacats',
    },
    subtitle: {
      ES: ['Tour destacados'],
      EN: ['Highlights tour'],
      CA: ['Tour destacats'],
	  FR: ['Tour destacats'],
    },
    video: {
      ES: 'La sección de DESTACADOS te permite visualizar de una manera rápida los ocho puntos destacados del tour Camp Nou experience en un vídeo de 5 minutos',
      EN: 'MUST SEE section allows you to have a quick overview of the eight highlight points of the Camp Nou experience tour in  a 5 minute video.',
      CA: 'La secció de DESTACATS et permet visualitzar d\'una manera ràpida els vuit punts destacats del tour Camp Nou experience en un video de 5 minuts',
	  FR: 'La secció de DESTACATS et permet visualitzar d\'una manera ràpida els vuit punts destacats del tour Camp Nou experience en un video de 5 minuts',
    },
  },
  video: {
    src: 'video_mustsee.mp4',
    autoStart: true,
    chapters: [
      {
        breakpoint: 1, // segundo en el que empieza el capítulo
        legendImage: 'mustsee_kinetic.png',
        title: {
          CA: 'MUR KINETIC',
          EN: 'KINETIC WALL',
          ES: 'MURO CINÉTICO',
          FR: 'MUR CINÉTIQUE',
        },
        description: {
          CA: ['Planta 1'],
          EN: ['Floor 1'],
          ES: ['Piso 1'],
          FR: ['Étage 1'],
        },
      },
	  {
        breakpoint: 4, // segundo en el que empieza el capítulo
        legendImage: 'mustsee_champions.png',
        title: {
          CA: 'ESPAI CHAMPIONS',
          EN: 'CHAMPIONS ZONE',
          ES: 'ZONA CHAMPIONS',
          FR: 'ESPACE CHAMPIONS',
        },
        description: {
          CA: ['Planta 1'],
          EN: ['Floor 1'],
          ES: ['Piso 1'],
          FR: ['Étage 1'],
        },
      },
      {
        breakpoint: 7, // segundo en el que empieza el capítulo
        legendImage: 'mustsee_espaimessi.png',
        title: {
          CA: 'ESPAI MESSI',
          EN: 'MESSI ZONE',
          ES: 'ZONA MESSI',
          FR: 'ESPACE MESSI',
        },
        description: {
          CA: ['Planta 1'],
          EN: ['Floor 1'],
          ES: ['Piso 1'],
          FR: ['Étage 1'],
        },
      },
      {
        breakpoint: 10, // segundo en el que empieza el capítulo
        legendImage: 'mustsee_splitflap.png',
        title: {
          CA: 'SPLIT FLAP',
          EN: 'SPLIT FLAP',
          ES: 'SPLIT FLAP',
          FR: 'SPLIT FLAP',
        },
        description: {
          CA: ['Planta 1'],
          EN: ['Floor 1'],
          ES: ['Piso 1'],
          FR: ['Étage 1'],
        },
      },
	  {
        breakpoint: 14, // segundo en el que empieza el capítulo
        legendImage: 'mustsee_gespa.png',
        title: {
          CA: 'GESPA',
          EN: 'THE PITCH',
          ES: 'EL CÉSPED',
          FR: 'GAZON',
        },
        description: {
          CA: ['Planta -1'],
          EN: ['Floor -1'],
          ES: ['Piso -1'],
          FR: ['Étage -1'],
        },
      },
	        {
        breakpoint: 17, // segundo en el que empieza el capítulo
        legendImage: 'mustseevestuario.png',
        title: {
        CA: 'VESTIDOR VISITANT',
        EN: 'VISITOR\'S CHANGING ROOM',
        ES: 'VESTIDOR VISITANTE',
        FR: 'VESTIAIRE VISITEURS',
        },
        description: {
          CA: ['Planta -1'],
          EN: ['Floor -1'],
          ES: ['Piso -1'],
          FR: ['Étage -1'],
        },
		},
      {
        breakpoint: 21, // segundo en el que empieza el capítulo
        legendImage: 'mustseesaladepremsa.png',
        title: {
          CA: 'SALA DE PREMSA',
          EN: 'PRESS ROOM',
          ES: 'SALA DE PRENSA',
          FR: 'SALLE DE PRESSE',
        },
        description: {
          CA: ['Planta -1'],
          EN: ['Floor -1'],
          ES: ['Piso -1'],
          FR: ['Étage -1'],
        },
      },
	  {
        breakpoint: 25, // segundo en el que empieza el capítulo
        legendImage: 'mustseecabinas.png',
        title: {
			CA: 'CABINES DE PREMSA',
			EN: 'PRESS BOX',
			ES: 'CABINAS DE PRENSA',
			FR: 'CABINES DE PRESSE',
        },
        description: {
			CA: ['Planta 4'],
			EN: ['Floor 4'],
			ES: ['Piso 4'],
			FR: ['Étage 4'],
        },
      },
	  {
        breakpoint: 28, // segundo en el que empieza el capítulo
        legendImage: 'mustseetaulaint.png',
        title: {
			CA: 'TAULA INTERACTIVA',
			EN: 'INTERACTIVE TABLE',
			ES: 'TABLA INTERACTIVA',
			FR: 'TABLE INTERACTIVE',
        },
        description: {
			CA: ['Planta 2'],
			EN: ['Floor 2'],
			ES: ['Piso 2'],
			FR: ['Étage 2'],
        },
      },
	  {
        breakpoint: 31, // segundo en el que empieza el capítulo
        legendImage: 'mustseegranaudiov.png',
        title: {
			CA: 'GRAN AUDIOVISUAL',
			EN: 'AUDIOVISUAL',
			ES: 'GRAN AUDIOVISUAL',
			FR: 'GRAND AUDIOVISUEL',
        },
        description: {
			CA: ['Planta 2'],
			EN: ['Floor 2'],
			ES: ['Piso 2'],
			FR: ['Étage 2'],
        },
      },      
    ],
  },
}];
