import React, {Component} from 'react';

const Dashboard = ({title, name, route}) => {
    return(
        <div className="dashboard-fill-height">
            {route.rows}
        </div>
    )
}

export default Dashboard;