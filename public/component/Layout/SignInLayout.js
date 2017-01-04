import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Notification from 'admin-on-rest/lib/mui/layout/Notification';

const SignInLayout = ({ isLoading, children }) => {
    
    return (
        <MuiThemeProvider>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <div className="body" style={{ display: 'flex', flex: '1'}}>
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
