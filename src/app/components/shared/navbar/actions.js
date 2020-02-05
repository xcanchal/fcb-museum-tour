/* eslint-disable import/prefer-default-export */

export const setCurrentView = view => ({
  type: 'SET_CURRENT_VIEW',
  view,
});

export const setLanguage = language => ({
  type: 'SET_LANGUAGE',
  language,
});

export const setTopBar = active => ({
  type: 'SET_TOP_BAR',
  active,
});

export const toggleSidebar = shown => ({
  type: 'TOGGLE_SIDEBAR',
  shown,
});

export const hideSidebar = () => ({
  type: 'HIDE_SIDEBAR',
});

export const setConfig = alias => ({
  type: 'SET_CONFIG',
  alias,
});

export const setOpenedSection = section => ({
  type: 'SET_OPENED_SECTION',
  section,
});

export const updateVideoStatus = videoStatus => ({
  type: 'UPDATE_VIDEO_STATUS',
  videoStatus,
});

export const setDeviceInfo = width => ({
  type: 'SET_DEVICE_INFO',
  width,
});

export const setTotem = totem => ({
  type: 'SET_TOTEM',
  totem,
});
