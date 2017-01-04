import React from 'react';
import {Datagrid} from 'admin-on-rest/lib/mui/list';
import {TextField, ChipField, ReferenceField, DateField} from 'admin-on-rest/lib/mui/field';
import {DisabledInput, LongTextInput, TextInput, DateInput, ReferenceInput, SelectInput} from 'admin-on-rest/lib/mui/input';
import {EditButton} from 'admin-on-rest/lib/mui/button';
// customize
import List from '../admin-on-rest/mui/list/List';
import Edit from '../admin-on-rest/mui/detail/Edit';
import Create from '../admin-on-rest/mui/detail/Create';

import {FieldStyle} from '../style/default';
//import {DateField} from './../adminonrest/mui/field/DateField';
//var DateField = require('../adminonrest/mui/field');

/*
 * KhoHang is for 'sanphamtonkho' table

<ReferenceField label="Đơn Vị" source="maSP" reference="sanphams">
                <TextField source="donVi"  style={FieldStyle}/>
            </ReferenceField>
            <ReferenceField label="Đơn Giá" source="maSP" reference="sanphams">
                <TextField source="donGia"  style={FieldStyle}/>
            </ReferenceField>
 

 */

const SO_LUONG = {source:"soLuong", label: "Số Lượng"};

export const KhoHangList = (props) => (
    <List {...props} title="Danh sách">
        <Datagrid>            
            <ReferenceField label="Tên" source="maSP" reference="sanphams">
                <TextField source="ten"  style={FieldStyle}/>
            </ReferenceField>          
            <TextField {...SO_LUONG} style={FieldStyle}/>
            <EditButton />
        </Datagrid>
    </List>
);

export const KhoHangEdit = (props) => (
    <Edit {...props} title="Cập nhật">
        <ReferenceInput label="Sản Phẩm" source="maSP" reference="sanphams">
            <SelectInput optionText="ten" />
        </ReferenceInput>
        <TextInput {...SO_LUONG} />
    </Edit>
);

export const KhoHangCreate = (props) => (
    <Create {...props} title="Tạo mới">
        <ReferenceInput label="Sản Phẩm" source="maSP" reference="sanphams" allowEmpty>
            <SelectInput optionText="ten"/>
        </ReferenceInput>
        <TextInput {...SO_LUONG} />
    </Create>
);
