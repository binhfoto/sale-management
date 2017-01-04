import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import CircularProgress from 'material-ui/CircularProgress';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Notification} from 'admin-on-rest/lib/mui/layout';
import Menu from './Menu';
import { Tabs , Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';

import FontIcon from 'material-ui/FontIcon';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';


const showMenu = (menuId) => {
    let menus = document.getElementsByClassName("menuInTab");
    for(let i=0; i<menus.length; i++) {
        let menu = menus[i];
        if(menu && menu.style) {
            menu.style.display = (menu.id === menuId) ? 'block' : 'none';
        }
    }
};

const Layout = ({ isLoading, children, route, title, theme }) => {

    const Title = <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>{'Ten Cong Ty'}</Link>;
    const RightElement = isLoading ? <CircularProgress color="#fff" size={30} thickness={2} style={{ margin: 8 }} /> : <span />;
    const muiTheme = getMuiTheme(theme);

    return (
        <MuiThemeProvider muiTheme={ muiTheme }>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <AppBar title={Title} iconElementRight={RightElement}/>
                <Tabs>
                    {route.resources.map(resource => {
                            var linkTo = (resource.name.startsWith('wrapper') && resource.children) ? resource.children[0].props.name : resource.name;
                            return (
                                <Tab key={resource.name} 
                                    id={resource.name} 
                                    label={resource.options.label || inflection.humanize(inflection.pluralize(resource.name))} 
                                    icon={<resource.icon />}
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
                
                <div className="body" style={{ display: 'flex', flex: '1', backgroundColor: '#edecec' }}>
                    <div style={{ flex: 1 }}>{children}</div>
                    {
                        route.resources.map( (resource, index) => {
                            if(resource.children && resource.children.length > 0) {
                                if(index > 0) menuStyle.display = 'none';
                                return <Menu key={"key_menu_" + resource.name} resource={resource}/>;
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
    //title: PropTypes.string.isRequired,
    //theme: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return { isLoading: state.admin.loading > 0 };
}

export default connect(
  mapStateToProps
)(Layout);