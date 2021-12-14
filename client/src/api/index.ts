import axios from 'axios'
import { store } from '../redux/store'
import { actions as errorActions } from '../redux/error/actions'
import { handleStatus } from '../shared/handleStatus'

export const api = {
    get: (url: string): any => {
        const token = window.localStorage.getItem('token')
        return axios.get(url, {
            headers: {
                "authorization": token ? token : ""
            }
        })
            .then(res => res.data)
            .catch(err => {
                console.log(err)
                handleStatus(err?.response)
            })
    },
    post: (url: string, body: any): any => {
        const token = window.localStorage.getItem('token')
        return axios.post(url, body, {
            headers: {
                "Content-type": "application/json",
                "authorization": token ? token : ""
            }
        })
            .then(res => res.data)
            .catch(err => {
                console.log(err)
                handleStatus(err?.response)
            })
    }
}