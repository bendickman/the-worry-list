import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Calendar } from "react-calendar";
import { Header, Menu } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function WorryItemListFilters() {
    const { worryItemStore: { predicate, setPredicate, getPredicate } } = useStore();
    return (
        <Fragment>
            <Menu size={'large'} vertical style={{ width: '100%', marginTop: '2rem' }}>
                <Header icon={'filter'} attached color={'blue'} content={'filters'} />
                <Menu.Item
                    content={'All Worry Items'}
                    active={predicate.has('all')}
                    onClick={() => setPredicate('all', 'true')} />
                <Menu.Item content={'Completed'}
                    active={predicate.get('IsComplete') === 'true'}
                    onClick={() => setPredicate('isComplete', 'true')} />
                <Menu.Item content={'Not Complete'}
                    active={predicate.get('IsComplete') === 'false'}
                    onClick={() => setPredicate('isComplete', 'false')} />
            </Menu>
            <Header />
            <Calendar onChange={(date: Date) => setPredicate('startDate', date)} />
        </Fragment>
    )
})