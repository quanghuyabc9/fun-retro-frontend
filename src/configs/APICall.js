import axios from 'axios';
import { MAIN_API } from './constraints';

const APICall = (endpoint, method = 'GET', body) => {
    return axios({
        method: method,
        url: MAIN_API + endpoint,
        data: body
    }).catch(err => {
        throw err;
    });
};

export default APICall;