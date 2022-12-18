import React, {useEffect, useState} from "react";
import styled, { css } from "styled-components";



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

    useEffect(() => {
        setCell(props.cell);
    }, [props])

    const setAlive = async (x: number, y: number) => {
        console.log("set alive")
        const response = await fetch('http://localhost:8080/set_cells',  {
            headers: {'Origin':'http://localhost:3000'},
            method: "POST",
            mode: "cors",
            body:  JSON.stringify({
                "cells": [{x: x, y: y}]
            })
        });
        const data = await response.json();
        if ( data ) {
            console.log(data)
            setCell({
                x: cell.x,
                y: cell.y,
                state: {
                    alive: true,
                    fuel: cell.state.fuel,
                    temperature: cell.state.temperature
                }
            })
        }
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
