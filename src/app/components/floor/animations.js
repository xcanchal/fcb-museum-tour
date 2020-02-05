import { TimelineMax, Expo, Ease, Bounce } from 'gsap';

export default function floorAnimation(
  animObj,
  floorDuration,
  pathDuration = 0,
  sectionsDuration = 0,
  animationEnabled,
) {
  /* eslint-disable no-undef */
  const $floor = document.getElementById('layer-floor');
  const $legends = document.getElementsByClassName('floor-legend');
  const $icons = document.getElementById('layer-icons');
  const $entranceLabels = document.getElementsByClassName('entrance');
  const $sections = document.getElementsByClassName('floor-section');
  const $connectors = document.getElementsByClassName('connector');
  const separationTime = sectionsDuration > 0 ? (sectionsDuration / $sections.length) : 0;
  const $nextLevelLabels = document.getElementsByClassName('next-level');
  const $markers = document.getElementsByClassName('layer-marker');
  const $qrCode = document.getElementById('qr-code');
  /* eslint-enable no-undef */

  return new TimelineMax()
    .to($floor, animationEnabled ? floorDuration : 0, {
      y: 0,
      opacity: 1,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      delay: 1,
      ease: Expo.easeOut,
    })

    .staggerTo($entranceLabels, animationEnabled ? (0.3 * $entranceLabels.length) : 0, {
      opacity: 1,
      ease: Ease.easeOut,
    })

    .staggerTo($nextLevelLabels, animationEnabled ? 0.3 : 0, {
      opacity: 1,
      ease: Ease.easeOut,
    })

    .to($legends, animationEnabled ? 0.5 : 0, {
      x: 0,
      opacity: 1,
      delay: animationEnabled ? 0.5 : 0,
    })

    .to($icons, 0.5, {
      opacity: 1,
      ease: Ease.easeOut,
    }, `${animationEnabled ? '=0.10' : '=0'}`)

    .staggerTo($sections, animationEnabled ? sectionsDuration : 0, {
      y: 0,
      opacity: 1,
      delay: animationEnabled ? 1 : 0,
      ease: Expo.easeOut,
    }, animationEnabled ? separationTime : 0, 'sectionsStart')

    .staggerTo($connectors, animationEnabled ? sectionsDuration : 0, {
      y: 0,
      opacity: 1,
      delay: animationEnabled ? 1 : 0,
      ease: Expo.easeOut,
    }, animationEnabled ? separationTime : 0, 'sectionsStart')

    .to($markers, 1, {
      opacity: 1,
      y: 0,
      delay: animationEnabled ? 6 : 0,
      ease: Bounce.easeOut,
    }, animationEnabled ? (floorDuration + pathDuration) : 0)

    .to($qrCode, animationEnabled ? 0.5 : 0, {
      opacity: 1,
      delay: animationEnabled ? 7 : 0,
      ease: Ease.easeOut,
    }, animationEnabled ? (floorDuration + pathDuration) : 0);
}
