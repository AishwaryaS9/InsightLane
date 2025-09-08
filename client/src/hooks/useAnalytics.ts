export const useAnalytics = () => {
  const sendEvent = (eventName: string, params: Record<string, any> = {}) => {
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", eventName, params);
    }
  };

  const trackPageView = (url: string) => {
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "page_view", {
        page_path: url,
      });
    }
  };

  return { sendEvent, trackPageView };
};
