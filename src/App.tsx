import { find } from "lodash";
import { useEffect, useState } from "react";
import { InteractionType } from "@azure/msal-browser";
import { Get, MgtTemplateProps, Person } from "@microsoft/mgt-react";
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { Providers, ProviderState } from "@microsoft/mgt";

const scopes: string[] = [];

const Message: React.FC<MgtTemplateProps> = ({ dataContext }) => {
  return <div>{dataContext}</div>;
};

function useIsSignedIn(): [boolean] {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const updateState = () => {
      console.log("state updated");
      const provider = Providers.globalProvider;

      if (!provider) {
        return;
      }

      setIsSignedIn(provider && provider.state === ProviderState.SignedIn);
    };

    Providers.onProviderUpdated(updateState);
    updateState();

    return () => {
      Providers.removeProviderUpdatedListener(updateState);
    };
  }, []);

  return [isSignedIn];
}

export const App: React.FC = () => {
  const { accounts, instance, inProgress } = useMsal();
  const [isSignedIn] = useIsSignedIn();

  const signIn = async (username?: string) => {
    const account = find(accounts, (account) => account.username === username);

    if (account) {
      return instance
        .acquireTokenSilent({
          scopes,
          account,
        })
        .then(({ accessToken, account }) => {});
    }

    return instance.loginPopup({
      scopes,
    });
  };

  return (
    <div>
      <ul>
        {accounts.map(({ username }) => (
          <li key={username}>{username}</li>
        ))}
        <li>
          <button onClick={() => signIn()}>Login</button>
        </li>
      </ul>
      <MsalAuthenticationTemplate interactionType={InteractionType.Silent}>
        {isSignedIn && (
          <div>
            <div>Logged In</div>
            <Person />
            <Get resource="me/messages/$count?$filter=contains(subject, 'a')$select=subject">
              <Message template="event" />
            </Get>
          </div>
        )}
      </MsalAuthenticationTemplate>
    </div>
  );
};
