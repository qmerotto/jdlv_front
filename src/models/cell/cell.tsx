import React from "react";
import styled, { css } from "styled-components";



interface ISCell {
    alive: boolean
}

const SCell = styled.div`
    ${(props: ISCell) =>
        props.alive &&
        css`
        background: palevioletred;
        color: white;
        `};
    `

export interface ICell {
    x: number
    y: number
    state: number
}

export interface ICellProps {
    cell: ICell
}

export const Cell = (props: ICellProps): JSX.Element => {
    return(
        <SCell alive={props.cell.state == 0}/>
    )
}

export default Cell;