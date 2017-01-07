/* eslint jsx-a11y/anchor-has-content: off */
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { propTypes, reduxForm, Field } from 'redux-form';
import buildSchema from 'redux-form-schema';
import { Link } from 'react-router';

import { Card, CardActions, CardTitle, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';

import { signIn as signInActions } from './actions';
import { getPreviousRoute } from './reducer';

import FontIcon from 'material-ui/FontIcon';

const TITLE = 'Tên Công Ty';

const signInSchema = buildSchema({
    username: {
        label: 'Tên Đăng Nhập',
        required: true,
        error: 'Yêu cầu nhập tên'
    },
    password: {
        label: 'Mật Khẩu',
        required: true,
        error: 'Yêu cầu nhập mật khẩu'
    },
});

const formStyles = {
    fieldGroup: {
        display: 'flex',
        alignItems: 'flex-end'
    },
    icon: {
        margin: '0 10px 10px 0'
    }
}

const renderInput = ({ meta: { touched, error } = {}, input: { ...inputProps }, ...props }) =>
    <TextField
        errorText={touched && error}
        {...inputProps}
        {...props}
        fullWidth
    />;

class SignIn extends Component {
    signIn = (values) => {
        this.props.signIn(this.props.previousRoute, values);
    }

    render() {
        const { signInError, handleSubmit, submitting } = this.props;
        const headerIcon = <Avatar src="/icon/pill_100.png" backgroundColor="#fff" size={50} style={{padding: '3px', border: '2px solid rgb(0, 188, 212)'}}/>;
        return (
            <Card style={{ minWidth: '300px'}}>
                
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '10px'}}>
                    {headerIcon}
                    <br/>
                    <span style={{fontSize: '1.2em'}}>{TITLE}</span>
                </div>
                
                {signInError && <Snackbar open autoHideDuration={4000} message={signInError.message} />}

                <form onSubmit={handleSubmit(this.signIn)}>
                    <div style={{ padding: '0 1em 1em 1em' }}>
                        <div style={formStyles.fieldGroup}>
                            <FontIcon className="material-icons" style={formStyles.icon}>face</FontIcon>
                            <Field
                                name="username"
                                component={renderInput}
                                floatingLabelText="Tên Đăng Nhập"
                                type="username"
                                hintText="abcxyz"
                            />
                        </div>
                        <div style={formStyles.fieldGroup}>
                            <FontIcon className="material-icons" style={formStyles.icon}>lock_open</FontIcon>
                            <Field
                                name="password"
                                component={renderInput}
                                floatingLabelText="Mật Khẩu"
                                type="password"
                                hintText="123456"
                            />
                        </div>
                    </div>
                    <br/><br/>
                    <CardActions>
                        <RaisedButton type="submit" secondary={true} disabled={submitting} label="Đăng Nhập" fullWidth={true}/>
                    </CardActions>
                </form>
            </Card>
            
        );
    }
}

SignIn.propTypes = {
    ...propTypes,
    signIn: PropTypes.func.isRequired,
    previousRoute: PropTypes.string,
};

const mapStateToProps = state => ({
    previousRoute: getPreviousRoute(state),
    signInError: state.user.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({ signIn: signInActions.request }, dispatch);

export default reduxForm({
    form: 'signIn',
    validate: signInSchema.validate,
    destroyOnUnmount: true,
})(connect(mapStateToProps, mapDispatchToProps)(SignIn));
