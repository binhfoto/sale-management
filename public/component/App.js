import '../css/reset.css';

import 'whatwg-fetch';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import withProps from 'admin-on-rest/lib/withProps';
import {jsonServerRestClient, Resource} from 'admin-on-rest';
//import {Admin} from 'admin-on-rest';
import {Delete} from 'admin-on-rest/lib/mui';

import {SanPhamList, SanPhamCreate, SanPhamEdit} from './SanPham';
import {KhachHangList, KhachHangCreate, KhachHangEdit} from './KhachHang';
import {NhapHangList, NhapHangCreate, NhapHangEdit} from './NhapHang';
import {KhoHangList, KhoHangCreate, KhoHangEdit} from './KhoHang';

import Layout from './Layout/Layout';
import Admin from './Layout/Admin';

import config from '../../server/config/config';

/*require("babel-core/register");
require("babel-polyfill");

*/
//const ADMIN_API_URL = '/api';

/*restClient={jsonServerRestClient('/api')}*/

ReactDOM.render(
    <Admin appLayout={Layout}>
        <Resource name="wrapper" options={{label: "Kho Hàng"}}>
            <Resource name="sanphamnhaps" list={NhapHangList} edit={NhapHangEdit} create={NhapHangCreate} remove={Delete} options={{label: "Hàng Nhập"}}/>
            <Resource name="sanphamtonkhos" list={KhoHangList} edit={KhoHangEdit} remove={Delete} options={{label: "Hàng Tồn"}}/>
        </Resource>
        <Resource name="sanphams" list={SanPhamList} edit={SanPhamEdit} create={SanPhamCreate} remove={Delete} options={{label: "Sản Phẩm"}}/>
        <Resource name="khachhangs" list={KhachHangList} edit={KhachHangEdit} create={KhachHangCreate} remove={Delete} options={{label: "Khách Hàng"}}/>
    </Admin>
    ,
    document.getElementsByClassName('container')[0]
);