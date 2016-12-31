import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import Notification from 'admin-on-rest/lib/mui/layout/Notification';

const SignInLayout = ({ isLoading, children }) => {
    const RightElement = isLoading
        ? <CircularProgress color="#fff" size={30} thickness={2} style={{ margin: 8 }} />
        : null;

    return (
        <MuiThemeProvider>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <div className="body" style={{ display: 'flex', flex: '1', backgroundColor: '#edecec' }}>
                    <div style={{ flex: 1 }}>{children}</div>
                </div>
                <Notification />
            </div>
        </MuiThemeProvider>
    );
};

SignInLayout.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    children: PropTypes.node,
};

function mapStateToProps(state) {
    return { isLoading: state.admin.loading > 0 };
}

export default connect(
  mapStateToProps,
)(SignInLayout);
