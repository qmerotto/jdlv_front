import { createContext, useCallback, useState } from "react"
import React from "react"
import Grid, { TGridMap } from "../grid/grid"
import { Controls } from "../controls/controls"
import { IGame } from "../game/game"
import Subscriber from "../../api/websocket"

interface IGlobalWrapperProps {

}

interface IUserContext {
    userUuid: string
}
export const UserContext = createContext<IUserContext|null>(null);

export const GameContext = createContext<IGame|null>(null);

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

const DEFAULT_GAME_UUID = 'DEFAULT_GAME_UUID';

const initGame = (): IGame => {
    return {
        x: DEFAULT_X,
        y: DEFAULT_Y,
        uuid: DEFAULT_GAME_UUID,
        grid: emptyGrid()
    };
};

interface IWebsocketContext {
    setToken: (m: string) => void
}
export const WebsocketContext = createContext<IWebsocketContext>(null);

interface IConnectionState {
    running: boolean
    token: string
}

export const GlobalWrapper = (props: IGlobalWrapperProps): JSX.Element => {
    const [game, setGame] = useState<IGame>(initGame());
    const [userUuid, setUserUuid] = useState<string>('fakeUSER') ;
    const updateGame = (game: IGame): void => {
        setGame(game)
    }

    const [connectionState, setConnectionState] = useState<IConnectionState>({running: false, token: ""})

    const updateGridMap = (grid: TGridMap): void => {
        setGame({...game,
            grid: grid})
    }

//    const updateConnectionState = (new: IConnectionState): void => 
    
    return(
        <Subscriber token={connectionState.token} setGrid={updateGridMap} stop={stopGrid}>

            <UserContext.Provider value={{userUuid: userUuid}}>
                <GameContext.Provider value={game} >
                    {game.uuid !== DEFAULT_GAME_UUID ? <>{`Game: ${game.uuid}`}</>:<></>}
                    <div></div>
                    <Grid grid={game?.grid} />
                    <Controls gameUuid={game?.uuid || ""} updateGame={updateGame} updateGridMap={updateGridMap}/>
                </GameContext.Provider>
            </UserContext.Provider>
        </Subscriber>
    )
}
