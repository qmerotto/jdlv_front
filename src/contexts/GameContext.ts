import * as React from "react";
import { TGameState } from "./Game.types";

export const GameContext = React.createContext<TGameState | null>(null);