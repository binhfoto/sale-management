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
 * NhapHang is for 'sanphamnhap' table
 */

const SO_LUONG_NHAP = {source:"soLuongNhap", label: "Số Lượng"};
const MA_PHIEU_NHAP = {source:"maPhieuNhap", label: "Mã Phiếu"};
const NGAY_NHAP = {source:"ngayNhap", label: "Ngày Nhập"};

export const NhapHangList = (props) => (
    <List {...props} title="Danh sách">
        <Datagrid>
            <ReferenceField label="Sản Phẩm" source="maSP" reference="sanphams">
                <TextField source="ten"  style={GridStyle}/>
            </ReferenceField>
            <TextField {...SO_LUONG_NHAP} style={GridStyle}/>
            <TextField {...MA_PHIEU_NHAP} style={GridStyle}/>
            <DateField {...NGAY_NHAP} style={GridStyle}/>
            <EditButton />
        </Datagrid>
    </List>
);

export const NhapHangEdit = (props) => (
    <Edit {...props} title="Cập nhật">
        <ReferenceInput label="Sản Phẩm" source="maSP" reference="sanphams">
            <SelectInput optionText="ten" />
        </ReferenceInput>
        <TextInput {...SO_LUONG_NHAP} />
        <TextInput {...MA_PHIEU_NHAP} />
        <DateInput {...NGAY_NHAP} />
    </Edit>
);

export const NhapHangCreate = (props) => (
    <Create {...props} title="Tạo mới">
        <ReferenceInput label="Sản Phẩm" source="maSP" reference="sanphams" allowEmpty>
            <SelectInput optionText="ten"/>
        </ReferenceInput>
        <TextInput {...SO_LUONG_NHAP} />
        <TextInput {...MA_PHIEU_NHAP} />
        <DateInput {...NGAY_NHAP} />
    </Create>
);