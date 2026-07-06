import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initializeTealium, trackTealiumPageView } from "../../services/tealiumService";

let lastTrackedUrl = "";

const TealiumRouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    initializeTealium();
  }, []);

  useEffect(() => {
    const pageUrl = `${location.pathname}${location.search}${location.hash}`;

    if (pageUrl === lastTrackedUrl) {
      return;
    }

    lastTrackedUrl = pageUrl;

    trackTealiumPageView({
      page_name: document.title,
      page_path: location.pathname,
      page_url: pageUrl,
      page_query_string: location.search,
    });
  }, [location.hash, location.pathname, location.search]);

  return null;
};

export default TealiumRouteTracker;
