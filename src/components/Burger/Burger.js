import React from 'react';

// a special higher order component
// we can inject or make them available (inject these special props in any component)
// import {withRouter} from 'react-router-dom';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map( igKey => {
            return [...Array(props.ingredients[igKey])].map(( _, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            });
        } )
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }
    
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;
// in the router we have match location & history
// and match will refer to the nearest match (to the nearest route which was matched in the past)
// --> in this case: the route which matched the BurgerBuilder.
