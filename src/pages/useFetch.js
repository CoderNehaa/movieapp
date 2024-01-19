import React, { useEffect, useState } from 'react'

const useFetch = (url) => {
    const [data, setData] = useState([]);

    const baseUrl = 'https://api.themoviedb.org/3/';

    useEffect(() => {
        fetch(baseUrl+url)
        .then(res => res.json())
        .then(temp => console.log(temp))
        .catch(err => console.log(err))
    }, []);

  return [data];
}

export default useFetch
