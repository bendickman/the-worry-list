import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Pagination, PagingParams } from "../models/pagination";
import { IWorryItem } from "../models/worryItem";

export default class WorryItemStore {
    worryItemsRegistry = new Map<string, IWorryItem>();
    selectedWorryItem: IWorryItem | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();
    predicate = new Map().set('all', true);

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.predicate.keys(),
            () => {
                this.pagingParams = new PagingParams();
                this.worryItemsRegistry.clear();
                this.loadWorryItems();
            }
        )
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        this.predicate.forEach((value, key) => {
            if (key === 'startDate') {
                params.append('startDate', (value as Date).toISOString());
            } else {
                params.append(key, value);
            }
        })

        return params;
    }

    get worryItemsByCreatedDate() {
        return Array.from(this.worryItemsRegistry.values()).sort((a, b) =>
            new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        );
    }

    get groupedWorryItems() {
        return Object.entries(
            this.worryItemsByCreatedDate.reduce((worryItems, worryItem) => {
                const date = new Date(worryItem.createdDate).toDateString();
                worryItems[date] = worryItems[date] ? [...worryItems[date], worryItem] : [worryItem];
                return worryItems;
            }, {} as { [key: string]: IWorryItem[] })
        )
    }

    loadWorryItems = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.WorryItems.list(this.axiosParams);
            result.data.forEach(worryItem => {
                this.setWorryItem(worryItem);
            })
            this.setPagination(result.pagination);
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    getPredicate = (key: string): string => {
        this.predicate.forEach((value, key) => {
            console.log(key + ': ' + value);
        })

        if (this.predicate.has(key)) {
            console.log('value: ' + this.predicate.get(key));
            return this.predicate.get(key);
        }

        return '';
    }

    setPredicate = (predicate: string, value: string | Date) => {
        const resetPredicate = () => {
            this.predicate.forEach((value, key) => {
                if (key !== 'startDate') this.predicate.delete(key);
            })
        }
        switch (predicate) {
            case 'all':
                resetPredicate();
                break;
            case 'isComplete':
                resetPredicate();
                this.predicate.set('IsComplete', value);
                break;
            case 'startDate':
                this.predicate.delete('startDate');
                this.predicate.set('startDate', value);
                break;
        }
    }

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
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

    createWorryItem = async (worryItem: IWorryItem) => {
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

    updateWorryItem = async (worryItem: IWorryItem) => {
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

    completeWorryItemToggle = async () => {
        this.setLoading(true);
        try {
            agent.WorryItems.complete(this.selectedWorryItem!.id);
            runInAction(() => {
                this.selectedWorryItem!.isComplete = !this.selectedWorryItem?.isComplete;
                this.worryItemsRegistry.set(this.selectedWorryItem!.id, this.selectedWorryItem!);
            })
        } catch (error) {
            console.log(error);
        } finally {
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

    private setWorryItem = (worryItem: IWorryItem) => {
        //TODO - ensure the createdDate is set correctly, this logic should be removed
        //if (worryItem.createdDate) {
        //mutating state is mobx is allowed, not in Redux
        this.worryItemsRegistry.set(worryItem.id, worryItem);
        //}
    }
}