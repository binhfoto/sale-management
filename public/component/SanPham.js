import React from 'react';
import {SimpleForm} from 'admin-on-rest/lib/mui/form';
import {List, Filter, Datagrid} from 'admin-on-rest/lib/mui/list';
import {Create, Edit} from 'admin-on-rest/lib/mui/detail';
import {TextField, ChipField, NumberField} from 'admin-on-rest/lib/mui/field';
import {DisabledInput, TextInput, NumberInput, SelectInput, ReferenceInput} from 'admin-on-rest/lib/mui/input';
import {EditButton, DeleteButton} from 'admin-on-rest/lib/mui/button';

import {FieldStyle} from '../style/default';

const TITLE = 'Danh Sách Sản Phẩm';
const MA_SP = {source:'maSP', label: 'Mã'};
const TEN = {source:'ten', label: 'Tên'};
const DON_GIA = {source:'donGia', label: 'Đơn Giá', options: { type: 'number' }};
const QUY_CACH = {source:'quyCach', label: 'Quy Cách'};
const DON_VI = {source:'donVi', label: 'Đơn Vị'};
const NHOM = {source:'nhom', label: 'Nhóm'};


/*const LUA_CHON_QUY_CACH = [
    {ten: 'Thùng/250'},
    {ten: 'Thùng/50'},
    {ten: 'Thùng/100'},
    {ten: 'Thùng/200'},
    {ten: 'Bình'},
    {ten: '1kg/Bịch'}
];

const LUA_CHON_DON_VI = [
    {ten: 'Chai'},
    {ten: 'Lít'},
    {ten: 'Type/12'},
    {ten: 'Gói'},
    {ten: 'Kg'}
];

const LUA_CHON_NHOM = [
    {ten: 'Thuốc Dùng Ngoài'},
    {ten: 'Thuốc Đông Dược'},
    {ten: 'Thuốc Ngọc Liên'},
    {ten: 'Thuốc Khác'}
];*/
/*
Full text search
    <TextInput label='Tìm kiếm' source='q' alwaysOn />
    <SelectInput optionText='nhom' />
*/
const SanPhamFilter = (props) => (
    <Filter {...props}>
        <TextInput {...MA_SP}/>
        <TextInput {...TEN}/>
        <TextInput {...QUY_CACH}/>
        <TextInput {...DON_VI}/>
        <NumberInput {...DON_GIA}/>
        <TextInput {...NHOM}/>
    </Filter>
);

/* <List perPage={20}> */
export const SanPhamList = (props) => (
    <List {...props} title={TITLE} filter={<SanPhamFilter/>}>
        <Datagrid>
            <TextField {...MA_SP} style={FieldStyle}/>
            <TextField {...TEN} style={FieldStyle}/>
            <TextField {...QUY_CACH} style={FieldStyle}/>
            <TextField {...DON_VI} style={FieldStyle}/>
            <NumberField {...DON_GIA} style={FieldStyle}/>
            <ChipField {...NHOM} style={FieldStyle}/>
            <EditButton />
            <DeleteButton/>
        </Datagrid>
    </List>
);

export const SanPhamEdit = (props) => (
    <Edit title={TITLE} {...props}>
        <SimpleForm>
            <TextInput {...MA_SP}/>
            <TextInput {...TEN}/>
            <TextInput {...QUY_CACH}/>
            <TextInput {...DON_VI}/>
            <NumberInput {...DON_GIA}/>
            <TextInput {...NHOM}/>
        </SimpleForm>
    </Edit>
);

export const SanPhamCreate = (props) => (
    <Create title={TITLE} {...props}>
        <SimpleForm>
            <TextInput {...MA_SP}/>
            <TextInput {...TEN}/>
            <TextInput {...QUY_CACH}/>
            <TextInput {...DON_VI}/>
            <NumberInput {...DON_GIA}/>
            <TextInput {...NHOM}/>
        </SimpleForm>
    </Create>
);