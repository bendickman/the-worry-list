import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { WorryItem } from '../../../app/layout/models/worryItem';
import WorryItemDetails from '../details/WorryItemDetails';
import WorryItemList from './WorryItemList';
import WorryItemForm from '../form/WorryItemForm';

interface Props {
    worryItems: WorryItem[];
}

export default function WorryItemDashboard({worryItems}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <WorryItemList worryItems={worryItems} />
            </Grid.Column>
            <Grid.Column width='6'>
                <WorryItemDetails worryItem={worryItems[3]} />
                <WorryItemForm></WorryItemForm>
            </Grid.Column>

        </Grid>
    )
}