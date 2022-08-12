import React from 'react';
import { Grid } from 'semantic-ui-react';
import WorryItemDetails from '../details/WorryItemDetails';
import WorryItemList from './WorryItemList';
import WorryItemForm from '../form/WorryItemForm';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';


export default observer(function WorryItemDashboard() {
    const {worryItemStore} = useStore();
    const {selectedWorryItem, editMode} = worryItemStore;
    return (
        <Grid>
            <Grid.Column width='10'>
                <WorryItemList />
            </Grid.Column>
            <Grid.Column width='6'>
                {
                    selectedWorryItem && !editMode && 
                    <WorryItemDetails />
                }
                {
                    editMode &&
                    <WorryItemForm />
                }
            </Grid.Column>
        </Grid>
    )
})