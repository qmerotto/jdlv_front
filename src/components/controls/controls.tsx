import React, { useState, useEffect } from "react";
import { ICell } from "../cell/cell";

interface IControlProps {
    callback: ()=>{}
    label: string
}


const Control = (props: IControlProps): JSX.Element => {
    const {callback, label} = props
    return(
        <button onClick={() => callback()}>
            {label}
        </button>
    )
}
interface IControlsProps {
    updateGrid: React.Dispatch<React.SetStateAction<[[ICell]] | undefined>>
}

export const Controls = (props: IControlsProps): JSX.Element => {
    return(
        <>
            <Control label="Start" callback={() => startGrid()} />
            <Control label="Stop" callback={() => stopGrid()} />
            <Control label="Reset" callback={() => resetGrid()} />
        </>
    )
}