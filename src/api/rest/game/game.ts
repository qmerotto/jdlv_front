import { ICell } from "../../../components/cell/cell";
import { TGridMap } from "../../../components/grid/grid";
import { IGame } from "../../../contexts/game";

interface getWebsocketTokenPayload {
    token: string
}

export const getWebsocketToken = async (uuid?: string) => {
    console.log("start click")
   return await fetch(`http://localhost:8080/game/token`,  {
        headers: {'Origin':'http://localhost:3000'},
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
            gameUuid: uuid,
        }),
    })
    .then(r => r.json())
    .then(
        (payload: getWebsocketTokenPayload) => {
            console.log(payload)
            return payload.token
        }
    );
}

export const stopGrid = async (uuid?: string) => {
    console.log("Stop click")
    const response = await fetch(`http://localhost:8080/game/stop`,  {
        headers: {'Origin':'http://localhost:3000'},
        method: "GET",
        mode: "cors",
    });
    const data = await response.json();
    if ( data ) {
        console.log(data)
    }
}

export interface newGame {
    uuid: string
    x: number,
    y: number,
    grid: TGridMap,
}

interface newGamePayload {
    newGame: newGame
}

export const newGame = async (x: number, y: number): Promise<IGame> =>  {

    return await fetch('http://localhost:8080/game/new',  {
        body: JSON.stringify({
            x: x,
            y: y,
        }),
        headers: {
            'Origin':'http://localhost:3000',
            'Content-Type': 'application/json'
        },
        method: "POST",
        mode: "cors",
    })
    .then(r => r.json())
    .then(
        (payload: newGamePayload) => {
            console.log(payload)
            return payload.newGame
        }
    )

}


export const setCellAlive = async (x: number, y: number, gameUuid?: string): Promise<ICell> =>  {
    return await fetch('http://localhost:8080/game/jdlv/cell',  {
        body: JSON.stringify({
            gameUuid: gameUuid,
            x: x,
            y: y,
        }),
        headers: {
            'Origin':'http://localhost:3000',
            'Content-Type': 'application/json'
        },
        method: "POST",
        mode: "cors",
    })
    .then(r => r.json())
    .then(
        (payload: ICell) => {
            return payload
        }
    )
}