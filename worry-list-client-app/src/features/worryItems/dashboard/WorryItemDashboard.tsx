import React from 'react';
import { Grid } from 'semantic-ui-react';
import { WorryItem } from '../../../app/layout/models/worryItem';
import WorryItemDetails from '../details/WorryItemDetails';
import WorryItemList from './WorryItemList';
import WorryItemForm from '../form/WorryItemForm';

interface Props {
    worryItems: WorryItem[];
    selectedWorryItem: WorryItem | undefined;
    selectWorryItem: (id: string) => void;
    cancelSelectWorryItem: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    upsertWorryItem: (worryItem: WorryItem) => void;
    deleteWorryItem: (id: string) => void;
    submitting: boolean;
}

export default function WorryItemDashboard(
    {worryItems, selectedWorryItem, selectWorryItem, 
        cancelSelectWorryItem, editMode, openForm, 
        closeForm, upsertWorryItem, deleteWorryItem,
        submitting}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <WorryItemList 
                worryItems={worryItems} 
                selectWorryItem={selectWorryItem}
                deleteWorryItem={deleteWorryItem}
                submitting={submitting} />
            </Grid.Column>
            <Grid.Column width='6'>
                {
                    selectedWorryItem &&
                    !editMode && 
                    <WorryItemDetails 
                    worryItem={selectedWorryItem} 
                    cancelSelectWorryItem={cancelSelectWorryItem}
                    openForm={openForm}
                    />
                }
                {
                    editMode &&
                    <WorryItemForm 
                    closeForm={closeForm} 
                    worryItem={selectedWorryItem} 
                    upsertWorryItem={upsertWorryItem}
                    submitting={submitting}></WorryItemForm>
                }
            </Grid.Column>

        </Grid>
    )
}