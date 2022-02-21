import { PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { DOMSettings } from "../config";

export const createDefaultCamera = (renderer) => {
  const aspect = DOMSettings.canvasWidth / DOMSettings.canvasHeight;

  const camera = new PerspectiveCamera(50, aspect, 0.1, 1000);
  camera.position.y = 0.6;
  camera.position.z = 8;
  camera.aspect = DOMSettings.canvasWidth / DOMSettings.canvasHeight;
  camera.updateProjectionMatrix();

  const OrbitControlSystem = new OrbitControls(camera, renderer.domElement);
  // const OrbitStartTarget = new THREE.Vector3(-0.365, 1.17, 0.54);
  OrbitControlSystem.enableDamping = true;
  // OrbitControlSystem.target = OrbitStartTarget;
  OrbitControlSystem.minDistance = 2;
  OrbitControlSystem.maxDistance = 18;

  // function update(delta) {
  //   OrbitControlSystem.update();
  // }
  return camera;
};
