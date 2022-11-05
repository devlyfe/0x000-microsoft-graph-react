import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";

//
import Axios from "axios";

Axios.defaults.baseURL = "https://graph.microsoft.com/v1.0";

export const App: React.FC = () => {
  const { isAuthenticated, account, accounts, login, logout } = useAuth();

  useEffect(() => {
    console.log(accounts, account);
    Axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${account?.accessToken}`;
  }, [accounts, account]);

  return (
    <div>
      <pre>{JSON.stringify({ accounts }, null, 2)}</pre>
      <ul>
        {accounts.map(({ username }) => (
          <li key={username}>{username}</li>
        ))}
      </ul>
      <button onClick={() => login()}>Add Account</button>
      <button onClick={() => Axios.get("/me")}>Request</button>
    </div>
  );
};
