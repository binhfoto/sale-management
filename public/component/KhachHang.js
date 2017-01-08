import React from 'react';
import {List, Filter, Datagrid} from 'admin-on-rest/lib/mui/list';
import {Create, Edit} from 'admin-on-rest/lib/mui/detail';
import {TextField } from 'admin-on-rest/lib/mui/field';
import {DisabledInput, LongTextInput, TextInput} from 'admin-on-rest/lib/mui/input';
import {EditButton} from 'admin-on-rest/lib/mui/button';

import {FieldStyle} from '../style/default';

const TITLE = "Danh Sách Khách Hàng";
const TEN = {source:"ten", label: "Tên"};
const DIA_CHI = {source:"diaChi", label: "Địa Chỉ"};
const SO_DIEN_THOAI = {source:"soDienThoai", label: "Số Điện Thoại"};

export const KhachHangList = (props) => (
    <List {...props} title={TITLE}>
        <Datagrid>
            <TextField {...TEN} style={FieldStyle}/>
            <TextField {...DIA_CHI} style={FieldStyle}/>
            <TextField {...SO_DIEN_THOAI} style={FieldStyle}/>
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