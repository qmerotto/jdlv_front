import { TGridMap } from "../grid/grid"

export interface IGame {
    x: number
    y: number
    uuid: string
    grid: TGridMap
}