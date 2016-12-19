import React, { PropTypes } from 'react';
import inflection from 'inflection';
import Paper from 'material-ui/Paper';
import { Tabs , Tab } from 'material-ui/Tabs';
import { Link } from 'react-router';

const MyTab = ({ resources, children }) => {
    return (
        
        <Tabs>
            {resources.map(resource => {
                    var linkTo = (resource.name === 'wrapper' && resource.children) ? resource.children[0].props.name : resource.name;
                    return (
                    <Tab key={resource.name} 
                        label={resource.options.label || inflection.humanize(inflection.pluralize(resource.name))} 
                        icon={<resource.icon />}
                        containerElement={<Link to={`/${linkTo}`}/>}
                        >
                            
                    </Tab>);
                }
            )}
        </Tabs>
        
        
    );
};

MyTab.propTypes = {
    resources: PropTypes.array.isRequired,
};

export default MyTab;
