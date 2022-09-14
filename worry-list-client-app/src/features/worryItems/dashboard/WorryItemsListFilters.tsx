import React, { Fragment } from "react";
import { Calendar } from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

export default function WorryItemListFilters() {
    return (
        <Fragment>
            <Menu size={'large'} vertical style={{ width: '100%', marginTop: '2rem' }}>
                <Header icon={'filter'} attached color={'blue'} content={'filters'} />
                    <Menu.Item content={'All Worry Items'} />
                    <Menu.Item content={'Completed'} />
                    <Menu.Item content={'Not Complete'} />
            </Menu>
            <Header />
            <Calendar />
        </Fragment>
    )
}