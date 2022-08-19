import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import WorryItemList from './WorryItemList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoaderComponent from '../../../app/layout/LoaderComponent';
import WorryItemListFilters from './WorryItemsListFilters';

export default observer(function WorryItemDashboard() {
    const {worryItemStore} = useStore();
    const {loadWorryItems, worryItemsRegistry} = worryItemStore;

    useEffect(() => {
        if (worryItemsRegistry.size <= 1) loadWorryItems(); 
    }, [worryItemsRegistry.size, loadWorryItems]);

    if (worryItemStore.loadingInitial) return <LoaderComponent content='Loading app...' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <WorryItemList />
            </Grid.Column>
            <Grid.Column width='6'>
                <WorryItemListFilters />
            </Grid.Column>
        </Grid>
    )
})