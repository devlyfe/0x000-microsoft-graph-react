import { Providers, Login, Get, MgtTemplateProps, LoginType } from "@microsoft/mgt-react";
import { Msal2Provider, PromptType } from "@microsoft/mgt-msal2-provider";
import { useEffect, useState } from "react";
import { useAUth } from "./hooks/useAuth";
import { getMessageByKeywords, TotalMessage } from "./lib/message";
import { saveAs } from "file-saver";

Providers.globalProvider = new Msal2Provider({
  clientId: "8635a120-7bc1-40be-aad1-4c70a8837060",
  prompt: PromptType.SELECT_ACCOUNT,
  loginType: LoginType.Popup,
  scopes: [
    "Mail.Read",
    "Mail.ReadBasic",
    "Mail.ReadWrite",
    "Contacts.Read",
    "Contacts.ReadWrite",
    "Notes.Read",
    "Notes.ReadWrite",
    "Notes.Create",
  ],
});

interface StatProps extends MgtTemplateProps {
  label: string;
}

const Stat = ({ dataContext, label }: StatProps) => {
  const total = dataContext["@odata.count"];

  return (
    <div className="stat w-full">
      <div className="stat-title">{label}</div>
      <div className="stat-value text-primary">{total}</div>
    </div>
  );
};

export const App: React.FC = () => {
  const { isAuthenticated, accessToken } = useAUth();
  const [keywords, setKeywords] = useState<TotalMessage[]>([]);

  useEffect(() => {
    if (accessToken) {
      getMessageByKeywords().then((result) => setKeywords(result));
    }
  }, [accessToken]);

  return (
    <div className="max-w-6xl mx-auto m-2">
      {isAuthenticated ? (
        <>
          <div className="card bg-base-200">
            <div className="card-body">
              <div>
                <header className="flex items-center justify-between">
                  <div>
                    <Login />
                  </div>
                  <div>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        window.navigator.clipboard.writeText(
                          keywords
                            .filter(({ total }) => Number(total) > 0)
                            .map(({ name, total }) => [name, total].join(":"))
                            .join("|")
                        )
                      }
                    >
                      Export
                    </button>
                  </div>
                </header>
                <div>
                  <div className="divider">Stats</div>
                  <div className="stats shadow grid grid-cols-4">
                    <Get resource="/me/messages?$select=subject&count=true&top=1">
                      <Stat label="Messages" />
                    </Get>
                    <Get resource="me/insights/shared?$count=true&$top=100000&select=id">
                      <Stat label="Message Attachments" />
                    </Get>
                    <Get resource="/me/onenote/pages?$count=true">
                      <Stat label="Notes" />
                    </Get>
                    <Get resource="/me/contacts?$count=true">
                      <Stat label="Contacts" />
                    </Get>
                  </div>
                </div>
              </div>
              <div>
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th className="w-10">#</th>
                        <th>Name</th>
                        <th className="w-10 text-center">Total Message</th>
                      </tr>
                    </thead>
                    <tbody>
                      {keywords.map(({ name, status, total }, index) => (
                        <tr className={status != 200 ? "text-red-500" : ""}>
                          <th>{index + 1}</th>
                          <td>{name}</td>
                          <td className="w-10 text-center">{total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="h-screen grid place-items-center">
          <div className="bg-base-200">
            <Login />
          </div>
        </div>
      )}
    </div>
  );
};
