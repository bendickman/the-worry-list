import axios, { AxiosResponse } from 'axios';
import { WorryItem } from '../layout/models/worryItem';

//fake slow server
const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
};

axios.interceptors.response.use(async response => {
    try {
        await sleep(2000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const WorryItems = {
    list: <T>() => requests.get<WorryItem[]>('/worryitems'),
    details: (id: string) => requests.get<WorryItem>(`/worryitems/${id}`),
    create: (worryItem: WorryItem) => requests.post<void>('/worryitems', worryItem),
    update: (worryItem: WorryItem) => requests.put<void>(`/worryitems/${worryItem.id}`, worryItem),
    delete: (id: string) => requests.del<void>(`/worryitems/${id}`),
};

const agent = {
    WorryItems
};

export default agent;