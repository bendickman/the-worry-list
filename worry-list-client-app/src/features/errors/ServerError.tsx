import { observer } from "mobx-react-lite";
import React from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default observer(function ServerError() {
    const {commonStore} = useStore() ;

    return (
        <Container>
            <Header as={'h1'} content={'Server Error'} />
            <Header as={'h5'} sub color={'red'} content={commonStore.error?.message} />
            {commonStore.error?.stackTrace && 
                <Segment>
                    <Header as={'h4'} color={'teal'} content={'Stack Trace'} />
                    <code style={{marginTop: '10px'}}>
                        {commonStore.error.stackTrace}
                    </code>
                </Segment>
            }
        </Container>
    )
})