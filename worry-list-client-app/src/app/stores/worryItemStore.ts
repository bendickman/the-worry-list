import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { WorryItem } from "../layout/models/worryItem";
import { v4 as uuid } from 'uuid';

export default class WorryItemStore {
    worryItemsRegistry = new Map<string, WorryItem>();
    selectedWorryItem: WorryItem | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this);
    }

    get worryItemsByCreatedDate() {
        //TODO - add sort logic
        return Array.from(this.worryItemsRegistry.values());
    }

    loadWorryItems = async () => {

        try {
            const worryItems = await agent.WorryItems.list();
            worryItems.forEach(worryItem => {
                if (worryItem.createdDate) {
                    //mutating state is mobx is allowed, not in Redux
                    this.worryItemsRegistry.set(worryItem.id, worryItem);
                }
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

    selectWorryItem = (id: string) => {
        this.selectedWorryItem = this.worryItemsRegistry.get(id);
    }

    cancelSelectedWorryItem = () => {
        this.selectedWorryItem = undefined;
    }

    openUpsertForm = (id?: string) => {
        id ? this.selectWorryItem(id) : this.cancelSelectedWorryItem();
        this.setEditMode(true);
    }

    closeUpsertForm = () => {
        this.setEditMode(false);
    }

    createWorryItem = async (worryItem: WorryItem) => {
        this.setLoading(true);
        worryItem.id = uuid();

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
                if (this.selectedWorryItem?.id === id) this.cancelSelectedWorryItem();
                this.setLoading(false);
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoading(false);
            })
        }
    }
}