import { IGame } from "../../../components/game/game";
import { TGridMap } from "../../../components/grid/grid";

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

interface newGamePayload {
    newGame: {
        uuid: string
        x: number,
        y: number,
        grid: TGridMap,
    }
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
