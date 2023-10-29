import { createContext, useCallback, useState } from "react"
import React from "react"
import Grid, { TGridMap } from "../grid/grid"
import { PubSubGenericProvider } from "../../api/websocket/PubSubGenericProvider"
import { getGetEventList } from "../../api/websocket/PubSubUtils"
import { ChannelsNames } from "../../api/websocket/Channel.types"
import { UserNotificationContext } from "../../api/websocket/PubSubContexts"
import { Controls } from "../Controls/Controls"
import { DEFAULT_GAME_UUID, IGame, initGame } from "../../contexts/game"
import { GameContext } from "../../contexts/GameContext"

interface IGlobalWrapperProps {

}

interface IUserContext {
    userUuid: string
}
export const UserContext = createContext<IUserContext|null>(null);

export const GlobalWrapper = (props: IGlobalWrapperProps): JSX.Element => {
    
    const [game, setGame] = useState<IGame>(initGame());
    const [userUuid, setUserUuid] = useState<string>('fakeUSER') ;
    const updateGame = (game: IGame): void => {
        setGame(game)
    }


    const updateGridMap = (grid: TGridMap): void => {
        setGame({...game,
            grid: grid})
    }
    
    return(
        <PubSubGenericProvider
        context={UserNotificationContext}
        channelName={`${ChannelsNames.User}${userUuid}`}
        events={getGetEventList(ChannelsNames.User)}
        canConnect
        currentUser={{
            uuid: userUuid
        }}
      >
            <UserContext.Provider value={{userUuid: userUuid}}>
                <GameContext.Provider value={game} >
                    {game.uuid !== DEFAULT_GAME_UUID ? <>{`Game: ${game.uuid}`}</>:<></>}
                    <div></div>
                    <Grid grid={game?.grid} />
                    <Controls />
                </GameContext.Provider>
            </UserContext.Provider>
        </PubSubGenericProvider>

    )
}
