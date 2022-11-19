import React from "react";
import {Cell, ICell} from "../cell/cell"

export interface IGrid {
    x: number
    y: number
    map:   [[ICell]]
}

export interface IGridProps {
    grid: IGrid
}

const Grid = (props: IGridProps): JSX.Element => {
    return(
        <>
            {props.grid.map.map((lign: [ICell]) => {
                lign.map((cell: ICell) => {
                    <Cell cell={cell} />
                })
            })}
        </>
    )
}

export default Grid