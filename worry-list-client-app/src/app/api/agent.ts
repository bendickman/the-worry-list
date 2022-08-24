import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { WorryItem } from '../layout/models/worryItem';
import { store } from '../stores/store';

//fake slow server
const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
};

axios.interceptors.response.use(async response => {
    await sleep(2000);
    return response;
}, (error: AxiosError) => {
    const { data, status, config }: { data: any; status: number, config: any } = error.response!;
    switch (status) {
        case 400:
            if (typeof data === 'string') {
                toast.error(data);
            }

            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                history.push('/not-found');
            }

            if (data.errors) {
                const modelStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]){
                        modelStateErrors.push(data.errors[key]);
                    }
                }
                throw modelStateErrors.flat();
            } 
            break;
        case 401:
            toast.error('unauthorised');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }

    return Promise.reject(error);
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