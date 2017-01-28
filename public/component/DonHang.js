import React from 'react';
import {SimpleForm} from 'admin-on-rest/lib/mui/form';
import {List, Filter, Datagrid} from 'admin-on-rest/lib/mui/list';
import {Create, Edit} from 'admin-on-rest/lib/mui/detail';
import {TextField, ChipField, NumberField, ReferenceField, FunctionField, DateField} from 'admin-on-rest/lib/mui/field';
import {DisabledInput, TextInput, NumberInput, SelectInput, ReferenceInput} from 'admin-on-rest/lib/mui/input';
import {EditButton} from 'admin-on-rest/lib/mui/button';

import {FieldStyle} from '../style/default';

const TITLE = "Danh Sách Đơn Hàng";
const MA_DH = {source:"maDH", label: "Mã"};
const MA_KH = {source:"maKH", label: "Khách Hàng"};
const TONG_TIEN = {source:"tongTien", label: "Tổng Tiền"};
const THANH_TOAN = {source:"thanhToan", label: "Thanh Toán"};
const DU_NO = {source:"duNo", label: "Dư Nợ"};
const NGAY_TAO = {source:"ngayTaoDH", label: "Ngày Tạo"};
const THUE_VAT = {
    label: "VAT",
    render: (record) => {
        return record.thueVAT + '%';
    }
};

const defaultSort = {
    field: "maDH",
    order: "DESC"
};

export const DonHangList = (props) => (
    <List {...props} defaultSort={defaultSort} title={TITLE}>
        <Datagrid>
            <TextField {...MA_DH} style={FieldStyle}/>
            <ReferenceField label="Khách Hàng" source="maKH" reference="khachhangs">
                <TextField source="ten" style={FieldStyle}/>
            </ReferenceField>
            <NumberField {...TONG_TIEN} style={FieldStyle}/>
            <FunctionField {...THUE_VAT} style={FieldStyle}/>
            <NumberField {...THANH_TOAN} style={FieldStyle}/>
            <NumberField {...DU_NO} style={FieldStyle}/>
            <DateField {...NGAY_TAO} style={FieldStyle}/>
            <EditButton />
        </Datagrid>
    </List>
);
