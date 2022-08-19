import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Grid, Image } from "semantic-ui-react";
import LoaderComponent from "../../../app/layout/LoaderComponent";
import { useStore } from "../../../app/stores/store";
import WorryItemDetailsInfo from "./WorryItemDetailsInfo";
import WorryItemDetailsSidebar from "./WorryItemDetailsSidebar";
import WorryItemDetailsHeader from "./WorryItemsDetailsHeader";

export default observer(function WorryItemDetails() {
    const { worryItemStore } = useStore();
    const { selectedWorryItem: worryItem, loadWorryItem, loadingInitial } = worryItemStore;

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadWorryItem(id);
    }, [id, loadWorryItem])

    if (loadingInitial || !worryItem) return <LoaderComponent />

    return (
        <Grid>
            <Grid.Column width={10}>
                <WorryItemDetailsHeader worryItem={worryItem} />
                <WorryItemDetailsInfo worryItem={worryItem} />
            </Grid.Column>
            <Grid.Column width={6}>
                <WorryItemDetailsSidebar worryItem={worryItem} />
            </Grid.Column>
        </Grid >
    )
})