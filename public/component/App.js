import '../css/reset.css';

//import 'whatwg-fetch';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import SanPhamIcon from 'material-ui/svg-icons/places/kitchen';
import KhachHangIcon from 'material-ui/svg-icons/social/person-outline';
import KhoHangIcon from 'material-ui/svg-icons/action/store';
import HangNhapIcon from 'material-ui/svg-icons/action/system-update-alt';
import HangTonIcon from 'material-ui/svg-icons/action/tab';

import withProps from 'admin-on-rest/lib/withProps';
import {Resource} from 'admin-on-rest/lib';
import {Delete} from 'admin-on-rest/lib/mui';

import {SanPhamList, SanPhamCreate, SanPhamEdit} from './SanPham';
import {KhachHangList, KhachHangCreate, KhachHangEdit} from './KhachHang';
import {NhapHangList, NhapHangCreate, NhapHangEdit} from './NhapHang';
import {KhoHangList, KhoHangCreate, KhoHangEdit} from './KhoHang';

import Layout from './Layout/Layout';
import Admin from './Layout/Admin';

import config from '../../server/config/config';

ReactDOM.render(
    <Admin appLayout={Layout}>
        <Resource icon={SanPhamIcon} name="sanphams" list={SanPhamList} edit={SanPhamEdit} create={SanPhamCreate} remove={Delete} options={{label: "Sản Phẩm"}}/>
        <Resource icon={KhachHangIcon} name="khachhangs" list={KhachHangList} edit={KhachHangEdit} create={KhachHangCreate} remove={Delete} options={{label: "Khách Hàng"}}/>
        <Resource icon={KhoHangIcon} name="wrapper_kho_hang" options={{label: "Kho Hàng"}}>
            <Resource icon={HangNhapIcon} name="sanphamnhaps" list={NhapHangList} edit={NhapHangEdit} create={NhapHangCreate} remove={Delete} options={{label: "Hàng Nhập"}}/>
            <Resource icon={HangTonIcon} name="sanphamtonkhos" list={KhoHangList} edit={KhoHangEdit} remove={Delete} options={{label: "Hàng Tồn"}}/>
        </Resource>
    </Admin>
    ,
    document.getElementsByClassName('container')[0]
);