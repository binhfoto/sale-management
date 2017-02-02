import React from 'react';
import moment from 'moment';
import {SimpleForm} from 'admin-on-rest/lib/mui/form';
import {List, Filter, Datagrid} from 'admin-on-rest/lib/mui/list';
import {Create, Edit} from 'admin-on-rest/lib/mui/detail';
import {TextField, NumberField, ReferenceField, FunctionField} from 'admin-on-rest/lib/mui/field';
import {DisabledInput, TextInput, NumberInput, SelectInput, ReferenceInput} from 'admin-on-rest/lib/mui/input';
import {EditButton, DeleteButton} from 'admin-on-rest/lib/mui/button';

import {FieldStyle} from '../style/default';

const TITLE = 'Đơn Hàng Chi Tiết';
const MA_DH = {source:'maDH', label: 'Mã Đơn Hàng'};
const MA_SP = {source:'maSP.maSP', label: 'Mã Sản Phẩm'};
const TEN_SP = {source:'maSP.ten', label: 'Tên Sản Phẩm'};
const GIA_SP = {source:'maSP.donGia', label: 'Giá Sản Phẩm'};
const SO_LUONG_XUAT = {source:'soLuongXuat', label: 'Số Lượng Xuất'};
const THANH_TIEN = {source:'thanhTien', label: 'Thành Tiền'};
const XUAT_XU_LY = {
    source:'xuatXuLy', 
    label: 'Xuất Xử Lý',
    validation: (value, values) => {
        if(value > values.soLuongXuat){
            return ['Xuất xử lý phải nhỏ hơn Số lượng xuất'];
        }
        return [];
    }
};
const CHIET_KHAU = {
    source: 'chietKhau',
    label: 'Chiết Khấu',
    render: (record) => {
        return record.chietKhau + '%';
    },
    validation: (value, values) => {
        if(value > 100){
            return ['Chiết khấu không được lớn hơn 100'];
        }
        return [];
    }
};

const defaultSort = {
    field: 'maDH',
    order: 'DESC'
};

const filterList = {
    // HD0000/29/1/2017
    //maDH: 'HD0000/' + moment().format('DD/MM/YYYY').toString()
    maDH: moment().format('DD/MM/YYYY').toString()
};

const filterEdit = {
    ngayTaoDH: moment().second(0).minute(0).hour(0).format('YYYY-MM-DD').toString()
};

const DonHangChiTietFilter = (props) => (
    <Filter {...props} filterValues={filterList}>
        <TextInput {...MA_DH} style={FieldStyle} alwaysOn/>
    </Filter>
);

export const DonHangChiTietList = (props) => (
    <List {...props} defaultSort={defaultSort} filter={<DonHangChiTietFilter/>} title={TITLE}>
        <Datagrid>
            <TextField {...MA_DH} style={FieldStyle}/>
            <TextField {...MA_SP} style={FieldStyle}/>
            <TextField {...TEN_SP} style={FieldStyle}/>
            <NumberField {...GIA_SP} style={FieldStyle}/>
            <NumberField {...SO_LUONG_XUAT} style={FieldStyle}/>
            <NumberField {...XUAT_XU_LY} style={FieldStyle}/>
            <FunctionField {...CHIET_KHAU} style={FieldStyle}/>
            <NumberField {...THANH_TIEN} style={FieldStyle}/>
            <EditButton />
            <DeleteButton/>
        </Datagrid>
    </List>
);

export const DonHangChiTietEdit = (props) => (
    <Edit {...props} title='Chỉnh Sửa'>
        <SimpleForm>
            <ReferenceInput label='Mã Đơn Hàng' source='refId._id' reference='donhangs' perPage={100} filter={filterEdit}>
                <SelectInput optionText='maDH'/>
            </ReferenceInput>
            <ReferenceInput label='Tên Sản Phẩm' source='maSP._id' reference='sanphams' perPage={100}>
                <SelectInput optionText='ten'/>
            </ReferenceInput>
            <NumberInput {...SO_LUONG_XUAT} style={FieldStyle}/>
            <NumberInput {...XUAT_XU_LY} style={FieldStyle}/>
            <NumberInput {...CHIET_KHAU} style={FieldStyle}/>
        </SimpleForm>
    </Edit>
);

export const DonHangChiTietCreate = (props) => (
    <Create {...props} title='Tạo Mới'>
        <SimpleForm>
            <ReferenceInput label='Mã Đơn Hàng' source='refId' reference='donhangs' allowEmpty perPage={100} filter={filterEdit}>
                <SelectInput optionText='maDH'/>
            </ReferenceInput>
            <ReferenceInput label='Tên Sản Phẩm' source='maSP' reference='sanphams' allowEmpty perPage={100}>
                <SelectInput optionText='ten'/>
            </ReferenceInput>
            <NumberInput {...SO_LUONG_XUAT} style={FieldStyle}/>
            <NumberInput {...XUAT_XU_LY} style={FieldStyle}/>
            <NumberInput {...CHIET_KHAU} style={FieldStyle}/>
        </SimpleForm>
    </Create>
);