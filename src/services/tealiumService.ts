import { tealiumConfig } from "./config";

type TealiumData = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    utag?: {
      view: (data: TealiumData) => void;
      link: (data: TealiumData) => void;
    };
    utag_data?: TealiumData;
  }
}

const SCRIPT_ID = "tealium-utag";

const isConfigured =
  tealiumConfig.enabled && Boolean(tealiumConfig.account && tealiumConfig.profile);

export const initializeTealium = () => {
  if (!isConfigured || typeof document === "undefined") {
    return;
  }

  window.utag_data = window.utag_data || {};

  if (document.getElementById(SCRIPT_ID)) {
    return;
  }

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = `https://tags.tiqcdn.com/utag/${tealiumConfig.account}/${tealiumConfig.profile}/${tealiumConfig.environment}/utag.js`;

  document.head.appendChild(script);
};

export const trackTealiumPageView = (data: TealiumData) => {
  if (!isConfigured || typeof window === "undefined") {
    return;
  }

  const pageData = {
    tealium_event: "page_view",
    ...data,
  };

  window.utag_data = {
    ...window.utag_data,
    ...pageData,
  };

  window.utag?.view(pageData);
};

export const trackTealiumEvent = (data: TealiumData) => {
  if (!isConfigured || typeof window === "undefined") {
    return;
  }

  window.utag?.link(data);
};
