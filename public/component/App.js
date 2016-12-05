import '../css/reset.css';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {jsonServerRestClient, Admin, Resource} from 'admin-on-rest';
import {SanPhamList, SanPhamCreate, SanPhamEdit} from './SanPham';

const Test = () => <span>&lt;Resource&gt; elements are for configuration only and should not be rendered</span>;

ReactDOM.render(
    <Admin title="Tên Công Ty" restClient={jsonServerRestClient('http://localhost:3000/api')}>
        <Resource name="sanphams" list={SanPhamList} edit={SanPhamEdit} create={SanPhamCreate} options={{label: "Sản Phẩm"}}/>
            
    </Admin>
    ,   
    document.getElementsByClassName('container')[0]
);