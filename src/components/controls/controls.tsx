import React, { useContext, useState } from "react";
import *  as Game  from "../../api/rest/game/game";
import { IGame } from "../../contexts/game";
import { UserNotificationContext } from "../../api/websocket/PubSubContexts";
import { EventName } from "../../api/websocket/Event.types";
import { GameContext } from "../../contexts/GameContext";

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


export const Controls = (): JSX.Element => {
    const userNotificationContext = useContext(UserNotificationContext);
    const gameContext = useContext(GameContext)

    const newGame = async () => {
        if (!(gameContext?.x && gameContext?.y)) {
            return
        }

        userNotificationContext?.publish(EventName.NewGame, {
            sentAt: new Date(),
            payload: {
                x: gameContext.x,
                y: gameContext.y,
            }
        })
    }
    
    const startGame = async () => {
        if (!gameContext?.uuid) {
            return
        }

        userNotificationContext?.publish(EventName.GameStarted, {
            sentAt: new Date(),
            payload: {
                gameUuid: gameContext.uuid,
            }
        })
    }

    const stopGame = () => {
        if (!gameContext?.uuid) {
            return
        }

        userNotificationContext?.publish(EventName.GameStarted, {
            sentAt: new Date(),
            payload: {
                gameUuid: gameContext.uuid,
            }
        })
    }

    return(<>
                <Control label="Start" callback={async () => startGame()} />
                <Control label="Stop" callback={async () => stopGame()} />
                <Control label="New" callback={async () => newGame()} />
                <input type="text" /> <input type="text" />
            </>
    )
}
