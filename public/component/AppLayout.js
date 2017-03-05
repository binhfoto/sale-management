import React, { PropTypes } from 'react';
import { routerActions } from 'react-router-redux';
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

import { signOut as signOutAction } from '../javascript-boilerplate/admin/js/user/actions';
import {MenuStyle, AppFlex, IconAppBar} from '../style/default';

import ListIcon from 'material-ui/svg-icons/action/list';
import Assessment from 'material-ui/svg-icons/action/assessment';

const AppLayout = ({ isLoading, children, title, theme, signOut, history }, context) => {

    const redirectPage = (to) => () => {
        if(window.location.href.indexOf(to) < 0) context.router.push(to);
    } 

    const LoadingIcon = isLoading
        ? <CircularProgress color="#fff" size={20} thickness={2} style={{ margin: 8 }} />
        : <ActionExit />;

    const LeftElement = <FontIcon color={white} className="material-icons" style={{paddingTop: '8px', fontSize: '2em'}}>bubble_chart</FontIcon>;
    const RightElement = <FlatButton label="Đăng Xuất" onClick={signOut} icon={LoadingIcon} hoverColor={pinkA200} style={{color: white}}/>;
                        
    const Title = <div>
                        <span>Tên Công Ty</span>
                        <div style={{marginLeft: '40px', display: 'inline'}}>
                            <FlatButton onClick={redirectPage('/report')} label="Biểu Đồ" icon={<Assessment/>} style={{color: white}}/>
                            <FlatButton onClick={redirectPage('/mgmt')} label="Quản Lý" icon={<ListIcon/>} style={{color: white}} />
                        </div>
                 </div>
                 
    const muiTheme = getMuiTheme(theme);

    return (
        <MuiThemeProvider muiTheme={ muiTheme }>
            <div style={AppFlex}>
                <AppBar 
                    iconElementLeft={LeftElement}
                    title={Title}
                    iconElementRight={RightElement}
                />
                {children}
                <Notification />
            </div>
        </MuiThemeProvider>
    );
};

AppLayout.componentWillMount = () => {
    injectTapEventPlugin();
}

AppLayout.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    children: PropTypes.node,
    signOut: PropTypes.func.isRequired
};

AppLayout.contextTypes = {
    router: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return { isLoading: state.admin.loading > 0 };
}

const mapDispatchToProps = ({ signOut: signOutAction.request });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppLayout);