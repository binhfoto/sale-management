import React, { PropTypes } from 'react';
import inflection from 'inflection';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router';

const Menu = ({ resource, menuStyle = { flex: '0 0 15em', order: -1 } }) => (
    <div style={menuStyle} id={"menu_" + resource.name} className="menuInTab">
        <Paper style={{height: '100%'}}>
            <List>
                {React.Children.map(resource.children, ({props}) => {
                    return <ListItem key={props.name} containerElement={<Link to={`/mgmt/${props.name}`} />} primaryText={props.options.label || inflection.humanize(inflection.pluralize(props.name))} leftIcon={<props.icon />} />
                })}
            </List>
        </Paper>
    </div>
);

Menu.propTypes = {
    resource: PropTypes.object.isRequired,
    menuStyle: PropTypes.object
};

export default Menu;
