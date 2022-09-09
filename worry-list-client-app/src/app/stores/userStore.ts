import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { IUser, IUserFormValues } from "../layout/models/user";
import { store } from "./store";

export default class UserStore {
    user: IUser | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (credentials: IUserFormValues) => {
        try {
            const user = await agent.User.login(credentials);
            store.commonStore.setToken(user.token);
            runInAction(() => {this.user = user});
            history.push('/my-worry-list');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    register = async (credentials: IUserFormValues) => {
        try {
            const user = await agent.User.register(credentials);
            store.commonStore.setToken(user.token);
            runInAction(() => {this.user = user});
            history.push('/my-worry-list');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        history.push('/');
    }

    getUser = async () => {
        try {
            const user = await agent.User.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }
}