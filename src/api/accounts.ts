import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/lib/TaskEither";
import * as ROA from "fp-ts/lib/ReadonlyArray";

import axios, { AxiosError } from "axios";

export type AccountUserType =
  | "associate-membership"
  | "committee"
  | "friend"
  | "group-membership"
  | "honorary"
  | "individual-membership"
  | "junior-membership"
  | "overseas-membership";

const isGroupType = (type: AccountUserType): boolean => {
  switch (type) {
    case "associate-membership":
    case "group-membership":
    case "junior-membership":
    case "overseas-membership":
      return true;
    default:
      return false;
  }
};

export interface AccountUserInfo {
  id: string;
  name: string;
  contactName: string | null;
  type: AccountUserType;
  isGroup: boolean;
  isIndividual: boolean;
}

export interface GetAccountsResponse {
  accounts: readonly {
    id: string;
    name: string;
    contactName: string | null;
    type: AccountUserType;
  }[];
}

export interface GetAccountResponse {
  account: {
    id: string;
    name: string;
    contactName: string | null;
    type: AccountUserType;
  };
}

const retreiveAccounts = (): TE.TaskEither<
  Error | "forbidden",
  readonly AccountUserInfo[]
> =>
  pipe(
    TE.tryCatch(
      () => axios.get<GetAccountsResponse>("/api/accounts"),
      (reason) => {
        const error = reason as AxiosError;
        if (error.response) {
          if (error.response.status === 403) {
            return "forbidden";
          }
        }
        return new Error(`${reason}`);
      }
    ),
    TE.map((response) => response.data),
    TE.map((data) => data.accounts),
    TE.map(
      ROA.map((retAcc) => ({
        ...retAcc,
        isGroup: isGroupType(retAcc.type),
        isIndividual: !isGroupType(retAcc.type),
      }))
    )
  );

export const getAccounts = () => pipe(retreiveAccounts());

const retrieveAccount = (
  id: string
): TE.TaskEither<Error | "forbidden", AccountUserInfo> =>
  pipe(
    TE.tryCatch(
      () => axios.get<GetAccountResponse>("/api/accounts/" + id),
      (reason) => {
        const error = reason as AxiosError;
        if (error.response) {
          if (error.response.status === 403) {
            return "forbidden";
          } else if (error.response.status === 404) {
            return new Error("Account not found");
          }
        }
        return new Error(`${reason}`);
      }
    ),
    TE.map((response) => response.data),
    TE.map((data) => ({
      ...data.account,
      isGroup: isGroupType(data.account.type),
      isIndividual: !isGroupType(data.account.type),
    }))
  );

export const getAccount = (id: string) => pipe(retrieveAccount(id));
