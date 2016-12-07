
import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput, LongTextInput, TextInput, ChipField } from 'admin-on-rest/lib/mui';

// TODO: define style in separate module to use globally 
const STYLE = {fontSize: "1.3em"};

const MA_SP = {source:"maSP", label: "Mã"};
const TEN = {source:"ten", label: "Tên"};
const QUY_CACH = {source:"quyCach", label: "Quy Cách"};
const DON_VI = {source:"donVi", label: "Đơn Vị"};
const DON_GIA = {source:"donGia", label: "Đơn Giá"};
const NHOM = {source:"nhom", label: "Nhóm"};

export const SanPhamList = (props) => (
    <List {...props} title="Danh Sách">
        <Datagrid>
            <TextField {...MA_SP} style={STYLE}/>
            <TextField {...TEN} style={STYLE}/>
            <TextField {...QUY_CACH} style={STYLE}/>
            <TextField {...DON_VI} style={STYLE}/>
            <TextField {...DON_GIA} style={STYLE}/>
            <ChipField {...NHOM} style={STYLE}/>
            <EditButton />
        </Datagrid>
    </List>
);

export const SanPhamEdit = (props) => (
    <Edit {...props} title="Sửa Sản Phẩm">
        <TextInput {...MA_SP}/>
        <LongTextInput {...TEN}/>
        <TextInput {...QUY_CACH}/>
        <TextInput {...DON_VI} />
        <TextInput {...DON_GIA} />
        <TextInput {...NHOM} />
    </Edit>
);

export const SanPhamCreate = (props) => (
    <Create {...props} title="Tạo mới">
        <TextInput {...MA_SP}/>
        <LongTextInput {...TEN}/>
        <TextInput {...QUY_CACH}/>
        <TextInput {...DON_VI} />
        <TextInput {...DON_GIA} />
        <TextInput {...NHOM} />
    </Create>
);