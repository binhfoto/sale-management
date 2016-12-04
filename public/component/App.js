import '../css/reset.css';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {jsonServerRestClient, Admin, Resource} from 'admin-on-rest';
import withProps from 'admin-on-rest/lib/withProps';

import MyLayout from './admin-on-rest/mui/layout/MyLayout';

const theme = {};
const title = "Tên công ty";
const children = () => {
    <div>TaB</div>
};

ReactDOM.render(
    <Admin appLayout={withProps({ title, theme })(MyLayout)} restClient={jsonServerRestClient('http://jsonplaceholder.typicode.com')}>
        <Resource name="noname" options={{label: "Chưa có"}}>
            <h1>abc</h1>
        </Resource>
    </Admin>
    , 
    document.getElementsByClassName('container')[0]
);