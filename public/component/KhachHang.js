import React from 'react';
import {SimpleForm} from 'admin-on-rest/lib/mui/form';
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

const KhachHangFilter = (props) => (
    <Filter {...props}>
        <TextInput {...TEN}/>
        <TextInput {...DIA_CHI}/>
        <TextInput {...SO_DIEN_THOAI} />
    </Filter>
);

export const KhachHangList = (props) => (
    <List {...props} title={TITLE} filter={<KhachHangFilter/>}>
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
        <SimpleForm>
            <TextInput {...TEN}/>
            <LongTextInput {...DIA_CHI}/>
            <TextInput {...SO_DIEN_THOAI} />
        </SimpleForm>
    </Edit>
);

export const KhachHangCreate = (props) => (
    <Create {...props} title="Tạo mới">
        <SimpleForm>
            <TextInput {...TEN}/>
            <LongTextInput {...DIA_CHI}/>
            <TextInput {...SO_DIEN_THOAI} />
        </SimpleForm>
    </Create>
);