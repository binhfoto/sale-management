import React from 'react';
import {Datagrid} from 'admin-on-rest/lib/mui/list';
import {TextField } from 'admin-on-rest/lib/mui/field';
import {DisabledInput, LongTextInput, TextInput} from 'admin-on-rest/lib/mui/input';
import {EditButton} from 'admin-on-rest/lib/mui/button';
// customize
import List from '../admin-on-rest/mui/list/List';
import Edit from '../admin-on-rest/mui/detail/Edit';
import Create from '../admin-on-rest/mui/detail/Create';

import {FieldStyle} from '../style/default';

const TEN = {source:"ten", label: "Tên"};
const DIA_CHI = {source:"diaChi", label: "Địa Chỉ"};
const SO_DIEN_THOAI = {source:"soDienThoai", label: "Số Điện Thoại"};

export const KhachHangList = (props) => (
    <List {...props} title="Danh Sách">
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