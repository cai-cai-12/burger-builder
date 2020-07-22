import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

// The goal here is to display a preview of our burger & show the continue or cancel btn
const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Well, we hope it tastes good!</h1>
            <div style={{width: '100px', margin: 'auto'}}>
            <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType='Danger' clicked={}>CANCEL</Button>
            <Button btnType='Success' clicked={}>CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;