import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {white, cyan500} from 'material-ui/styles/colors';

const Panel = ({className, children}) => {
    return (
        <div className="col-lg col-md col-sm">
            <div className="panel">
                <Card style={{boxShadow: 'none'}}>
                    <CardHeader
                    title="Panel"
                    style={{backgroundColor: white, borderBottom: `1px ${cyan500} solid`}} />
                    <CardText>
                        <span>Chart</span>
                    </CardText>
                </Card>
                {children}
            </div>
        </div>
    )
};

export default Panel;