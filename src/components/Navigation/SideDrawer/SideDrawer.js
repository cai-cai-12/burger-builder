import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';
import classes from './SideDrawer.css';

// The sideDrawer component is a normal functional compnent where we get some props and return something
// that something will not be JSX code immediately but a real function body we'll use here
const sideDrawer = (props) => {
    // because before we return JSX in there, we want to do something here
    // Let's add the logic (.Open/.Close classes in the SideDrawer.css file)
    // to attach these classes conditionally to move the sideDrawer out of the page or into it
    let attchedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attchedClasses = [classes.SideDrawer, classes.Open]
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attchedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;