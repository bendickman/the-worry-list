import React from 'react'
import { Segment, List, Label, Item, Image, ItemMeta } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { IWorryItem } from '../../../app/models/worryItem';

interface Props {
    worryItem: IWorryItem;
}

export default observer(function WorryItemDetailsSidebar ({worryItem}: Props) {
    return (
        <>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='blue'
            >
                My Actions
            </Segment>
            <Segment attached>
                <Item>
                    <Item.Content>
                        {worryItem.actions}
                    </Item.Content>
                </Item>
            </Segment>

            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='green'
            >
                Postive Response
            </Segment>
            <Segment attached>
                <Item>
                    <Item.Content>
                        {worryItem.positiveResponse}
                    </Item.Content>
                </Item>
            </Segment>
        </>

    )
})