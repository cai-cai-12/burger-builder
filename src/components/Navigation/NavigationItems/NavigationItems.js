import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/' exact>Burger Builder</NavigationItem>
        {/* make sure that Orders is only visible if we are authenticated */}
        {props.isAuthenticated ?
            <NavigationItem link='/orders'>Orders</NavigationItem>
            : null}
        {/* because NavigationItem receive props.isAuthenticated which true/false
        -> we can render this NavigationItem conditionally */}
        {props.isAuthenticated
            ? <NavigationItem link='/logout'>Logout</NavigationItem>
            : <NavigationItem link='/auth'>Authenticate</NavigationItem>}
    </ul>
);

export default navigationItems;

// only show navigation item with authenticate on it
// if unauthenticated -> do need to sign-up || sign-in and show a logout link instead if user are logged in
// For that, we need to check the state, login state in NavigationItems