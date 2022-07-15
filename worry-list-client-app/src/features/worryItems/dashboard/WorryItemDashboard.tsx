import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { WorryItem } from '../../../app/layout/models/worryItem';
import WorryItemDetails from '../details/WorryItemDetails';
import WorryItemList from './WorryItemList';
import WorryItemForm from '../form/WorryItemForm';

interface Props {
    worryItems: WorryItem[];
    selectedWorryItem: WorryItem | undefined;
    selectWorryItem: (id: string) => void;
    cancelSelectWorryItem: () => void;
}

export default function WorryItemDashboard(
    {worryItems, selectedWorryItem, selectWorryItem, cancelSelectWorryItem}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <WorryItemList worryItems={worryItems} selectWorryItem={selectWorryItem} />
            </Grid.Column>
            <Grid.Column width='6'>
                {
                    selectedWorryItem &&
                    <WorryItemDetails worryItem={selectedWorryItem} cancelSelectWorryItem={cancelSelectWorryItem} />
                }
                <WorryItemForm></WorryItemForm>
            </Grid.Column>

        </Grid>
    )
}