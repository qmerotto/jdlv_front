import React, { useState, useEffect } from "react";
import *  as Game  from "../../api/rest/game/game";
import { TGridMap } from "../grid/grid";
import { IGame } from "../game/game";
import Subscriber from "../../api/websocket";

interface IControlProps {
    callback: TCallbackTypes
    label: string
}

type TCallbackTypes = () => {}

const Control = (props: IControlProps): JSX.Element => {
    const {callback, label} = props
    return(
        <button onClick={() => callback()}>
            {label}
        </button>
    )
}

interface IControlsProps {
    gameUuid: string
    updateGame(game: IGame): void
    updateGridMap(grid: TGridMap): void
}

interface IConnectionState {
    running: boolean
    token: string
}

export const Controls = (props: IControlsProps): JSX.Element => {
    const { gameUuid, updateGame, updateGridMap } = props
    const [gridSize, setGridSize] = useState({x: 10, y: 10})
    const [connectionState, setConnectionState] = useState<IConnectionState>({running: false, token: ""})

    const newGame = () => {
        Game.newGame(gridSize.x, gridSize.y).then(
            (game: IGame) =>{
                updateGame(game)
            }
        )
    }
    
    const startGrid = () => {
        Game.getWebsocketToken(props.gameUuid).then(
          (token: string) => {
            console.log("webosocket token: ", token)
            if ( token !== "") {
                setConnectionState({
                    running: true,
                    token: token
                })
            }
          }
        )
    }

    const stopGrid = () => {
        Game.stopGrid(props.gameUuid).then(() => {
            console.log("stop")
            setConnectionState({
                running: false,
                token: ""
            })
            }
        )
    }

    return(
        connectionState.running ? 
            <Subscriber token={connectionState.token} setGrid={updateGridMap} stop={stopGrid}>
                <Control label="Start" callback={async () => startGrid()} />
                <Control label="Stop" callback={async () => stopGrid()} />
                <Control label="New" callback={async () => newGame()} />
                <input type="text" /> <input type="text" />
            </Subscriber> : 
        
            <>
                <Control label="Start" callback={async () => startGrid()} />
                <Control label="Stop" callback={async () => stopGrid()} />
                <Control label="New" callback={async () => newGame()} />
                <input type="text" /> <input type="text" />
            </>  
    )
}