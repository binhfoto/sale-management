import React, {Component} from 'react';

const Row = ({children}) => {
    return (
        <div className="row">
            <span>Row</span>
            {children}
        </div>
    )
};

export default Row;