import React, { PropTypes } from 'react';

const Management = () => <span>&lt;Admin&gt; elements are for configuration only and should not be rendered</span>;

Management.propTypes = {
    appLayout: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};

export default Management;