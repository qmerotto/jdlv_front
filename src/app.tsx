import React, { useCallback, useEffect, useState } from "react";
import Grid, { IGrid } from "./models/grid/grid";
import {ICell} from "./models/cell/cell";
import {ConnectToWebSocker, QueryGrid} from "./api/api";



const App = (): JSX.Element => {
    const [running, setRunning] = useState(false)
    const [gridDatas, setGrid] = useState<[[ICell]]>()



    ConnectToWebSocker(setGrid)
    /*useEffect(() => {
        if (running) {
            const id = setInterval(queryGrid, 5000);
            return (() => clearInterval(id))
        }
    }, [running])*/


    return(<>{gridDatas ? <Grid grid={gridDatas} setRunning={setRunning}/>:<>NUL</>}</>)
}

export default App