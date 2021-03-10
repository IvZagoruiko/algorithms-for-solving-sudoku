export type Square = string;
export type Squares = Square[];

export interface IUnitsMap {
  [key: string]: Squares[];
}

export interface IPeersMap {
  [key: string]: Squares;
}

export interface ICandidates {
  [key: string]: string;
}
