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