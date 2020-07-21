import React from 'react';
import classes from './Spinner.css';

// Displaying a Spinner while sending a request
const spinner = () => (
    <div className={classes.Loader}>Loading...</div>
);

export default spinner;