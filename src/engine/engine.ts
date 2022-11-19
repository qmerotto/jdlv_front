export const QueryGrid = async (): Promise<any> => {
    const response = await fetch('https://localhost:8080/grid');
    const data = await response.json();
    return data
}