import { useState } from "react";

const sendHttpRequest = async (url, config) => {
    const response = await fetch(url, config);

    const resData = await response.json();

    if(!response.ok) {
        throw new Error(
            resData.message || "Something went wrong while sending request, please try later."
        )
    }

    return resData;
}

const useHttp = () => {
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const sendRequest = async () => {
        setIsLoading(true);
        try {
            const resData = sendHttpRequest();
            setData(resData);
        } catch(err) {
            setError(err.message || "Something went wrong!");
        }
        setIsLoading(true);
    }

    return {
        data,
        isLoading,
        error
    }
}

export default useHttp;