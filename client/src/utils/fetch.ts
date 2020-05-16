export const get = (route: string) => {
    return fetch(route, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(resp => resp.json());
}

export const post = (route: string, data: object) => {
    return fetch(route, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(resp => resp.json());
}

// Only for DEV use: This is for simulating a delay on fetch calls, mainly to test loaders
export const fetchDelay = (async (res: any) => {
    console.log('DEV: Simulated delay')
    await new Promise(resolve => setTimeout(resolve, 4000));

    return res;
})