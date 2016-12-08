import React from 'react';
import {List, Datagrid} from 'admin-on-rest/lib/mui/list';
import {Edit, Create} from 'admin-on-rest/lib/mui/detail';
import {TextField, LongTextInput, ChipField} from 'admin-on-rest/lib/mui/field';
import {DisabledInput, TextInput} from 'admin-on-rest/lib/mui/input';
import {EditButton} from 'admin-on-rest/lib/mui/button';
import {GridStyle} from '../style/default';

const MA_SP = {source:"maSP", label: "Mã"};
const TEN = {source:"ten", label: "Tên"};
const QUY_CACH = {source:"quyCach", label: "Quy Cách"};
const DON_VI = {source:"donVi", label: "Đơn Vị"};
const DON_GIA = {source:"donGia", label: "Đơn Giá"};
const NHOM = {source:"nhom", label: "Nhóm"};

export const SanPhamList = (props) => (
    <List {...props} title="Danh sách">
        <Datagrid>
            <TextField {...MA_SP} style={GridStyle}/>
            <TextField {...TEN} style={GridStyle}/>
            <TextField {...QUY_CACH} style={GridStyle}/>
            <TextField {...DON_VI} style={GridStyle}/>
            <TextField {...DON_GIA} style={GridStyle}/>
            <ChipField {...NHOM} style={GridStyle}/>
            <EditButton />
        </Datagrid>
    </List>
);

export const SanPhamEdit = (props) => (
    <Edit {...props} title="Cập nhật sản phẩm">
        <TextInput {...MA_SP}/>
        <LongTextInput {...TEN}/>
        <TextInput {...QUY_CACH}/>
        <TextInput {...DON_VI} />
        <TextInput {...DON_GIA} />
        <TextInput {...NHOM} />
    </Edit>
);

export const SanPhamCreate = (props) => (
    <Create {...props} title="Tạo mới">
        <TextInput {...MA_SP}/>
        <LongTextInput {...TEN}/>
        <TextInput {...QUY_CACH}/>
        <TextInput {...DON_VI} />
        <TextInput {...DON_GIA} />
        <TextInput {...NHOM} />
    </Create>
);