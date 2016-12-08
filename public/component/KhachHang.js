
import React from 'react';
import {List, Datagrid} from 'admin-on-rest/lib/mui/list';
import {Edit, Create} from 'admin-on-rest/lib/mui/detail';
import {TextField } from 'admin-on-rest/lib/mui/field';
import {DisabledInput, LongTextInput, TextInput} from 'admin-on-rest/lib/mui/input';
import {EditButton} from 'admin-on-rest/lib/mui/button';
import {GridStyle} from '../style/default';

const TEN = {source:"ten", label: "Tên"};
const DIA_CHI = {source:"diaChi", label: "Địa Chỉ"};
const SO_DIEN_THOAI = {source:"soDienThoai", label: "Số Điện Thoại"};

export const KhachHangList = (props) => (
    <List {...props} title="Danh Sách">
        <Datagrid>
            <TextField {...TEN} style={GridStyle}/>
            <TextField {...DIA_CHI} style={GridStyle}/>
            <TextField {...SO_DIEN_THOAI} style={GridStyle}/>
            <EditButton />
        </Datagrid>
    </List>
);

export const KhachHangEdit = (props) => (
    <Edit {...props} title="Cập nhật khách hàng">
        <TextInput {...TEN}/>
        <TextInput {...DIA_CHI}/>
        <TextInput {...SO_DIEN_THOAI} />
    </Edit>
);

export const KhachHangCreate = (props) => (
    <Create {...props} title="Tạo mới">
        <LongTextInput {...TEN}/>
        <TextInput {...DIA_CHI}/>
        <TextInput {...SO_DIEN_THOAI} />
    </Create>
);