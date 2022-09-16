import React, { Fragment, useEffect, useState } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import WorryItemList from './WorryItemList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import WorryItemListFilters from './WorryItemsListFilters';
import { PagingParams } from '../../../app/models/pagination';
import InfiniteScroll from 'react-infinite-scroller';
import WorryItemListItemPlaceholder from './WorryItemListPlaceholder';

export default observer(function WorryItemDashboard() {
    const { worryItemStore } = useStore();
    const { loadWorryItems, worryItemsRegistry, setPagingParams, pagination } = worryItemStore;
    const [loadingNext, setLoadingNext] = useState(false);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(+pagination!.currentPage + 1));
        loadWorryItems().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        if (worryItemsRegistry.size <= 1) loadWorryItems();
    }, [worryItemsRegistry.size, loadWorryItems]);

    return (
        <Grid>
            <Grid.Column width='10'>
                {worryItemStore.loadingInitial && !loadingNext ? (
                    <Fragment>
                        <WorryItemListItemPlaceholder />
                        <WorryItemListItemPlaceholder />
                        <WorryItemListItemPlaceholder />
                    </Fragment>
                ) : (
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={handleGetNext}
                        hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                        initialLoad={false}>
                        <WorryItemList />
                    </InfiniteScroll>
                )}
            </Grid.Column>
            <Grid.Column width='6'>
                <WorryItemListFilters />
            </Grid.Column>
            <Grid.Column width='10'>
                <Loader active={loadingNext} />
            </Grid.Column>
        </Grid>
    )
})