import { Status } from "./shared/enum";

export interface IHistory {
  reports: {
    id?: string;
    status?: Status;
    created_at?: string;
  }[];
};

export interface ICSV {
    readonly file: string,
};
