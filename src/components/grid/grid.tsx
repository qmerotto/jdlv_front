import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import {Cell, ICell} from "../cell/cell"
import { UserNotificationContext } from "../../api/websocket/PubSubContexts";
import { EventName, IEvent, IGameCreated, IGridUpdated, INewGame, TEvent } from "../../api/websocket/Event.types";


export type TGridMap = [[ICell]]

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

export const EmptyGrid = (): TGridMap => {
    console.log("init empty grid") 
    const grid: TGridMap = [[{
            x: 0,
        y: 0,
        state:  {
            alive: false,
            fuel: 0,
            temperature: 0,
        }
        
    }]]

    for(var i: number = 0; i < 10; i++) {
        grid[i] = [{
            x: 0,
            y: 0,
            state:  {
                alive: false,
                fuel: 0,
                temperature: 0,
            }
            
        }]
        for(var j: number = 0; j< 10; j++) {
            grid[i][j] = {
                x: i,
                y: j,
                state:  {
                    alive: false,
                    fuel: 0,
                    temperature: 0,
                }
                
            }
        }
    }

    return grid
}

const Grid = (): JSX.Element => {
    const [grid, setGrid] = useState<[[ICell]] | null>()

    const userNotificationContext = useContext(UserNotificationContext)

    
    useEffect(() => {
        const unsub = userNotificationContext?.subscribe(EventName.NewGame, (event) => {
            setGrid((event.payload as IGameCreated).grid )
        })

        return (): void => unsub && unsub();
    }, [])

    useEffect(() => {
        const unsub = userNotificationContext?.subscribe(EventName.GridUpdated, (event) => {
            setGrid((event.payload as IGridUpdated).grid )
        })

        return (): void => unsub && unsub();
    }, [])




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