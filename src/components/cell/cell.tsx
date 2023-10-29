import React, {useContext, useEffect, useState} from "react";
import styled, { css } from "styled-components";
import { setCellAlive } from "../../api/rest/game/game";
import { UserContext, GameContext } from "../globalWrapper/globalWrapper";



interface ISCell {
    alive: boolean
    fuel?: number
	temperature?: number
}

const SCell = styled.div`
    width: 50px;
    height: 50px;
    border: 1px black dotted;
    ${(props: ISCell) =>
        props.alive &&
        css`
        background: green;
        `};
    `

export interface ICell {
    x: number
    y: number
    state: ISCell
}


export interface ICellProps {
    cell: ICell
}

export const Cell = (props: ICellProps): JSX.Element => {
    const [cell, setCell] = useState<ICell>(props.cell)
    const gameContext = useContext(GameContext)
    useEffect(() => {
        setCell(props.cell);
    }, [props])

    const setAlive = async (x: number, y: number) => {
        console.log("set alive: ", cell.x, cell.y, gameContext?.uuid)
        const updatedCell = await setCellAlive(cell.x, cell.y, gameContext?.uuid)
        setCell(updatedCell)
    }

    if (cell.state.alive) {
        console.log(`x: ${cell.x} y: ${cell.y}`)
    }

    return(
        <>
            <SCell onClick={() => setAlive(cell.x, cell.y)} alive={cell.state.alive} />
        </>

    )
}
