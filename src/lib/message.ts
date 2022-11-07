import { keywords } from "@/constant";

//
import Query from "odata-query";
import Slug from "slugify";
import axios from "axios";
import { orderBy, reverse } from "lodash";

export interface BatchResponse {
  responses: Response[];
}

interface Response {
  id: string;
  status: number;
  body: Body;
}

interface Body {
  "@odata.count"?: number;
}

export interface TotalMessage {
  name: string;
  status: number;
  total: number;
}

export const getMessageByKeywords = async (): Promise<TotalMessage[]> => {
  const queries = keywords.map(({ name, operator, path, value }) => ({
    id: Slug(name.toLowerCase()),
    url: `/me/messages${Query({
      filter: {
        [path]: {
          [operator]: value,
        },
      },
      count: true,
      select: "id",
    })}`,
    method: "GET",
  }));

  const messages = await axios
    .post<BatchResponse>(`https://graph.microsoft.com/v1.0/$batch`, {
      requests: queries,
    })
    .then(({ data }) => data)
    .then((data) =>
      data.responses.map((response) => ({
        name: response.id.replace("-", " ").toUpperCase(),
        status: response.status,
        total: response.body["@odata.count"] ?? 0,
      }))
    );

  return reverse(orderBy(messages, ["total"]));
};
