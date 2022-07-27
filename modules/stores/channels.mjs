import useApiData from '../utilities/useApiData.mjs';

export const channelList = useApiData([], async (channel) => {
    const response = await fetch("https://api.lickd.co/ratecards", {
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        "body": `{"channelId":"${channel}","currency":"USD","brandSponsored":false}`,
        "method": "POST",
    });
    if (!response.ok) {
        let message = response.status + 'An unknown error occurred';
        try {
            const errorResponse = await response.json();
            message = response.status + ' ' + errorResponse.error;
        } catch {
            // No body
        }
        throw Error(message);
    }
    return response.json();
});

export const channelSearch = useApiData([], async (query) => {
    const response = await fetch(`https://api.lickd.co/youtube/channels?q=${query}`, {
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        let message = response.status + 'An unknown error occurred';
        try {
            const errorResponse = await response.json();
            message = response.status + ' ' + errorResponse.error;
        } catch {
            // No body
        }
        throw Error(message);
    }
    return (await response.json()).data.slice(0, 4);
});