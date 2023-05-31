import { useState } from "react"
import { ICell } from "../cell/cell"
import React from "react"
import Grid from "../grid/grid"
import { Controls } from "../controls/controls"

interface IGlobalWrapperProps {

}

export const GlobalWrapper = (props: IGlobalWrapperProps): JSX.Element => {
    const [gridDatas, setGrid] = useState<[[ICell]]>()

    return(
        <>
            <Grid grid={gridDatas} />
            <Controls updateGrid={setGrid}/>
        </>
    )
}
