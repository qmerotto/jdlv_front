import React, { useCallback, useEffect, useState } from "react";
import Grid, { IGrid } from "./components/grid/grid";
import {ICell} from "./components/cell/cell";
import {ConnectToWebSocker, QueryGrid} from "./api/api";
import { Controls } from "./components/controls/controls";
import { GlobalWrapper } from "./components/globalWrapper/globalWrapper";



const App = (): JSX.Element => {
    const [running, setRunning] = useState(false)
    const [gridDatas, setGrid] = useState<[[ICell]]>()



    /*useEffect(() => {
        if (running) {
            const id = setInterval(queryGrid, 5000);
            return (() => clearInterval(id))
        }
    }, [running])*/


    return(
        <GlobalWrapper />
    )
}

export default App