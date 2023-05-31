import useWebSocket from "react-use-websocket";
import {ICell} from "../models/cell/cell";

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

export const ConnectToWebSocker = (setGrid: React.Dispatch<React.SetStateAction<[[ICell]] | undefined>>) => {
    const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket("ws://localhost:8080/game/grid", {
        onOpen: () => {
          console.log('WebSocket connection established.');
        },
        onMessage: (event: MessageEvent<any>) => {
            Promise.resolve(event?.data.text()).then(
                (bodyString: string) => {
                    const r: WSMessage = JSON.parse(bodyString)
                    switch(r.event) {
                    case WSEvent.GRID_UPDATED.valueOf():
                        console.log(r);
                        break;
                    default:
                        console.log("raté " + r.event)
                    }
                }
            )
        },
        onError: (m: Event) => {
            console.error('WebSocket connection error', m);
        },
      });

    sendMessage("test")
    //console.log(lastMessage)
}

