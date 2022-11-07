import { Providers, ProviderState } from "@microsoft/mgt-element";
import { useState, useEffect } from "react";

//
import axios from "axios";

export const useAUth = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [accessToken, setAccessTokn] = useState<string | null>(null);

  useEffect(() => {
    const updateState = () => {
      const provider = Providers.globalProvider;
      const isAuthenticated = provider && provider.state === ProviderState.SignedIn;

      if (isAuthenticated) {
        provider.getAccessToken().then((accessToken) => {
          if (accessToken) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
            setAccessTokn(accessToken);
          }
        });
      }

      setAuthenticated(isAuthenticated);
    };

    Providers.onProviderUpdated(updateState);
    updateState();

    return () => {
      Providers.removeProviderUpdatedListener(updateState);
    };
  }, []);

  return { isAuthenticated, accessToken };
};
