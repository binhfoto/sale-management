import 'flexboxgrid/dist/flexboxgrid.min.css';
import '../css/reset.css';
import '../css/table.css';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, Redirect, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware, routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { fork } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

import adminReducer from 'admin-on-rest/lib/reducer';
import crudSaga from 'admin-on-rest/lib/sideEffect/saga';
import CrudRoute from 'admin-on-rest/lib/CrudRoute';
import Layout from 'admin-on-rest/lib/mui/layout/Layout';
import withProps from 'admin-on-rest/lib/withProps';

import restClientFactory from '../javascript-boilerplate/admin/js/restClient';
import SignIn from '../javascript-boilerplate/admin/js/user/SignIn';
import SignInLayout from './Management/Layout/SignInLayout';
import userSagas from '../javascript-boilerplate/admin/js/user/sagas';
import userReducer from '../javascript-boilerplate/admin/js/user/reducer';
import { signOut } from '../javascript-boilerplate/admin/js/user/actions';
import redirectIfNotAuthenticatedFactory from '../javascript-boilerplate/admin/js/user/redirectIfNotAuthenticated';

import SanPhamIcon from 'material-ui/svg-icons/places/kitchen';
import KhachHangIcon from 'material-ui/svg-icons/social/person-outline';
import KhoHangIcon from 'material-ui/svg-icons/action/store';
import HangNhapIcon from 'material-ui/svg-icons/action/system-update-alt';
import HangTonIcon from 'material-ui/svg-icons/action/tab';
import DonHangIcon from 'material-ui/svg-icons/action/receipt';
import DonHangListIcon from 'material-ui/svg-icons/action/list';
import DonHangDetailIcon from 'material-ui/svg-icons/image/details';

import {Resource} from 'admin-on-rest/lib';
import {Delete} from 'admin-on-rest/lib/mui';

import {SanPhamList, SanPhamCreate, SanPhamEdit} from './Management/SanPham';
import {KhachHangList, KhachHangCreate, KhachHangEdit} from './Management/KhachHang';
import {NhapHangList, NhapHangCreate, NhapHangEdit} from './Management/NhapHang';
import {KhoHangList, KhoHangCreate, KhoHangEdit} from './Management/KhoHang';
import {DonHangList, DonHangEdit, DonHangCreate} from './Management/DonHang';
import {DonHangChiTietList, DonHangChiTietEdit, DonHangChiTietCreate} from './Management/DonHangChiTiet';

import AppLayout from './AppLayout';
import Report from './Report';
import ReportLayout from './Report/Layout/ReportLayout';
import Dashboard from './Report/Dashboard';
import Row from './Report/Row';
import Panel from './Report/Panel';
import Management from './Management';
import ManagementLayout from './Management/Layout/ManagementLayout';

const mapChildren = (children) => {
    let report, mgmt;
    React.Children.map(children, (child) => {
        switch(child.type.name) {
            case 'Report':
                report = child;
                break;
            case 'Management':
                mgmt = child;
                break;
        }
    });
    return {report, mgmt};
};

const managementBuilder = (mgmt) => {
    let treeResources = [];
    let flatResources = [];
    let crudRoutes = [];

    React.Children.map(mgmt.props.children, ({ props }) => {
        treeResources.push(props);
        if(props.name.startsWith('wrapper') && props.children){
            React.Children.map(props.children, ({props}) => {
                flatResources.push(props);
            });
        }
        else {
            flatResources.push(props);
        }
    });

    crudRoutes = flatResources.map(resource => {
        return ( <CrudRoute key={resource.name} 
                            path={resource.name} 
                            list={resource.list} 
                            create={resource.create} 
                            edit={resource.edit} 
                            show={resource.show} 
                            remove={resource.remove} 
                            options={resource.options} />);
        }
    );

    return {flatResources, treeResources, crudRoutes};
};

