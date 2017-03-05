import React from 'react';
import { Tabs , Tab } from 'material-ui/Tabs';
import { Link } from 'react-router';
import {SubFlex} from '../../../style/default';

const ReportLayout = ({children, route}) => {

    let tabs = Array.isArray(route.dashboards) && 
                <Tabs>
                    {React.Children.map(route.dashboards, (dashboard) => {
                            return (
                                <Tab key={dashboard.props.name} 
                                    id={dashboard.props.name} 
                                    label={dashboard.props.title} 
                                    containerElement={<Link to={`report/dashboard/${dashboard.props.name}`}/>}/>
                            );
                        }
                    )}
                </Tabs>

    return (
        <div style={SubFlex}>
            {tabs}
            {children}
        </div>
    )
};

export default ReportLayout;