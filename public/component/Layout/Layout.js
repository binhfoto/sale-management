import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import CircularProgress from 'material-ui/CircularProgress';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Menu, Notification} from 'admin-on-rest/lib/mui/layout';
import { Tabs , Tab } from 'material-ui/Tabs';


import FontIcon from 'material-ui/FontIcon';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';


const Layout = ({ isLoading, children, route, title, theme }) => {

    const Title = <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>{'Ten Cong Ty'}</Link>;
    const RightElement = isLoading ? <CircularProgress color="#fff" size={30} thickness={2} style={{ margin: 8 }} /> : <span />;
    const muiTheme = getMuiTheme(theme);

    return (
        <MuiThemeProvider muiTheme={ muiTheme }>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <AppBar title={Title} />
                <Tabs>
                    {route.resources.map(resource => {
                            var linkTo = (resource.name === 'wrapper' && resource.children) ? resource.children[0].props.name : resource.name;
                            var MyMenu = <span/>;
                            if(resource.children && resource.children.length > 0){
                                MyMenu = <Menu resources={React.Children.map(resource.children, ({props}) => props)} />
                            }

                            return (
                                <Tab key={resource.name} 
                                    label={resource.options.label || inflection.humanize(inflection.pluralize(resource.name))} 
                                    icon={<resource.icon />}
                                    containerElement={<Link to={`/${linkTo}`}/>}>
                                        <div className="body" style={{ display: 'flex', flex: '1', backgroundColor: '#edecec' }}>
                                            <div style={{ flex: 1 }}>{children}</div>
                                            {MyMenu}
                                        </div>
                                </Tab>
                            );
                        }
                    )}
                </Tabs>
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