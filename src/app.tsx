import React, { useCallback, useEffect, useState } from "react";
import Grid, { IGrid } from "./models/grid/grid";

const App = (): JSX.Element => {
    const [grid, setGrid] = useState<IGrid>() 

    const queryGrid = useCallback(async () => {
        const response = await fetch('https://localhost:8080/grid');
        const data = await response.json();
        setGrid(data as IGrid)
    }, [])

    useEffect(() => {
        setInterval(queryGrid, 3000);
    })

    return(<>{grid && <Grid grid={grid}/>}</>)
}

export default App