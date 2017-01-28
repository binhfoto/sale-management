import React from 'react';
import {SimpleForm} from 'admin-on-rest/lib/mui/form';
import {List, Filter, Datagrid} from 'admin-on-rest/lib/mui/list';
import {Create, Edit} from 'admin-on-rest/lib/mui/detail';
import {TextField, NumberField, ReferenceField, FunctionField} from 'admin-on-rest/lib/mui/field';
import {DisabledInput, TextInput, NumberInput, SelectInput, ReferenceInput} from 'admin-on-rest/lib/mui/input';
import {EditButton} from 'admin-on-rest/lib/mui/button';

import {FieldStyle} from '../style/default';

const TITLE = "Danh Sách Đơn Hàng Chi Tiết";
const MA_DH = {source:"maDH.selfId", label: "Mã Đơn Hàng"};
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
    field: "maDH.selfId",
    order: "DESC"
};

const DonHangChiTietFilter = (props) => (
    <Filter {...props}>
        <TextInput {...MA_DH} style={FieldStyle} alwaysOn/>
    </Filter>
);

export const DonHangChiTietList = (props) => (
    <List {...props} defaultSort={defaultSort} title={TITLE} filter={<DonHangChiTietFilter/>}>
        <Datagrid>
            <TextField {...MA_DH} style={FieldStyle}/>
            <ReferenceField label="Mã Sản Phẩm" source="maSP" reference="sanphams">
                <TextField source="maSP" style={FieldStyle}/>
            </ReferenceField>
            <ReferenceField label="Tên Sản Phẩm" source="maSP" reference="sanphams">
                <TextField source="ten" style={FieldStyle}/>
            </ReferenceField>
            <ReferenceField label="Giá Sản Phẩm" source="maSP" reference="sanphams">
                <NumberField source="donGia" style={FieldStyle}/>
            </ReferenceField>
            <NumberField {...SO_LUONG_XUAT} style={FieldStyle}/>
            <NumberField {...XUAT_XU_LY} style={FieldStyle}/>
            <FunctionField {...CHIET_KHAU} style={FieldStyle}/>
            <NumberField {...THANH_TIEN} style={FieldStyle}/>
            <EditButton />
        </Datagrid>
    </List>
);
