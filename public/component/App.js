import '../css/reset.css';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {jsonServerRestClient, Admin, Resource} from 'admin-on-rest';
import { Delete } from 'admin-on-rest/lib/mui';
import {SanPhamList, SanPhamCreate, SanPhamEdit} from './SanPham';
import {KhachHangList, KhachHangCreate, KhachHangEdit} from './KhachHang';
import {NhapHangList, NhapHangCreate, NhapHangEdit} from './NhapHang';
import config from '../../server/config/config';

const Test = () => <span>&lt;Resource&gt; elements are for configuration only and should not be rendered</span>;

ReactDOM.render(
    <Admin title="Tên Công Ty" restClient={jsonServerRestClient(config.url + '/api')}>
        <Resource name="sanphams" list={SanPhamList} edit={SanPhamEdit} create={SanPhamCreate} remove={Delete} options={{label: "Sản Phẩm"}}/>
        <Resource name="khachhangs" list={KhachHangList} edit={KhachHangEdit} create={KhachHangCreate} remove={Delete} options={{label: "Khách Hàng"}}/>
        <Resource name="sanphamnhaps" list={NhapHangList} edit={NhapHangEdit} create={NhapHangCreate} remove={Delete} options={{label: "Nhập Hàng"}}/>
    </Admin>
    ,
    document.getElementsByClassName('container')[0]
);