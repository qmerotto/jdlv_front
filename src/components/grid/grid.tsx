import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {Cell, ICell} from "../cell/cell"


export type TGridMap = [[ICell]]
export interface IGridProps {
    grid?: TGridMap
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
    const [grid, setGrid] = useState<[[ICell]]>()

    useEffect(() => {
        if (props.grid) {
            setGrid(props.grid);
        }
    }, [props])

    console.log(grid)

    return(<>
            {grid ?
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
            : <></>
        }
        </>
    )}

export default Grid