import { createContext, useCallback, useState } from "react"
import React from "react"
import Grid, { TGridMap } from "../grid/grid"
import { Controls } from "../controls/controls"
import { IGame } from "../game/game"

interface IGlobalWrapperProps {

}

interface IGameContext {
    uuid: string
    userUuid: string
}

const GameContext = createContext<IGameContext|null>(null);

const DEFAULT_X = 10
const DEFAULT_Y = 10

const emptyGrid = (): TGridMap => {
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

const initGame = (): IGame => {
    return {
        x: DEFAULT_X,
        y: DEFAULT_Y,
        uuid: "",
        grid: emptyGrid()
    }
}

export const GlobalWrapper = (props: IGlobalWrapperProps): JSX.Element => {
    const [game, setGame] = useState<IGame>(initGame());

    const updateGame = (game: IGame): void => {
        setGame(game)
    }

    const updateGridMap = (grid: TGridMap): void => {
        setGame({...game})
    }

    return(
        <GameContext.Provider value={null} >
            <Grid grid={game?.grid} />
            <Controls gameUuid={game?.uuid || ""} updateGame={updateGame} updateGridMap={updateGridMap}/>
        </GameContext.Provider>
    )
}
