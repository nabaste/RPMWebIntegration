import { Clock } from "three";

import { preloader } from "./loader";
import resolvers from "./loader/resolvers";
import { defaultAvatar, animContainer, AvatarSettings } from "./config";

import {
  createDefaultContainer,
  createDefaultRenderer,
  createDefaultScene,
  createDefaultCamera,
  createRPMIframe,
} from "./factories";

import { Avatar } from "./objects/Avatar";

import { AnimationMixer } from "three";

const { createResizeHandler } = require("./utils");

async function startApplication(avatarUrl) {
  const container = createDefaultContainer();
  const renderer = createDefaultRenderer();
  const scene = createDefaultScene();
  const camera = createDefaultCamera(renderer);

  const clock = new Clock();

  container.appendChild(renderer.domElement);

  createResizeHandler({ renderer, camera });

  preloader.init(...resolvers);
  await preloader.load([defaultAvatar, animContainer]);

  const avatar = Avatar.createDefault(renderer);
  scene.withAvatar(avatar);

  const anim = preloader.get("animContainer");

  const mixer = new AnimationMixer(avatar);
  const clip = anim.animations[0];
  const action = mixer.clipAction(clip);
  action.play();



  function render() {
    window.requestAnimationFrame(render);
    renderer.clear();
    renderer.render(scene.main, camera);

    const delta = clock.getDelta();

    mixer.update(delta);

    scene.main.traverse((element) => element?.update?.(delta));
  }
    render();
}

function setUpRPM() {
  const frame = createRPMIframe();
  window.addEventListener('message', subscribe);
  document.addEventListener('message', subscribe);
}

window.onload = async function () {
  // await startApplication();
  await setUpRPM();
};

function subscribe(event) {

  const frame = document.getElementById('frame');
  const json = parse(event);

  if (json?.source !== 'readyplayerme') {
      return;
  }

  // Susbribe to all events sent from Ready Player Me once frame is ready
  if (json.eventName === 'v1.frame.ready') {
      frame.contentWindow.postMessage(
          JSON.stringify({
              target: 'readyplayerme',
              type: 'subscribe',
              eventName: 'v1.**'
          }),
          '*'
      );
  }

  // Get avatar GLB URL
  if (json.eventName === 'v1.avatar.exported') {
      console.log(`Avatar URL: ${json.data.url}`);
      defaultAvatar.url = json.data.url;
      console.log('defaultavatar url is' + defaultAvatar.url);
      startApplication(json.data.url);
      document.getElementById('frame').hidden = true;
  }

  // Get user id
  if (json.eventName === 'v1.user.set') {
      console.log(`User with id ${json.data.id} set: ${JSON.stringify(json)}`);
  }
}

function parse(event) {
  try {
      return JSON.parse(event.data);
  } catch (error) {
      return null;
  }
}

function toggleIframe() {
  document.getElementById('frame').hidden = !document.getElementById('frame').hidden;
}