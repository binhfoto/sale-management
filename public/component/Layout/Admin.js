import React, { PropTypes } from 'react';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, Redirect, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware, routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import createSagaMiddleware from 'redux-saga';


import adminReducer from 'admin-on-rest/lib/reducer';
import crudSaga from 'admin-on-rest/lib/sideEffect/saga';
import CrudRoute from 'admin-on-rest/lib/CrudRoute';
import Layout from 'admin-on-rest/lib/mui/layout/Layout';
import withProps from 'admin-on-rest/lib/withProps';


import restClientFactory from '../../javascript-boilerplate/admin/js/restClient';
import SignIn from '../../javascript-boilerplate/admin/js/user/SignIn';
import userSagas from '../../javascript-boilerplate/admin/js/user/sagas';
import userReducer from '../../javascript-boilerplate/admin/js/user/reducer';
import { signOut } from '../../javascript-boilerplate/admin/js/user/actions';
import redirectIfNotAuthenticatedFactory from '../../javascript-boilerplate/admin/js/user/redirectIfNotAuthenticated';

import SignInLayout from './SignInLayout';

const Admin = ({ /*restClient,*/ dashboard, children, title = 'Admin on REST', theme = {}, appLayout = withProps({ title, theme })(Layout) }) => {
  
    var treeResources = [];
    var flatResources = [];
    React.Children.map(children, ({ props }) => {
        treeResources.push(props);
        if(props.name === 'wrapper' && props.children){
            React.Children.map(props.children, ({props}) => {
                flatResources.push(props);
            });
        }
        else {
            flatResources.push(props);
        }
    });

    const firstResource = flatResources[0].name;
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

    sagaMiddleware.run(function* () { // eslint-disable-line func-names
        yield fork(crudSaga(restClient));
        yield fork(userSagas);
    });

    //sagaMiddleware.run(crudSaga(restClient));

    const history = syncHistoryWithStore(hashHistory, store);

    var crudRoutes = [];
    flatResources.map(resource => {
            crudRoutes.push( <CrudRoute key={resource.name} 
                            path={resource.name} 
                            list={resource.list} 
                            create={resource.create} 
                            edit={resource.edit} 
                            show={resource.show} 
                            remove={resource.remove} 
                            options={resource.options} />);
        }
    );

    return (
        <Provider store={store}>
            <Router history={history}>
                {dashboard ? undefined : <Redirect from="/" to={`/${firstResource}`} />}
                <Route path="/auth/signin" component={SignInLayout}>
                    <IndexRoute component={SignIn} />
                </Route>
                <Route path="/" component={appLayout} resources={treeResources} onEnter={redirectIfNotAuthenticated}>
                    {dashboard && <IndexRoute component={dashboard} restClient={restClient} />}
                    {crudRoutes}
                </Route>
            </Router>
        </Provider>
    );
};

const componentPropType = PropTypes.oneOfType([PropTypes.func, PropTypes.string]);

Admin.propTypes = {
    //restClient: PropTypes.func.isRequired,
    appLayout: componentPropType,
    dashboard: componentPropType,
    children: PropTypes.node,
    title: PropTypes.string,
    theme: PropTypes.object,
};

export default Admin;