export interface IDerivative {
  readonly id: number;
  readonly date: string;
  readonly wex: string;
  readonly drv: string;
  readonly matched: number;
  readonly unmatched: number;
  readonly unknown: number;
  readonly complete: number;
  readonly derivatives: string;
  readonly username: string;
}
