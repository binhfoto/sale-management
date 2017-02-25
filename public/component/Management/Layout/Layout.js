import React, { PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import { Tabs , Tab } from 'material-ui/Tabs';
import ActionExit from 'material-ui/svg-icons/action/exit-to-app';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Notification } from 'admin-on-rest/lib/mui/layout';
import FontIcon from 'material-ui/FontIcon';
import {white, pinkA200} from 'material-ui/styles/colors';
import Menu from './Menu';

import { signOut as signOutAction } from '../../../javascript-boilerplate/admin/js/user/actions';
import {MenuStyle, FlexDisplay, IconAppBar} from '../../../style/default';

import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ListIcon from 'material-ui/svg-icons/action/list';
import Assessment from 'material-ui/svg-icons/action/assessment';

const showMenu = (menuId) => {
    let menus = document.getElementsByClassName("menuInTab");
    for(let i=0; i<menus.length; i++) {
        let menu = menus[i];
        if(menu && menu.style) {
            menu.style.display = (menu.id === menuId) ? 'block' : 'none';
        }
    }
};

const Layout = ({ isLoading, children, route, title, theme, signOut }) => {

    const LoadingIcon = isLoading
        ? <CircularProgress color="#fff" size={20} thickness={2} style={{ margin: 8 }} />
        : <ActionExit />;

    const LeftElement = <FontIcon color={white} className="material-icons" style={{paddingTop: '8px', fontSize: '2em'}}>bubble_chart</FontIcon>;
    const RightElement = <FlatButton label="Đăng Xuất" onClick={signOut} icon={LoadingIcon} hoverColor={pinkA200} style={{color: white}}/>;
                        
    const Title = <div>
                        <span>Tên Công Ty</span>
                        <div style={{marginLeft: '40px', display: 'inline'}}>
                            <FlatButton label="Biểu đồ" icon={<Assessment/>} style={{color: white}}/>
                            <FlatButton label="Quản lý" icon={<ListIcon/>} style={{color: white}}/>
                        </div>
                 </div>
    const muiTheme = getMuiTheme(theme);

    return (
        <MuiThemeProvider muiTheme={ muiTheme }>
            <div style={FlexDisplay}>
                <AppBar 
                    iconElementLeft={LeftElement}
                    title={Title}
                    iconElementRight={RightElement}
                />
                <Tabs>
                    {route.resources.map(resource => {
                            var linkTo = (resource.name.startsWith('wrapper') && resource.children) ? resource.children[0].props.name : resource.name;
                            /*icon={<resource.icon />}*/
                            return (
                                <Tab key={resource.name} 
                                    id={resource.name} 
                                    label={resource.options.label || inflection.humanize(inflection.pluralize(resource.name))} 
                                    containerElement={<Link to={`/${linkTo}`}/>}
                                    onActive={ (tab) => {
                                        let menuId = "menu_".concat(tab.props.id);
                                        showMenu(menuId);
                                    }}>
                                </Tab>
                            );
                        }
                    )}
                </Tabs>
                
                <div className="body" style={{ display: 'flex', flex: '1'}}>
                    <div style={{ flex: 1 }}>{children}</div>
                    {
                        route.resources.map( (resource, index) => {
                            if(resource.children && resource.children.length > 0) {
                                let menuStyle = _.clone(MenuStyle);
                                if(index > 0) menuStyle.display = 'none';
                                return <Menu key={"key_menu_" + resource.name} resource={resource} menuStyle={menuStyle}/>;
                            }
                        })
                    }
                </div>
                <Notification />
            </div>
        </MuiThemeProvider>
    );
};

Layout.componentWillMount = () => {
    injectTapEventPlugin();
}

Layout.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    children: PropTypes.node,
    route: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired,
    //title: PropTypes.string.isRequired,
    //theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return { isLoading: state.admin.loading > 0 };
}

const mapDispatchToProps = ({ signOut: signOutAction.request });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);