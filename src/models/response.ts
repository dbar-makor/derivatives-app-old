import { IDerivative } from "./derivatives";
import { IServerResponseData } from "./shared/response";

export interface IGetDerivativesResponse extends IServerResponseData {
  readonly data?: Pick<
    IDerivative,
    | "id"
    | "date"
    | "wex"
    | "drv"
    | "matched"
    | "unmatched"
    | "unknown"
    | "complete"
    | "derivatives"
    | "username"
  >[];
}

export interface ILoginResponse extends IServerResponseData {
  readonly data?: Readonly<{
    token: string;
    username: string;
  }>;
}
