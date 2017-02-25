import React from 'react';
import {SimpleForm} from 'admin-on-rest/lib/mui/form';
import {List, Filter, Datagrid} from 'admin-on-rest/lib/mui/list';
import {Create, Edit} from 'admin-on-rest/lib/mui/detail';
import {TextField, ReferenceField, DateField, NumberField} from 'admin-on-rest/lib/mui/field';
import {DisabledInput, NumberInput, TextInput, DateInput, ReferenceInput, SelectInput, AutocompleteInput} from 'admin-on-rest/lib/mui/input';
import {EditButton} from 'admin-on-rest/lib/mui/button';

import {FieldStyle} from '../../style/default';

/*
 * KhoHang is for 'sanphamtonkho' table
 */
const TITLE = 'Danh Sách Hàng Tồn';
const MA_SP = {source: 'maSP.maSP', label: 'Mã'};
const TEN_SP = {source: 'maSP.ten', label: 'Tên'};
const DON_VI = {source: 'maSP.donVi', label: 'Đơn Vị'};
const QUY_CACH = {source: 'maSP.quyCach', label: 'Quy Cách'};
const SO_LUONG = {source:'soLuong', label: 'Số Lượng', options: {type: 'number'}};

const KhoHangFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label='Mã' source='maSP' reference='sanphams' allowEmpty alwaysOn>
            <SelectInput optionText='maSP'/>
        </ReferenceInput>
    </Filter>
)

export const KhoHangList = (props) => (
    <List {...props} title={TITLE} filter={<KhoHangFilter/>}>
        <Datagrid>            
            <TextField {...MA_SP} style={FieldStyle}/>
            <TextField {...TEN_SP} style={FieldStyle}/>
            <NumberField {...SO_LUONG} style={FieldStyle}/>
            <TextField {...QUY_CACH} style={FieldStyle}/>
            <TextField {...DON_VI} style={FieldStyle}/>
            <EditButton />
        </Datagrid>
    </List>
);

export const KhoHangEdit = (props) => (
    <Edit {...props} title='Chỉnh Sửa'>
        <SimpleForm>
            <DisabledInput {...TEN_SP} style={FieldStyle}/>
            <NumberInput {...SO_LUONG} />
        </SimpleForm>
    </Edit>
);

export const KhoHangCreate = (props) => (
    <Create {...props} title='Tạo Mới'>
        <SimpleForm>
            <ReferenceInput label='Tên' source='maSP._id' reference='sanphams' perPage={100}>
                <SelectInput optionText='ten' optionValue='_id'/>
            </ReferenceInput>
            <NumberInput {...SO_LUONG} />
        </SimpleForm>
    </Create>
);
