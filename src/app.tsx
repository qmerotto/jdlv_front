import React, { useCallback, useEffect, useState } from "react";
import Grid, { IGrid } from "./models/grid/grid";
import {ICell} from "./models/cell/cell";
import {QueryGrid} from "./engine/engine";



const App = (): JSX.Element => {
    const [running, setRunning] = useState(false)
    const [grid, setGrid] = useState<[[ICell]]>()

   const queryGrid = useCallback(async () => {
        await QueryGrid().then(
            (value) => {
                console.log("app")
                console.log(value)
                setGrid(value)
            }
        )
    }, [])


    useEffect(() => {
        if (!grid) {
            console.log("not grid")
            queryGrid().catch(console.error)
        }
    }, [])

    useEffect(() => {
        if (running) {
            const id = setInterval(queryGrid, 5000);
            return (() => clearInterval(id))
        }
    }, [running])


    return(<>{grid ? <Grid grid={grid} setRunning={setRunning}/>:<>NUL</>}</>)
}

export default App