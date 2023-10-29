import { EGameActionType, TGameAction, TGameState } from "./Game.types";

export const pubSubReducer = (
  state: TGameState,
  action: TGameAction
): TGameState => {
  const current = { ...state };

  switch (action.type) {
    case EGameActionType.SetGrid:
      return {
        ...current,
        grid: action.grid,
      }
    default:
      return state;
  }
};
