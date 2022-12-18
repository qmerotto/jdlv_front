import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import {Cell, ICell} from "../cell/cell"
import {QueryGrid} from "../../engine/engine";

export interface IGrid {
    x: number
    y: number
    map:   [[ICell]]
}

export interface IGridProps {
    grid: [[ICell]]
    setRunning: React.Dispatch<React.SetStateAction<boolean>>
}

interface ISGrid {
    $size: number
}

const SGrid = styled.div<ISGrid>`
    display: flex;
    border: 1px black;
    ${(props: ISGrid) => 
        `width: ${props.$size * 50}px;`
    }
`;

const Grid = (props: IGridProps): JSX.Element => {
    const [grid, setGrid] = useState<[[ICell]]>(props.grid)

    useEffect(() => {
        setGrid(props.grid);
    }, [props])

    console.log(props.grid)
    console.log(grid)
    const start = async () => {
        console.log("start click")
        const response = await fetch('http://localhost:8080/start',  {
            headers: {'Origin':'http://localhost:3000'},
            method: "GET",
            mode: "cors",
        });
        const data = await response.json();
        if ( data ) {
            props.setRunning(true)
            console.log(data)
        }
    }

    const stop = async () => {
        console.log("Stop click")
        const response = await fetch('http://localhost:8080/stop',  {
            headers: {'Origin':'http://localhost:3000'},
            method: "GET",
            mode: "cors",
        });
        const data = await response.json();
        if ( data ) {
            props.setRunning(false)
            console.log(data)
        }
    }

    const reset = async () => {
        await fetch('http://localhost:8080/reinitialize',  {
            headers: {'Origin':'http://localhost:3000'},
            method: "GET",
            mode: "cors",
        }).then(r => console.log(r));


        await QueryGrid().then(
            (value) => {

                console.log("grid")
                console.log(value)
                setGrid(value)
            }
        );

    }

    return(<>
            {grid ?
            <>
                <SGrid $size={grid.length}>
                    {
                        grid.map((line: [ICell], x: number) => {
                            return (
                                <div key={x}>
                                    {line.map((cell: ICell, y: number) => {
                                        return (<Cell key={x * 10 + y} cell={cell}/>)
                                    })}
                                </div>
                            )
                        })
                    }
                </SGrid>
                <div>
                    <button onClick={start}>
                        {"START"}
                    </button>
                    <button onClick={stop}>
                        {"STOP"}
                    </button>
                    <button onClick={reset}>
                        {"RESET"}
                    </button>
                </div>
            </> : <></>
        }
        </>
    )}

export default Grid