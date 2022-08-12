import { createContext, useContext } from "react";
import WorryItemStore from "./worryItemStore";

interface Store {
    worryItemStore: WorryItemStore
};

export const store: Store = {
    worryItemStore: new WorryItemStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}