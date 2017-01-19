import React, { Component, PropTypes } from 'react';
import DatePicker from 'material-ui/DatePicker';
import title from 'admin-on-rest/lib/util/title';
import {Field} from 'redux-form';

// override from admin-on-rest
// add VN datetime format

export const datify = input => {
    if (!input) {
        return null;
    }
    
    return input instanceof Date ? input : new Date(input);
};

class DateInput extends Component {

    onChange = (_, date) => this.props.input.onChange(date);

    render() {

        const { input, label, meta: { touched, error }, options, source, elStyle } = this.props;
        
        return (<DatePicker
            name={input.name}
            value={datify(input.value)}
            container="inline"
            
            floatingLabelText={title(label, source)}
            DateTimeFormat={Intl.DateTimeFormat}
            autoOk
            onChange={this.onChange}
            {...options}
            style={elStyle}
        />);
    }
}

DateInput.propTypes = {
    elStyle: PropTypes.object,
    includesLabel: PropTypes.bool,
    input: PropTypes.object,
    label: PropTypes.string,
    meta: PropTypes.object,
    options: PropTypes.object,
    source: PropTypes.string.isRequired
};

DateInput.defaultProps = {
    includesLabel: true,
    options: {}
};

const LocaleDateInput = (props) => (
    <Field
        name={props.source}
        {...props}
        component={DateInput}
    />
);

export default LocaleDateInput;
