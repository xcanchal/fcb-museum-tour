module.exports = [
  {
    alias: 'default', // default
    backgroundImage: 'bg_tour.jpg', // background image shown across the app (false for no background)
    mustSee: true, // enable or disable must see section
    navbarImage: 'navbar.png', // background image for the navbar
    topbarImage: 'topbar.png', // topbar image, languages bar
    homeModalImage: 'home_image_modal.jpg', // modal for home shown after re-entering from a timeout
    qr: {
      image: 'qr_code_default.png', // name of the qr image (e.g. qr-default.png)
      size: 7.5, // width and height value
      position: {
        top: 10,
        left: 0.5,
      },
    },
    disabledFloors: [3], // Array of the numbers of the disabled floors, ej: [-1, 3]
    disabledSidebarSections: [], // disabled sections (not visible in the sidebar)
    floors: [
      {
        alias: 'home',
        track: 'home_track.svg', // yellow tour path
      },
      {
        alias: '-1',
        track: 'track_default_floor-1.svg', // yellow tour path
        labels: {
          entrance: [
            {
              top: 23,
              left: 55,
              goToFloor: null,
            },
          ],
          nextLevel: [
            {
              top: 22,
              left: 14.5,
              goToFloor: '0',
            },
          ],
        },
      },
      {
        alias: '0',
        track: 'track_default_floor0.svg', // yellow tour path
        labels: {
          entrance: [
            {
              top: 60,
              left: 26,
              goToFloor: '-1',
            },
            {
              top: 26,
              left: 68,
              goToFloor: '-1',
            },
          ],
          nextLevel: [
            {
              top: 66.5,
              left: 41.5,
              goToFloor: '1',
            },
            {
              top: 34.5,
              left: 57,
              goToFloor: '1',
            },
          ],
        },
      },
      {
        alias: '1',
        track: 'track_default_floor1.svg', // yellow tour path
        labels: {
          entrance: [
            {
              top: 83,
              left: 45,
              goToFloor: '0',
            },
          ],
          nextLevel: [
            {
              top: 52,
              left: 24.5,
              goToFloor: '2',
            },
          ],
        },
      },
      {
        alias: '2',
        track: 'track_default_floor2.svg', // yellow tour path
        labels: {
          entrance: [
            {
              top: 63,
              left: 10,
              goToFloor: '1',
            },
          ],
          nextLevel: [
            {
              top: 27.5,
              left: 65,
              goToFloor: '3',
            },
          ],
        },
      },
      {
        alias: '3',
        track: 'track_default_floor3.svg', // yellow tour path
        labels: {
          entrance: [
            {
              top: 0,
              left: 10,
              goToFloor: '2',
            },
            {
              top: 50,
              left: 100,
              goToFloor: '2',
            },
          ],
          nextLevel: [
            {
              top: 0,
              left: 5,
              goToFloor: '4',
            },
            {
              top: 20,
              left: 60,
              goToFloor: '4',
            },
          ],
        },
      },
      {
        alias: '4',
        track: 'track_default_floor4.svg', // yellow tour path
        labels: {
          entrance: [
            {
              top: 73,
              left: 21.5,
              goToFloor: '3',
            },
          ],
          nextLevel: [
            {
              top: 14,
              left: 65,
              goToFloor: null,
            },
          ],
        },
      },
    ],
  },
  {
    alias: 'LIGACOPA', // liga
    backgroundImage: 'bg_tour.jpg', // background image shown across the app (false for no background)
    mustSee: false, // enable or disable must see section
    navbarImage: 'navbar.png', // background image for the navbar
    topbarImage: 'topbar.png', // topbar image, languages bar
    homeModalImage: 'home_image_modal.jpg', // modal for home shown after re-entering from a timeout
    qr: false,
    disabledFloors: [-1,0,3,4], // Array of the numbers of the disabled floors, ej: [-1, 3]
    disabledSidebarSections: ['the_mixed_zone','press_room','visitors_dressing_room','chapel','players_tunnel','the_bench','the_pitch','grandstand_hall','bar','the_vantage_point','press_box'], // disabled sections (not visible in the sidebar)
    floors: [
      {
        alias: 'home',
        track: 'home_track_ligaycopa.svg', // yellow tour path
      },
      {
        alias: '-1',
        track: 'track_default_floor-1.svg', // yellow tour path
      },
      {
        alias: '0',
        track: 'track_default_floor0.svg', // yellow tour path
      },
      {
        alias: '1',
        track: 'track_default_liga1.svg', // yellow tour path
      },
      {
        alias: '2',
        track: 'track_default_floor2.svg', // yellow tour path
      },
      {
        alias: '3',
        track: 'track_default_floor3.svg', // yellow tour path
      },
      {
        alias: '4',
        track: 'track_default_floor4.svg', // yellow tour path
      },
    ],
  },
  {
    alias: 'CHAMPIONS', // champions
    backgroundImage: 'bg_tour.jpg', // background image shown across the app (false for no background)
    mustSee: false, // enable or disable must see section
    navbarImage: 'navbar.png', // background image for the navbar
    topbarImage: 'topbar.png', // topbar image, languages bar
    homeModalImage: 'home_image_modal.jpg', // modal for home shown after re-entering from a timeout
    qr: false,
    disabledFloors: [-1,0,2,3,4], // Array of the numbers of the disabled floors, ej: [-1, 3]
disabledSidebarSections: ['the_mixed_zone','press_room','visitors_dressing_room','chapel','players_tunnel','the_bench','the_pitch','grandstand_hall','bar','sounds','interactive_table','sections_pro','space_la_masia','projection','documentation_center','new_camp_nou','the_vantage_point','press_box'], // disabled sections (not visible in the sidebar)
    floors: [
      {
        alias: 'home',
        track: 'home_track_champions.svg', // yellow tour path
      },
      {
        alias: '-1',
        track: 'track_default_floor-1.svg', // yellow tour path
      },
      {
        alias: '0',
        track: 'track_default_floor0.svg', // yellow tour path
      },
      {
        alias: '1',
        track: 'track_default_champions1.svg', // yellow tour path
      },
      {
        alias: '2',
        track: 'track_default_floor2.svg', // yellow tour path
      },
      {
        alias: '3',
        track: 'track_default_floor3.svg', // yellow tour path
      },
      {
        alias: '4',
        track: 'track_default_floor4.svg', // yellow tour path
      },
    ],
  },
];
