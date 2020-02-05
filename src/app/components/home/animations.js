import { Expo, TimelineMax, Elastic, Ease, Bounce } from 'gsap';

export default function homeAppear(animationEnabled) {
  /* eslint-disable no-undef */
  const $stadium = document.getElementById('stadium');
  const $floors = document.getElementsByClassName('home-floor');
  const $disabledFloors = document.getElementsByClassName('home-floor-disabled');
  const $buttons = document.getElementsByClassName('home-btn');
  const $reverseButtons = Array.from($buttons).reverse();
  const $icons = document.getElementById('layer-icons');
  const $markers = document.getElementsByClassName('layer-marker');
  const $qrCode = document.getElementById('qr-code');
  /* eslint-enable no-undef */

  return new TimelineMax()
  .to($stadium, animationEnabled ? 3 : 0, {
    scaleX: 1,
    scaleY: 1,
    x: 0,
    y: 0,
    opacity: 1,
    rotation: 0,
    ease: Expo.easeOut,
  }, 'start')

  .staggerTo($floors, animationEnabled ? 3 : 0, {
    y: 0,
    opacity: 1,
    delay: animationEnabled ? 1.5 : 0,
    ease: Elastic.easeOut.config(0.7, 0.3),
  }, animationEnabled ? 0.1 : 0, 'start')

  .staggerTo($disabledFloors, animationEnabled ? 3 : 0, {
    y: 0,
    opacity: 0.6,
    delay: animationEnabled ? 1.5 : 0,
    ease: Elastic.easeOut.config(0.7, 0.3),
  }, animationEnabled ? 0.1 : 0, 'start')

  .staggerTo($reverseButtons, animationEnabled ? 3 : 0, {
    x: 0,
    opacity: 1,
    delay: animationEnabled ? 2.5 : 0,
    ease: Elastic.easeOut.config(0.7, 0.3),
  }, animationEnabled ? 0.1 : 0, 'start')

  .to($icons, animationEnabled ? 1 : 0, {
    opacity: 1,
    delay: animationEnabled ? 3 : 0,
    ease: Ease.easeOut,
  }, 'start')

  .to($markers, 1, {
    opacity: 1,
    y: 0,
    delay: animationEnabled ? 4 : 0,
    ease: Bounce.easeOut,
  }, animationEnabled ? 8 : 0, 'start')

  .to($qrCode, 1, {
    opacity: 1,
    delay: animationEnabled ? 5 : 0,
    ease: Ease.easeOut,
  }, animationEnabled ? 9 : 0, 'start');
}
