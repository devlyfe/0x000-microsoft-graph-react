interface Keyword {
  name: string;
  value: string;
  operator: "contains" | "eq";
  path: "body/content" | "from/emailAddress/name" | "from/emailAddress/address" | "subject";
}

export const keywords: Keyword[] = [
  {
    name: "CREDIT UNION",
    value: "CREDIT UNION",
    operator: "contains",
    path: "subject",
  },
  {
    name: "NET SPEND",
    value: "netspend.com",
    operator: "contains",
    path: "from/emailAddress/address",
  },
  {
    name: "CHIME",
    value: "Chime",
    operator: "contains",
    path: "from/emailAddress/name",
  },
  {
    name: "AFFIRM",
    value: "Affirm",
    operator: "contains",
    path: "from/emailAddress/name",
  },
  {
    name: "KLARNA",
    value: "Klarna",
    operator: "contains",
    path: "from/emailAddress/name",
  },
  {
    name: "VENMO",
    value: "venmo.com",
    operator: "contains",
    path: "from/emailAddress/address",
  },
  {
    name: "MONEYLION",
    value: "Moneylion",
    operator: "contains",
    path: "from/emailAddress/name",
  },
  {
    name: "ALBERT",
    value: "albert.com",
    operator: "contains",
    path: "from/emailAddress/address",
  },
  {
    name: "DAVE",
    value: "dave.com",
    operator: "contains",
    path: "from/emailAddress/address",
  },
  {
    name: "STASH",
    value: "stash.com",
    operator: "contains",
    path: "from/emailAddress/address",
  },
  {
    name: "SQUARE",
    value: "square",
    operator: "contains",
    path: "from/emailAddress/name",
  },
  {
    name: "COINBASE",
    value: "COINBASE",
    operator: "contains",
    path: "subject",
  },
  {
    name: "NETFLIX",
    value: "netflix.com",
    operator: "contains",
    path: "from/emailAddress/address",
  },
  {
    name: "GUSTO",
    value: "gusto",
    operator: "contains",
    path: "from/emailAddress/name",
  },
  {
    name: "GO2BANK",
    value: "Go2Bank",
    operator: "contains",
    path: "from/emailAddress/name",
  },
  {
    name: "WEBULL",
    value: "WEBULL",
    operator: "contains",
    path: "from/emailAddress/name",
  },
  {
    name: "MARCUS",
    value: "marcus",
    operator: "contains",
    path: "from/emailAddress/name",
  },
  {
    name: "CHASE",
    value: "chase.com",
    operator: "contains",
    path: "from/emailAddress/address",
  },
  {
    name: "NORTHLANE",
    value: "northlane",
    operator: "contains",
    path: "from/emailAddress/name",
  },
  {
    name: "FTX US",
    value: "ftx.us",
    operator: "contains",
    path: "from/emailAddress/address",
  },
];
