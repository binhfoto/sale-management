import React from 'react';
import moment from 'moment';
import {SimpleForm} from 'admin-on-rest/lib/mui/form';
import {List, Filter, Datagrid} from 'admin-on-rest/lib/mui/list';
import {Create, Edit} from 'admin-on-rest/lib/mui/detail';
import {TextField, NumberField, DateField} from 'admin-on-rest/lib/mui/field';
import {DisabledInput, LongTextInput, TextInput, ReferenceInput, SelectInput, AutocompleteInput, NumberInput} from 'admin-on-rest/lib/mui/input';
import {EditButton} from 'admin-on-rest/lib/mui/button';

import LocaleDateInput from '../admin-on-rest/mui/input/DateInput';

import {FieldStyle} from '../style/default';

/*
 * NhapHang is for 'sanphamnhap' table
 */

const TITLE = 'Danh Sách Nhập Hàng';
const TEN_SP = {source: 'maSP.ten', label: 'Tên'};
const DON_VI = {source: 'maSP.donVi', label: 'Đơn Vị'};
const QUY_CACH = {source: 'maSP.quyCach', label: 'Quy Cách'};
const SO_LUONG_NHAP = {source:'soLuongNhap', label: 'Số Lượng'};
const MA_PHIEU_NHAP = {source:'maPhieuNhap', label: 'Mã Phiếu'};
const NGAY_NHAP = {source:'ngayNhap', label: 'Ngày Nhập', locales: 'vi-VN', options: { locale: 'vi-VN' }}; // locales for DateField, locale for DateInput

const defaultSort = {
    field: 'maPhieuNhap',
    order: 'ASC'
};

const defaultFilter = {
    'ngayNhap': moment().second(0).minute(0).hour(0).format('YYYY-MM-DD').toString()
};

const NhapHangFilter = (props) => (
    <Filter {...props} filterValues={defaultFilter}>
        <LocaleDateInput {...NGAY_NHAP} alwaysOn/>
        <TextInput {...MA_PHIEU_NHAP} alwaysOn/>
    </Filter>
);

export const NhapHangList = (props) => (
    <List {...props} title={TITLE} filter={<NhapHangFilter/>} defaultSort={defaultSort}>
        <Datagrid>
            <TextField {...MA_PHIEU_NHAP} style={FieldStyle}/>
            <TextField {...TEN_SP} style={FieldStyle}/>
            <NumberField {...SO_LUONG_NHAP} style={FieldStyle}/>
            <TextField {...QUY_CACH} style={FieldStyle}/>
            <TextField {...DON_VI} style={FieldStyle}/>
            <DateField {...NGAY_NHAP} style={FieldStyle}/>
            <EditButton />
        </Datagrid>
    </List>
);

export const NhapHangEdit = (props) => (
    <Edit {...props} title='Cập nhật'>
        <SimpleForm>
            <TextInput {...MA_PHIEU_NHAP} />
            <ReferenceInput label='Tên' source='maSP._id' reference='sanphams' perPage={100}>
                <SelectInput optionText='ten' optionValue='_id'/>
            </ReferenceInput>
            <NumberInput {...SO_LUONG_NHAP} />
            <LocaleDateInput {...NGAY_NHAP}/>
        </SimpleForm>
    </Edit>
);

export const NhapHangCreate = (props) => (
    <Create {...props} title='Tạo mới'>
        <SimpleForm>
            <TextInput {...MA_PHIEU_NHAP} />
            <ReferenceInput label='Tên' source='maSP' reference='sanphams' allowEmpty perPage={100}>
                <SelectInput optionText='ten'/>
            </ReferenceInput>
            <NumberInput {...SO_LUONG_NHAP} />
            <LocaleDateInput {...NGAY_NHAP} defaultValue={new Date()}/>
        </SimpleForm>
    </Create>
);