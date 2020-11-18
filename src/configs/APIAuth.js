import axios from 'axios';
import { MAIN_API } from './constraints';

export const APIAuth = (endpoint, contentHeader) => {
    return axios.get(MAIN_API + endpoint, {
        headers: {
            'Authorization': 'Bearer ' + contentHeader
        }
    })
}

export const APIAuthPostCall = (endpoint, contentHeader, body) => {
    return axios.post(MAIN_API + endpoint, body, {
        headers: {
            'Authorization': 'Bearer ' + contentHeader
        }
    });
};

export const APIAuthPutCall = (endpoint, contentHeader, body) => {
    return axios.put(MAIN_API + endpoint, body, {
        headers: {
            'Authorization': 'Bearer ' + contentHeader
        }
    });
};

export const APIAuthDeleteCall = (endpoint, contentHeader) => {
    return axios.delete(MAIN_API + endpoint, {
        headers: {
            'Authorization': 'Bearer ' + contentHeader
        }
    });
};
