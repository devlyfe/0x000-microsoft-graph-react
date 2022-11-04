import { createRoot } from "react-dom/client";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { App } from "./App";

const instance = new PublicClientApplication({
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
  },
});

createRoot(document.getElementById("root") as HTMLElement).render(
  <MsalProvider instance={instance}>
    <App />
  </MsalProvider>
);
