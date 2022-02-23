export let defaultAvatar = {
  id: "avatar",
  type: "gltf",
  url: "",
};

export const animContainer = {
  id: "animContainer",
  type: "gltf",
  url: "assets/models/dance.glb",
};

// To see available morph targets and animations, view your avatar on: https://gltf-viewer.donmccurdy.com/
export const AvatarSettings = {
  isTrackCursor: false,
  isAutoAnimated: false,
  isAutoMorphAnimated: false,
  morphTargets: [
    {
      key: "mouthOpen",
      targetValue: 0.6,
    },
    {
      key: "mouthLeft",
    },
    {
      key: "browOuterUpRight",
    },
    {
      key: "eyeBlinkRight",
      targetValue: 1,
      transition: 100,
      duration: 100,
    },
    {
      key: "mouthPressRight",
    },
  ],
  defaultAnimation: "idle_eyes",
};

export const DOMSettings = {
  avatarDivID: "3d_avatar", // <- make sure you have a div with this id when deploying
  canvasWidth: 1280,
  canvasHeight: 800,  
};

export const RendererSettings = {
  alpha: true,
  antialias: true,
};

export const RPMSettings = {
  subdomain: "demo",
  iframeWidth: 1280,    //RPM reccomended iFrame size
  iframeHeight: 800,
}
