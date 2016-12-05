
import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput, LongTextInput, TextInput } from 'admin-on-rest/lib/mui';

export const SanPhamList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" style={{"font-size": "20px"}}/>
            <TextField source="maSP" label="Mã"/>
            <TextField source="ten" label="Tên"/>
            <TextField source="quyCach" label="Quy Cách"/>
            <TextField source="donVi" label="Đơn Vị"/>
            <TextField source="donGia" label="Đơn Giá"/>
            <TextField source="nhom" label="Nhóm"/>
            <EditButton />
        </Datagrid>
    </List>
);

const SanPhamTitle = ({ record }) => {
    return <span>Sản Phẩm {record ? `"${record.title}"` : ''}</span>;
};

export const SanPhamEdit = (props) => (
    <Edit title={SanPhamTitle} {...props}>
        <DisabledInput source="id" />
        <TextInput source="maSP" />
        <LongTextInput source="ten" />
        <TextInput source="quyCach" />
        <TextInput source="donVi" />
        <TextInput source="donGia" />
        <TextInput source="nhom" />
    </Edit>
);

export const SanPhamCreate = (props) => (
    <Create {...props}>
        <TextInput source="maSP" />
        <LongTextInput source="ten" />
        <TextInput source="quyCach" />
        <TextInput source="donVi" />
        <TextInput source="donGia" />
        <TextInput source="nhom" />
    </Create>
);