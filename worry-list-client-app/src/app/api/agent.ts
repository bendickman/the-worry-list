import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { IWorryItem } from '../models/worryItem';
import { store } from '../stores/store';
import { IUser, IUserFormValues } from '../models/user';
import { PaginatedResults } from '../models/pagination';

//fake slow server
const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
};

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) {
        config.headers!.Authorization = `Bearer ${token}`;        
    }
    return config;
})

axios.interceptors.response.use(async response => {
    if (process.env.NODE_ENV === 'development') await sleep(1000);

    const pagination = response.headers["pagination"];
    if (pagination) {
        response.data = new PaginatedResults(response.data, JSON.parse(pagination));
        return response as AxiosResponse<PaginatedResults<any>>;
    }

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

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const User = {
    current: (): Promise<IUser> => requests.get('/user'),
    login: (user: IUserFormValues): Promise<IUser> => requests.post(`/user/login`, user),
    register: (user: IUserFormValues): Promise<IUser> => requests.post(`/user/register`, user)
  };

const WorryItems = {
    list: (params: URLSearchParams) => axios.get<PaginatedResults<IWorryItem[]>>('/my-worry-items', {params})
        .then(responseBody),
    details: (id: string) => requests.get<IWorryItem>(`/my-worry-items/${id}`),
    create: (worryItem: IWorryItem) => requests.post<void>('/my-worry-items', worryItem),
    update: (worryItem: IWorryItem) => requests.put<void>(`/my-worry-items/${worryItem.id}`, worryItem),
    delete: (id: string) => requests.del<void>(`/my-worry-items/${id}`),
    complete: (id: string) => requests.post<void>(`/my-worry-items/${id}/complete`, {}),
};

const agent = {
    WorryItems,
    User,
};

export default agent;