import React, { PropsWithChildren } from "react";
import useWebSocket from "react-use-websocket";
import {ICell} from "../components/cell/cell";
import { TGridMap } from "../components/grid/grid";

interface IQueryGridResponse {
    grid: [[ICell]]
}

export const QueryGrid = async (): Promise<[[ICell]]> => {
    const response = await fetch('http://localhost:8080/grid',  {
        headers: {'Origin':'http://localhost:3000'},
        method: "GET",
        mode: "cors",
    });

    const body = await response.json()

    return (body as IQueryGridResponse).grid;
}

enum WSEvent  {
    GRID_UPDATED = 'gridUpdated'
}

export interface WSMessage {
    event: WSEvent,
    payload: any,
}

export interface ISubscriberProps {
    token: string,
    setGrid: (map: TGridMap) => void
    stop: () => void
}

const Subscriber = (props: PropsWithChildren<ISubscriberProps>): JSX.Element => {
    const { children, token, setGrid } = props
    console.log("init subscriber")
    const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket("ws://localhost:8080/game/grid", {
        onOpen: () => {
            console.log('sending message', JSON.stringify({
                token: token,
                }));
            sendMessage(JSON.stringify({
                token: token,
                }))
            console.log('WebSocket connection established.');
        },
        onMessage: (event: MessageEvent<any>) => {
            Promise.resolve(event?.data.text()).then(
                (bodyString: string) => {
                    const r: WSMessage = JSON.parse(bodyString)
                    switch(r.event) {
                    case WSEvent.GRID_UPDATED.valueOf():
                        console.log(r);
                        setGrid(r.payload)
                        break;
                    default:
                        console.log("raté " + r.event)
                    }
                }
            )
        },
        onError: (m: Event) => {
            console.error('WebSocket connection error', m);
            stop()
        },
      });

    return (<>{children}</>)
}

export default Subscriber
