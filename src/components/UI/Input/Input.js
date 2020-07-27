import React from 'react';

import classes from './Input.css';

const input = (props) => {
    let inputElement = null;

    // to output feedback upon our validation results
    // add a special class into each input element if it's invalid
    // so 'classes.InputElement' have to become more dynamic
    const inputClasses = [classes.InputElement];
    // But when we're checking with only the condition 'props.invalid'
    // -> we also see though that it's not friendly to start with a page (a form that's just red - included dropdown value)
    // -> additional props = 'props.shouldValidate' (should only be true if our obj in the orderForm has a validation obj)
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    // {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
    }
    
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
};

export default input;