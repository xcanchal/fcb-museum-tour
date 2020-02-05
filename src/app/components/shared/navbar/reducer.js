import update from 'immutability-helper';
import { difference } from 'lodash';
import configs from '../../../../../config/models/tours';
import { defaultLanguage } from '../../../../../config/general';

const DEVICE_RATIO = 1.778;

const TOTAL_FLOORS = [-1, 0, 1, 2, 3, 4];

function getConfigByAlias(byAlias = 'default') {
  return configs.find(({ alias }) => alias === byAlias);
}

function getEnabledFloorsInConfig(config) {
  return difference(TOTAL_FLOORS, config.disabledFloors);
}

const INITIAL_STATE = {
  config: getConfigByAlias(),
  enabledFloors: getEnabledFloorsInConfig(getConfigByAlias()),
  language: defaultLanguage,
  sidebarShown: false,
  current: {},
  openedSection: {},
  videoStatus: 'stopped',
  topBar: false,
  totem: null,
};

function setLanguage(state, { language }) {
  return update(state, {
    language: { $set: language },
  });
}

function setTopBar(state, { active }) {
  return update(state, {
    topBar: { $set: active },
  });
}

function setCurrentView(state, { view }) {
  return update(state, {
    current: { $set: view },
  });
}

function toggleSidebar(state, { value }) {
  return update(state, {
    sidebarShown: {
      $set: value || !state.sidebarShown,
    },
  });
}

function hideSidebar(state) {
  return update(state, {
    sidebarShown: {
      $set: false,
    },
  });
}

function setConfig(state, { alias }) {
  return update(state, {
    config: {
      $set: getConfigByAlias(alias),
    },
    enabledFloors: {
      $set: getEnabledFloorsInConfig(getConfigByAlias(alias)),
    },
  });
}

function setOpenedSection(state, { section }) {
  return update(state, {
    openedSection: {
      $set: section,
    },
  });
}

function updateVideoStatus(state, { videoStatus }) {
  return update(state, {
    videoStatus: {
      $set: videoStatus,
    },
  });
}

function setDeviceInfo(state, { width }) {
  return update(state, {
    device: {
      $set: {
        width,
        height: parseInt(Math.ceil(width / DEVICE_RATIO), 10),
      },
    },
  });
}

function setTotem(state, { totem }) {
  console.warn('TOTEM', totem);
  return update(state, {
    totem: {
      $set: totem,
    },
  });
}

function navigationReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_CURRENT_VIEW':
      return setCurrentView(state, action);
    case 'SET_LANGUAGE':
      return setLanguage(state, action);
    case 'SET_TOP_BAR':
      return setTopBar(state, action);
    case 'TOGGLE_SIDEBAR':
      return toggleSidebar(state, action);
    case 'HIDEE_SIDEBAR':
      return hideSidebar(state);
    case 'SET_CONFIG':
      return setConfig(state, action);
    case 'SET_OPENED_SECTION':
      return setOpenedSection(state, action);
    case 'UPDATE_VIDEO_STATUS':
      return updateVideoStatus(state, action);
    case 'SET_DEVICE_INFO':
      return setDeviceInfo(state, action);
    case 'SET_TOTEM':
      return setTotem(state, action);
    default:
      return state;
  }
}

export default navigationReducer;
