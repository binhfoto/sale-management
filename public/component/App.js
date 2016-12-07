import '../css/reset.css';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {jsonServerRestClient, Admin, Resource} from 'admin-on-rest';
<<<<<<< HEAD
import { Delete } from 'admin-on-rest/lib/mui';
import {SanPhamList, SanPhamCreate, SanPhamEdit} from './SanPham';
import {Dashboard} from './Dashboard';
=======
import {SanPhamList, SanPhamCreate, SanPhamEdit} from './SanPham';
>>>>>>> 86b2ae211f888463bfb8021e35499b6b10edb998

const Test = () => <span>&lt;Resource&gt; elements are for configuration only and should not be rendered</span>;

ReactDOM.render(
<<<<<<< HEAD
    <Admin title="Tên Công Ty" dashboard={Dashboard} restClient={jsonServerRestClient('http://localhost:3000/api')}>
        <Resource name="sanphams" list={SanPhamList} edit={SanPhamEdit} create={SanPhamCreate} remove={Delete} options={{label: "Sản Phẩm"}}/>
=======
    <Admin title="Tên Công Ty" restClient={jsonServerRestClient('http://localhost:3000/api')}>
        <Resource name="sanphams" list={SanPhamList} edit={SanPhamEdit} create={SanPhamCreate} options={{label: "Sản Phẩm"}}/>
>>>>>>> 86b2ae211f888463bfb8021e35499b6b10edb998
            
    </Admin>
    ,   
    document.getElementsByClassName('container')[0]
);