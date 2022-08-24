import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import WorryItemStore from "./worryItemStore";

interface Store {
    worryItemStore: WorryItemStore;
    commonStore: CommonStore;
};

export const store: Store = {
    worryItemStore: new WorryItemStore(),
    commonStore: new CommonStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}