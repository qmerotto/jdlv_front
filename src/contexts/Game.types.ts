import { TGridMap } from "../components/grid/grid";

export enum EGameActionType {
  SetGrid = "SetGrid",
}

export interface IGameProvider {
  context: React.Context<TGameState | null>;
  children: React.ReactNode;
}

export interface TGame {
  setGrid: (grid: TGridMap) => void;
}

export type TGameAction =
  | { type: EGameActionType.SetGrid; grid: TGridMap }

  export interface TGameState {
    x: number
    y: number
    uuid: string
    grid: TGridMap;
  }