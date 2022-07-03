import { useState, useEffect } from 'react'

export const useFetch = (url, method = 'GET') => {
  // component level states
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState(null)

  const postData = (postData) => {
    setOptions({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(postData),
    })
  }

  const putData = (putData) => {
    console.log('Inside putData')
    setOptions({
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(putData),
    })
  }

  const deleteData = () => {
    setOptions({
      method: 'DELETE',
    })
  }

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async (fetchOptions) => {
      setIsPending(true)
      try {
        const res = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
        })
        if (!res.ok) throw new Error(res.statusText)

        const json = await res.json()

        setIsPending(false)
        setData(json)
        setError(null)
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('the fetch was aborted')
        } else {
          setIsPending(false)
          setError('could not fetch the data')
        }
      }
    }

    if (method === 'GET') {
      fetchData()
    }
    if (method === 'POST' && options) {
      fetchData(options)
    }
    if (method === 'PUT' && options) {
      fetchData(options)
    }
    if (method === 'DELETE' && options) {
      fetchData(options)
    }

    return () => {
      controller.abort()
    }
  }, [url, options, method])

  return { data, isPending, error, postData, putData, deleteData }
}
