import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";
import WorryItemStore from "./worryItemStore";

interface IStore {
    worryItemStore: WorryItemStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
};

export const store: IStore = {
    worryItemStore: new WorryItemStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}