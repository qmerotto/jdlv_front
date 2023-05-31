
const startGrid = async (id?: string) => {
    console.log("start click")
    const response = await fetch(`http://localhost:8080/game/${id}/start`,  {
        headers: {'Origin':'http://localhost:3000'},
        method: "GET",
        mode: "cors",
    });
    const data = await response.json();
    if ( data ) {
        console.log(data)
    }
}

const stopGrid = async (id?: string) => {
    console.log("Stop click")
    const response = await fetch(`http://localhost:8080/game/${id}/stop`,  {
        headers: {'Origin':'http://localhost:3000'},
        method: "GET",
        mode: "cors",
    });
    const data = await response.json();
    if ( data ) {
        console.log(data)
    }
}

const resetGrid = async (id?: string) => {
    await fetch(`http://localhost:8080/game/${id}/reinitialize`,  {
        headers: {'Origin':'http://localhost:3000'},
        method: "GET",
        mode: "cors",
    }).then(r => console.log(r));

}