const App = ({appLayout, children}) => {

    const {report, mgmt} = mapChildren(children);
    const {flatResources, treeResources, crudRoutes} = managementBuilder(mgmt);

    const sagaMiddleware = createSagaMiddleware();
    
    const reducer = combineReducers({
        admin: adminReducer(flatResources),
        form: formReducer,
        routing: routerReducer,
        user: userReducer(window.localStorage)
    });
    
    const store = createStore(reducer, undefined, compose(
        applyMiddleware(routerMiddleware(hashHistory), sagaMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f,
    ));

    const redirectIfNotAuthenticated = redirectIfNotAuthenticatedFactory(store);
    const restClient = restClientFactory(ADMIN_API_URL, () => window.localStorage.getItem('token'), () => store.dispatch(signOut.request()));

    sagaMiddleware.run(function* () {
        yield fork(crudSaga(restClient));
        yield fork(userSagas);
    });

    const indexComponent = {
        resource: flatResources[0].name,
        hasList: !!flatResources[0].list,
        hasEdit: !!flatResources[0].edit,
        hasShow: !!flatResources[0].show,
        hasCreate: !!flatResources[0].create,
        hasDelete: !!flatResources[0].remove
    };

    return (
        <Provider store={store}>
            <Router history={hashHistory}>
                <Redirect from="/" to={`/report`} />
                <Route path="/auth/signin" component={SignInLayout}>
                    <IndexRoute component={SignIn} />
                </Route>
                <Route path="/" component={appLayout} onEnter={redirectIfNotAuthenticated}>
                    <Route path="report" component={report.props.appLayout} dashboards={report.props.children} onEnter={redirectIfNotAuthenticated}>
                        {
                            React.Children.map(report.props.children, (child) => {
                                return <Route path={`dashboard/${child.props.name}`} component={withProps({...child.props})(Dashboard)} rows={child.props.children}/>
                            })
                        }
                    </Route>
                    <Route path="mgmt" component={mgmt.props.appLayout} resources={treeResources} onEnter={redirectIfNotAuthenticated}>
                        <IndexRoute component={withProps(indexComponent)(flatResources[0].list)}/>
                        {crudRoutes}
                    </Route>
                </Route>
            </Router>
        </Provider>
    );
};

ReactDOM.render(
    <App appLayout={AppLayout}>
        <Report appLayout={ReportLayout}>
            <Dashboard name="dashboard1" title="title1">
                <Row>
                    <Panel className="col-lg-12">
                        
                    </Panel>
                </Row>
                <Row>
                    <Panel>
                        
                    </Panel>
                </Row>
            </Dashboard>
            <Dashboard  name="dashboard2" title="title2">
                <Row>
                    <Panel>
                        
                    </Panel>
                </Row>
                <Row>
                    <Panel>
                        
                    </Panel>
                </Row>
            </Dashboard>
        </Report>
        <Management appLayout={ManagementLayout}>
            <Resource icon={DonHangIcon} name="wrapper_don_hang" options={{label: "Đơn Hàng"}}>
                <Resource icon={DonHangListIcon} name="donhangs" list={DonHangList} edit={DonHangEdit}  create={DonHangCreate} remove={Delete} options={{label: "Danh Sách"}}/>
                <Resource icon={DonHangDetailIcon} name="donhangchitiets" list={DonHangChiTietList} edit={DonHangChiTietEdit} create={DonHangChiTietCreate} remove={Delete} options={{label: "Chi Tiết"}}/>
            </Resource>
            <Resource icon={KhoHangIcon} name="wrapper_kho_hang" options={{label: "Kho Hàng"}}>
                <Resource icon={HangTonIcon} name="sanphamtonkhos" list={KhoHangList} edit={KhoHangEdit} options={{label: "Tồn Kho"}}/>
                <Resource icon={HangNhapIcon} name="sanphamnhaps" list={NhapHangList} edit={NhapHangEdit} remove={Delete} create={NhapHangCreate} options={{label: "Nhập Kho"}}/>
            </Resource>
            <Resource icon={SanPhamIcon} name="sanphams" list={SanPhamList} edit={SanPhamEdit} create={SanPhamCreate} remove={Delete} options={{label: "Sản Phẩm"}}/>
            <Resource icon={KhachHangIcon} name="khachhangs" list={KhachHangList} edit={KhachHangEdit} create={KhachHangCreate} remove={Delete} options={{label: "Khách Hàng"}}/>
        </Management>
    </App>
    ,
    document.getElementById('root')
);