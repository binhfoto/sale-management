import React, {Component} from 'react';

const Panel = ({className, children}) => {
    return (
        <div className={className}>
            <span>Panel</span>
            {children}
        </div>
    )
};

export default Panel;