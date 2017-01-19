import React from 'react';
import {SimpleForm} from 'admin-on-rest/lib/mui/form';
import {List, Filter, Datagrid} from 'admin-on-rest/lib/mui/list';
import {Create, Edit} from 'admin-on-rest/lib/mui/detail';
import {TextField, ChipField, ReferenceField, DateField, NumberField} from 'admin-on-rest/lib/mui/field';
import {DisabledInput, NumberInput, TextInput, DateInput, ReferenceInput, SelectInput} from 'admin-on-rest/lib/mui/input';
import {EditButton} from 'admin-on-rest/lib/mui/button';

import {FieldStyle} from '../style/default';

/*
 * KhoHang is for 'sanphamtonkho' table
 */
const TITLE = "Danh Sách Hàng Tồn";
const SO_LUONG = {source:"soLuong", label: "Số Lượng", options: {type: 'number'}};

export const KhoHangList = (props) => (
    <List {...props} title={TITLE}>
        <Datagrid>            
            <ReferenceField label="Tên" source="maSP" reference="sanphams">
                <TextField source="ten" style={FieldStyle}/>
            </ReferenceField>
            <ReferenceField label="Đơn Vị" source="maSP" reference="sanphams">
                <TextField source="donVi" style={FieldStyle}/>
            </ReferenceField>
            <ReferenceField label="Quy Cách" source="maSP" reference="sanphams">
                <TextField source="quyCach" style={FieldStyle}/>
            </ReferenceField>
            <NumberField {...SO_LUONG} style={FieldStyle}/>
            <EditButton />
        </Datagrid>
    </List>
);

export const KhoHangEdit = (props) => (
    <Edit {...props} title="Cập nhật">
        <SimpleForm>
            <ReferenceField label="Tên" source="maSP" reference="sanphams">
                <TextField source="ten" style={FieldStyle}/>
            </ReferenceField>
            <NumberInput {...SO_LUONG} />
        </SimpleForm>
    </Edit>
);

/*export const KhoHangCreate = (props) => (
    <Create {...props} title="Tạo mới">
        <SimpleForm>
            <ReferenceInput label="Tên" source="maSP" reference="sanphams" allowEmpty>
                <SelectInput optionText="ten"/>
            </ReferenceInput>
            <NumberInput {...SO_LUONG} />
        </SimpleForm>
    </Create>
);*/
