import axios from 'axios'
import { BACKEND_URL } from '@/globals'

async function get({ url }) {
    const u = `${BACKEND_URL}${url}`
    const data = await axios.get(u)
    return data
}

async function post({ url, name, offset }) {
    const u = `${BACKEND_URL}${url}`
    const data = await axios.post(u, {
        name,
        offset
    })
    console.log(data)
    return data
}

export { get, post }
