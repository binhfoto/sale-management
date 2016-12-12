import React from 'react';
import {List, Datagrid} from 'admin-on-rest/lib/mui/list';
import {Edit, Create} from 'admin-on-rest/lib/mui/detail';
import {TextField, ChipField, ReferenceField, DateField} from 'admin-on-rest/lib/mui/field';
import {DisabledInput, LongTextInput, TextInput, DateInput, ReferenceInput, SelectInput} from 'admin-on-rest/lib/mui/input';
import {EditButton} from 'admin-on-rest/lib/mui/button';

import {GridStyle} from '../style/default';
//import {DateField} from './../adminonrest/mui/field/DateField';
//var DateField = require('../adminonrest/mui/field');

/*
 * KhoHang is for 'sanphamtonkho' table

<ReferenceField label="Đơn Vị" source="maSP" reference="sanphams">
                <TextField source="donVi"  style={GridStyle}/>
            </ReferenceField>
            <ReferenceField label="Đơn Giá" source="maSP" reference="sanphams">
                <TextField source="donGia"  style={GridStyle}/>
            </ReferenceField>
 

 */

const SO_LUONG = {source:"soLuong", label: "Số Lượng"};

export const KhoHangList = (props) => (
    <List {...props} title="Danh sách">
        <Datagrid>            
            <ReferenceField label="Tên" source="maSP" reference="sanphams">
                <TextField source="ten"  style={GridStyle}/>
            </ReferenceField>          
            <TextField {...SO_LUONG} style={GridStyle}/>
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
