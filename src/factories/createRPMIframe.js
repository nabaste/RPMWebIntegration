import { defaultAvatar, RPMSettings } from "../config";


const getIframe = () => {
    if(DEVELOPMENT){
    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    iframe.id = 'frame';
    return iframe;
    } 
    else{
    return document.getElementById('frame');
    }
}

export const createRPMIframe = () => {

    const iframe = getIframe();

    iframe.width = RPMSettings.iframeWidth;
    iframe.height = RPMSettings.iframeHeight;

    iframe.src = `https://${RPMSettings.subdomain}.readyplayer.me/avatar?frameApi`;

    return iframe;
}
