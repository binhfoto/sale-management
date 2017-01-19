import React from 'react';
import {SimpleForm} from 'admin-on-rest/lib/mui/form';
import {List, Filter, Datagrid} from 'admin-on-rest/lib/mui/list';
import {Create, Edit} from 'admin-on-rest/lib/mui/detail';
import {TextField, ChipField, ReferenceField, NumberField, DateField} from 'admin-on-rest/lib/mui/field';
import {DisabledInput, LongTextInput, TextInput, ReferenceInput, SelectInput, NumberInput/*, DateInput*/} from 'admin-on-rest/lib/mui/input';
import {EditButton} from 'admin-on-rest/lib/mui/button';

import LocaleDateInput from '../admin-on-rest/mui/input/DateInput';

import {FieldStyle} from '../style/default';

/*
 * NhapHang is for 'sanphamnhap' table
 */

const TITLE = "Danh Sách Nhập Hàng";
const SO_LUONG_NHAP = {source:"soLuongNhap", label: "Số Lượng"};
const MA_PHIEU_NHAP = {source:"maPhieuNhap", label: "Mã Phiếu"};
const NGAY_NHAP = {source:"ngayNhap", label: "Ngày Nhập", locales: "vi-VN", options: { locale: 'vi-VN' }}; // locales for DateField, locale for DateInput

const NhapHangFilter = (props) => (
    <Filter {...props}>
        <LocaleDateInput {...NGAY_NHAP}/>
    </Filter>
);

export const NhapHangList = (props) => (
    <List {...props} title={TITLE} filter={<NhapHangFilter/>}>
        <Datagrid>
            <ReferenceField label="Tên" source="maSP" reference="sanphams">
                <TextField source="ten"  style={FieldStyle}/>
            </ReferenceField>
            <ReferenceField label="Đơn Vị" source="maSP" reference="sanphams">
                <TextField source="donVi" style={FieldStyle}/>
            </ReferenceField>
            <ReferenceField label="Quy Cách" source="maSP" reference="sanphams">
                <TextField source="quyCach" style={FieldStyle}/>
            </ReferenceField>
            <NumberField {...SO_LUONG_NHAP} style={FieldStyle}/>
            <TextField {...MA_PHIEU_NHAP} style={FieldStyle}/>
            <DateField {...NGAY_NHAP} style={FieldStyle}/>
            <EditButton />
        </Datagrid>
    </List>
);

export const NhapHangEdit = (props) => (
    <Edit {...props} title="Cập nhật">
        <SimpleForm>
            <ReferenceInput label="Tên" source="maSP" reference="sanphams">
                <SelectInput optionText="ten" />
            </ReferenceInput>
            <NumberInput {...SO_LUONG_NHAP} />
            <TextInput {...MA_PHIEU_NHAP} />
            <LocaleDateInput {...NGAY_NHAP}/>
        </SimpleForm>
    </Edit>
);

export const NhapHangCreate = (props) => (
    <Create {...props} title="Tạo mới">
        <SimpleForm>
            <ReferenceInput label="Tên" source="maSP" reference="sanphams" allowEmpty>
                <SelectInput optionText="ten"/>
            </ReferenceInput>
            <NumberInput {...SO_LUONG_NHAP} />
            <TextInput {...MA_PHIEU_NHAP} />
            <LocaleDateInput {...NGAY_NHAP} />
        </SimpleForm>
    </Create>
);