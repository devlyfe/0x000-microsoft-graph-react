import { PromptType } from "@microsoft/mgt";
import { PublicClientApplication, AccountInfo } from "@azure/msal-browser";
import { useLocalStorage } from "usehooks-ts";
import { findIndex } from "lodash";
import { useMemo } from "react";

//
import produce from "immer";

interface Account extends AccountInfo {
  accessToken: string;
}

const instance = new PublicClientApplication({
  auth: {
    clientId: "8635a120-7bc1-40be-aad1-4c70a8837060",
  },
});

const scopes: string[] = [];

export const useAuth = () => {
  const [accounts, setAccounts] = useLocalStorage<Account[]>("accounts", []);

  const account = useMemo(
    () =>
      accounts.find(
        (account) => account.username === instance.getActiveAccount()?.username
      ),
    [instance.getActiveAccount()]
  );

  const isAuthenticated = !!account;

  const login = () => {
    instance
      .loginPopup({
        scopes,
        prompt: PromptType.CONSENT,
      })
      .then((result) => {
        if (result.account) {
          const account = result.account;
          const username = account.username;
          setAccounts(
            produce(accounts, (draft) => {
              const index = findIndex(
                accounts,
                (account) => account.username === username
              );

              const toAccount = {
                ...account,
                accessToken: result.accessToken,
              };

              if (index) {
                draft[index] = toAccount;
                return;
              }

              draft.push(toAccount);
            })
          );
        }
      });
  };

  const logout = (account: AccountInfo) => {
    instance.logoutPopup({
      account,
    });
  };

  return { login, logout, account, accounts, isAuthenticated };
};
