import React, {Component} from 'react';

const Dashboard = ({title, name, route}) => {
    return(
        <div>
            <span>{title}</span>
            {route.rows}
        </div>
    )
}

export default Dashboard;