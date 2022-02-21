import { Clock } from "three";

import { preloader } from "./loader";
import resolvers from "./loader/resolvers";
import { defaultAvatar, animContainer } from "./config";

import {
  createDefaultContainer,
  createDefaultRenderer,
  createDefaultScene,
  createDefaultCamera,
} from "./factories";

import { Avatar } from "./objects/Avatar";

import { AnimationMixer } from "three";

const { createResizeHandler } = require("./utils");

async function startApplication() {
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

window.onload = async function () {
  await startApplication();
};
