import React, { Fragment } from 'react';
import { Segment, Button, Placeholder } from 'semantic-ui-react';

export default function WorryItemListItemPlaceholder() {
    return (
        <Fragment>
            <Placeholder fluid style={{ marginTop: 30 }}>
                <Segment.Group>
                    <Segment style={{ minHeight: 110 }}>
                        <Placeholder>
                            <Placeholder.Header>
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Header>
                            <Placeholder.Paragraph>
                                <Placeholder.Line />
                            </Placeholder.Paragraph>
                        </Placeholder>
                    </Segment>
                    <Segment clearing>
                        <Placeholder>
                            <Placeholder.Paragraph>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Paragraph>
                        </Placeholder>
                    </Segment>
                </Segment.Group>
            </Placeholder>
        </Fragment>
    );
};
