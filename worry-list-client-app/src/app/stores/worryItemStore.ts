import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { WorryItem } from "../layout/models/worryItem";

export default class WorryItemStore {
    worryItemsRegistry = new Map<string, WorryItem>();
    selectedWorryItem: WorryItem | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    get worryItemsByCreatedDate() {
        return Array.from(this.worryItemsRegistry.values()).sort((a, b) =>
            new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        );
    }

    get groupedWorryItems() {
        return Object.entries(
            this.worryItemsByCreatedDate.reduce((worryItems, worryItem) => {
                const date =  new Date(worryItem.createdDate).toDateString();
                worryItems[date] = worryItems[date] ? [...worryItems[date], worryItem] : [worryItem];
                return worryItems;
            }, {} as {[key: string] : WorryItem[]})
        )
    }

    loadWorryItems = async () => {
        this.loadingInitial = true;
        try {
            const worryItems = await agent.WorryItems.list();
            worryItems.forEach(worryItem => {
                    this.setWorryItem(worryItem);
                })
                this.setLoadingInitial(false);
        } catch(error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    setEditMode = (state: boolean) => {
        this.editMode = state;
    }

    createWorryItem = async (worryItem: WorryItem) => {
        this.setLoading(true);

        try {
            await agent.WorryItems.create(worryItem);
            runInAction(() => {
                this.worryItemsRegistry.set(worryItem.id, worryItem);
                this.selectedWorryItem = worryItem;
                this.setEditMode(false);
                this.setLoading(false);
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoading(false);
            })
        }
    }

    updateWorryItem = async (worryItem: WorryItem) => {
        this.setLoading(true);

        try {
            await agent.WorryItems.update(worryItem);
            runInAction(() => {
                this.worryItemsRegistry.set(worryItem.id, worryItem);
                this.selectedWorryItem = worryItem;
                this.setEditMode(false);
                this.setLoading(false);
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoading(false);
            })
        }
    }

    deleteWorryItem = async (id: string) => {
        this.setLoading(true);

        try {
            await agent.WorryItems.delete(id);
            runInAction(() => {
                this.worryItemsRegistry.delete(id);
                this.setLoading(false);
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoading(false);
            })
        }
    }

    loadWorryItem = async (id: string) => {
        let worryItem = this.getWorryItem(id);

        if (worryItem) {
            this.selectedWorryItem = worryItem;
            return worryItem;
        } else {
            this.setLoadingInitial(true);
            try {
                worryItem = await agent.WorryItems.details(id);
                this.setWorryItem(worryItem);
                runInAction(() => {
                    this.selectedWorryItem = worryItem;
                })
                this.setLoadingInitial(false);
                return worryItem;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getWorryItem = (id: string) => {
        return this.worryItemsRegistry.get(id);
    }

    private setWorryItem = (worryItem: WorryItem) => {
        //TODO - ensure the createdDate is set correctly, this logic should be removed
        //if (worryItem.createdDate) {
            //mutating state is mobx is allowed, not in Redux
            this.worryItemsRegistry.set(worryItem.id, worryItem);
        //}
    }
}