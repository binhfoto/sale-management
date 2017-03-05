import React, {Component} from 'react';

const Row = ({children}) => {
    return (
        <div className="row around-lg">
            {children}
        </div>
    )
};

export default Row;