import { ICell } from "../../components/cell/cell";

export enum EventName {
  NewGame = 'NewGame',
  GameCreated = "GameCreated",
  GameStarted = "GameStarted",
  GameStopped = "GameStopped",
  GridUpdated = "GridUpdated",
}

export interface IGameCreated {
  gameUuid: String
  grid: [[ICell]]
}

export interface IGameStarted {
  gameUuid: String
}

export interface IGameStopped {
  gameUuid: String
}

export interface IGridUpdated {
  gameUuid: String
  grid: [[ICell]]
}

export interface INewGame {
  x: number
  y: number
}

export interface IEvent<T> {
  id?: number;
  sentAt: Date;
  payload: T;
}

export type TEvent =
  | IEvent<IGridUpdated>
  | IEvent<INewGame>
  | IEvent<IGameCreated>
  | IEvent<IGameStarted>
  | IEvent<IGameStopped>
