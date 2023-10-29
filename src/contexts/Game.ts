import { EmptyGrid, TGridMap } from "../components/grid/grid"

export interface IGame {
    x: number
    y: number
    uuid: string
    grid: TGridMap // GRid ou pas ? Pb de taille 
}

export const DEFAULT_X = 10
export const DEFAULT_Y = 10
export const DEFAULT_GAME_UUID = 'DEFAULT_GAME_UUID';

export const initGame = (): IGame => {
    return {
        x: DEFAULT_X,
        y: DEFAULT_Y,
        uuid: DEFAULT_GAME_UUID,
        grid: EmptyGrid()
    };
};

