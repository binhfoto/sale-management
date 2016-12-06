import '../css/reset.css';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {jsonServerRestClient, Admin, Resource} from 'admin-on-rest';
import { Delete } from 'admin-on-rest/lib/mui';
import {SanPhamList, SanPhamCreate, SanPhamEdit} from './SanPham';
import {Dashboard} from './Dashboard';

const Test = () => <span>&lt;Resource&gt; elements are for configuration only and should not be rendered</span>;

ReactDOM.render(
    <Admin title="Tên Công Ty" dashboard={Dashboard} restClient={jsonServerRestClient('http://localhost:3000/api')}>
        <Resource name="sanphams" list={SanPhamList} edit={SanPhamEdit} create={SanPhamCreate} remove={Delete} options={{label: "Sản Phẩm"}}/>
            
    </Admin>
    ,   
    document.getElementsByClassName('container')[0]
);