import '../css/reset.css';
import '../css/table.css';

//import 'whatwg-fetch';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import SanPhamIcon from 'material-ui/svg-icons/places/kitchen';
import KhachHangIcon from 'material-ui/svg-icons/social/person-outline';
import KhoHangIcon from 'material-ui/svg-icons/action/store';
import HangNhapIcon from 'material-ui/svg-icons/action/system-update-alt';
import HangTonIcon from 'material-ui/svg-icons/action/tab';
import DonHangIcon from 'material-ui/svg-icons/action/receipt';
import DonHangListIcon from 'material-ui/svg-icons/action/list';
import DonHangDetailIcon from 'material-ui/svg-icons/image/details';

import withProps from 'admin-on-rest/lib/withProps';
import {Resource} from 'admin-on-rest/lib';
import {Delete} from 'admin-on-rest/lib/mui';

import {SanPhamList, SanPhamCreate, SanPhamEdit} from './SanPham';
import {KhachHangList, KhachHangCreate, KhachHangEdit} from './KhachHang';
import {NhapHangList, NhapHangCreate, NhapHangEdit} from './NhapHang';
import {KhoHangList, KhoHangCreate, KhoHangEdit} from './KhoHang';
import {DonHangList} from './DonHang';
import {DonHangChiTietList, DonHangChiTietEdit, DonHangChiTietCreate} from './DonHangChiTiet';

import Layout from './Layout/Layout';
import Admin from './Layout/Admin';


ReactDOM.render(
    <Admin appLayout={Layout}>
        <Resource icon={DonHangIcon} name="wrapper_don_hang" options={{label: "Đơn Hàng"}}>
            <Resource icon={DonHangDetailIcon} name="donhangchitiets" list={DonHangChiTietList} edit={DonHangChiTietEdit} create={DonHangChiTietCreate} remove={Delete} options={{label: "Chi Tiết"}}/>
            <Resource icon={DonHangListIcon} name="donhangs" list={DonHangList} remove={Delete} options={{label: "Danh Sách"}}/>
        </Resource> 
        <Resource icon={KhoHangIcon} name="wrapper_kho_hang" options={{label: "Kho Hàng"}}>
            <Resource icon={HangTonIcon} name="sanphamtonkhos" list={KhoHangList} edit={KhoHangEdit} options={{label: "Tồn Kho"}}/>
            <Resource icon={HangNhapIcon} name="sanphamnhaps" list={NhapHangList} edit={NhapHangEdit} remove={Delete} create={NhapHangCreate} options={{label: "Nhập Kho"}}/>
        </Resource>
        <Resource icon={SanPhamIcon} name="sanphams" list={SanPhamList} edit={SanPhamEdit} create={SanPhamCreate} remove={Delete} options={{label: "Sản Phẩm"}}/>
        <Resource icon={KhachHangIcon} name="khachhangs" list={KhachHangList} edit={KhachHangEdit} create={KhachHangCreate} remove={Delete} options={{label: "Khách Hàng"}}/>
    </Admin>
    ,
    document.getElementsByClassName('container')[0]
);