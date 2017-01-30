import React from 'react';
import moment from 'moment';
import {SimpleForm} from 'admin-on-rest/lib/mui/form';
import {List, Filter, Datagrid} from 'admin-on-rest/lib/mui/list';
import {Create, Edit} from 'admin-on-rest/lib/mui/detail';
import {TextField, NumberField, ReferenceField, FunctionField} from 'admin-on-rest/lib/mui/field';
import {DisabledInput, TextInput, NumberInput, SelectInput, ReferenceInput} from 'admin-on-rest/lib/mui/input';
import {EditButton} from 'admin-on-rest/lib/mui/button';

import {FieldStyle} from '../style/default';

const TITLE = "Danh Sách Đơn Hàng Chi Tiết";
const MA_DH = {source:"maDH", label: "Mã Đơn Hàng"};
const MA_SP = {source:"maSP.maSP", label: "Mã Sản Phẩm"};
const TEN_SP = {source:"maSP.ten", label: "Tên Sản Phẩm"};
const GIA_SP = {source:"maSP.donGia", label: "Giá Sản Phẩm"};
const SO_LUONG_XUAT = {source:"soLuongXuat", label: "Số Lượng Xuất"};
const XUAT_XU_LY = {source:"xuatXuLy", label: "Xuất Xử Lý"};
const THANH_TIEN = {source:"thanhTien", label: "Thành Tiền"};
const CHIET_KHAU = {
    label: "Chiết Khấu",
    render: (record) => {
        return record.chietKhau + '%';
    }
};

const defaultSort = {
    field: "maDH",
    order: "ASC"
};

const defaultFilter = {
    // HD0000/29/1/2017
    maDH: "HD0000/" + moment().format('DD/M/YYYY').toString()
};

const DonHangChiTietFilter = (props) => (
    <Filter {...props} filterValues={defaultFilter}>
        <TextInput {...MA_DH} style={FieldStyle} alwaysOn/>
    </Filter>
);

/*<ReferenceField label="Mã Sản Phẩm" source="maSP" reference="sanphams">
                <TextField source="maSP" style={FieldStyle}/>
            </ReferenceField>*/

export const DonHangChiTietList = (props) => (
    <List {...props} defaultSort={defaultSort} filter={<DonHangChiTietFilter/>} title={TITLE}>
        <Datagrid>
            <TextField {...MA_DH} style={FieldStyle}/>
            <TextField {...MA_SP} style={FieldStyle}/>
            <TextField {...TEN_SP} style={FieldStyle}/>
            <NumberField {...GIA_SP} style={FieldStyle}/>
            <NumberField {...SO_LUONG_XUAT} style={FieldStyle}/>
            <NumberField {...XUAT_XU_LY} style={FieldStyle}/>
            <FunctionField {...CHIET_KHAU} style={FieldStyle}/>
            <NumberField {...THANH_TIEN} style={FieldStyle}/>
            <EditButton />
        </Datagrid>
    </List>
);
