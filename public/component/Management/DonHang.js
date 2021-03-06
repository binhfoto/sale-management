import React from 'react';
import moment from 'moment';
import {SimpleForm} from 'admin-on-rest/lib/mui/form';
import {List, Filter, Datagrid} from 'admin-on-rest/lib/mui/list';
import {Create, Edit} from 'admin-on-rest/lib/mui/detail';
import {TextField, ChipField, NumberField, ReferenceField, FunctionField, DateField} from 'admin-on-rest/lib/mui/field';
import {DisabledInput, TextInput, NumberInput, SelectInput, ReferenceInput, DateInput} from 'admin-on-rest/lib/mui/input';
import {EditButton, DeleteButton} from 'admin-on-rest/lib/mui/button';

import {generateDonHangId} from '../../../server/util/common';
import LocaleDateInput from '../../admin-on-rest/mui/input/DateInput';
import {FieldStyle} from '../../style/default';

const TITLE = 'Danh Sách Đơn Hàng';
const MA_DH = {source:'maDH', label: 'Mã'};
const TEN_KH = {source:'maKH.ten', label: 'Khách Hàng'};
const TONG_TIEN = {source:'tongTien', label: 'Tổng Tiền'};
const THANH_TOAN = {source:'thanhToan', label: 'Thanh Toán'};
const DU_NO = {source:'duNo', label: 'Dư Nợ'};
const NGAY_TAO = {source:'ngayTaoDH', label: 'Ngày Tạo', locales: 'vi-VN', options: { locale: 'vi-VN' }};
const THUE_VAT = {
    source: 'thueVAT',
    label: 'VAT',
    render: (record) => {
        return record.thueVAT + '%';
    }
};

const defaultSort = {
    field: 'maDH',
    order: 'DESC'
};

const defaultFilter = {
    'ngayTaoDH': moment().second(0).minute(0).hour(0).format('YYYY-MM-DD').toString()
};

const createDefault = {
    thueVAT: 10
};

const DonHangFilter = (props) => (
    <Filter {...props} filterValues={defaultFilter}>
        <LocaleDateInput {...NGAY_TAO} style={FieldStyle} alwaysOn/>
    </Filter>
);

export const DonHangList = (props) => (
    <List {...props} defaultSort={defaultSort} filter={<DonHangFilter/>} title={TITLE}>
        <Datagrid>
            <TextField {...MA_DH} style={FieldStyle}/>
            <TextField {...TEN_KH} style={FieldStyle}/>
            <NumberField {...TONG_TIEN} style={FieldStyle}/>
            <FunctionField {...THUE_VAT} style={FieldStyle}/>
            <NumberField {...THANH_TOAN} style={FieldStyle}/>
            <NumberField {...DU_NO} style={FieldStyle}/>
            <DateField {...NGAY_TAO} style={FieldStyle}/>
            <EditButton />
            <DeleteButton/>
        </Datagrid>
    </List>
);

export const DonHangEdit = (props) => (
    <Edit {...props} title='Chỉnh Sửa'>
        <SimpleForm>
            <DisabledInput {...MA_DH} style={FieldStyle}/>
            <ReferenceInput label='Khách Hàng' source='maKH._id' reference='khachhangs' allowEmpty>
                <SelectInput optionText='ten' />
            </ReferenceInput>
            <NumberInput {...THANH_TOAN} style={FieldStyle}/>
            <NumberInput {...THUE_VAT} style={FieldStyle}/>
            <LocaleDateInput {...NGAY_TAO} style={FieldStyle}/>
        </SimpleForm>
    </Edit>
);

export const DonHangCreate = (props) => (
    <Create {...props} title='Tạo Mới'>
        <SimpleForm defaultValue={createDefault}>
            <TextInput {...MA_DH} style={FieldStyle} defaultValue={generateDonHangId()}/>
            <ReferenceInput label='Khách Hàng' source='maKH._id' reference='khachhangs' allowEmpty validation={{required: true}}>
                <SelectInput optionText='ten'/>
            </ReferenceInput>
            <NumberInput {...THANH_TOAN} style={FieldStyle}/>
            <NumberInput {...THUE_VAT} style={FieldStyle}/>
            <LocaleDateInput {...NGAY_TAO} style={FieldStyle} defaultValue={moment().second(0).minute(0).hour(0).format('YYYY-MM-DD').toString()}/>
        </SimpleForm>
    </Create>
);
