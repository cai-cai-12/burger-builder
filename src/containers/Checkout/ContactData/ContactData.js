import React, {Component} from 'react';
import {connect} from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';

// it's not related to redux but we want to make sure that we do use it here too
// just as we use it in the BurgerBuilder at the bottom, it's getting wrapped by the connect middleware
// and we want to have this error dropdown here too
// So in the ContactData at the very bottom where we export everything, we'll wrap ContactData with one additional
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
                // have some validation key where we setup rules we want to have respected
                validation: {
                    // set to true - this is a field which is absolutely required (must not be empty)
                    required: true,
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your E-Mail',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ],
                },
                value: 'fastest',
                validation: {},
                valid: true,
            },
        },
        formIsValid: false,
        // loading: false, -> instead in mapStateToProps()
    }

    orderHandler = (event) => {
        // preventDefault() - because we don't want to send the request automatically that would reload my page
        event.preventDefault();

        // for <form onSubmit={this.orderHandler}>
        // to get the data from state.orderForm obj and don't care about the elementType & elementConfig
        // just want to get the name && value directly mapped to each other
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
        }

        // axios.post('/orders.json', order)
        //     .then(Response => {
        //         // want to stop loading no matter what the response is 
        //         // because the request is done even if it failed.
                
        //         // set the loading to false again -> go back to the 'order'
        //         this.setState({loading: false});
        //         this.props.history.push('/');

        //     })
        //     .catch(error => {
        //         // want to set loading to false if we have an err
        //         // because even if an err occurred, we want to stop loading
        //         // and we don't want to show the spinner anymore 
        //         // because our UI would be stuck in this case and the user would think it's still loading
        //         // => close the Modal 
        //         // because the modal only shown if state.purchasing props = true -> so in both cases, we'll set purchasing = false
        //         this.setState({loading: false})
        //     });

        this.props.onOrderBurger(order);
    }
    
    // turn off the ORDER btn if the form is invalid
    // the goal is that whenever we change the values -> check if it's valid or not
    // return true/false before excute inputChangedHandler()
    checkValidity = (value, rules) => {
        // we check on rule after the other
        // that means only the last rule has to be satisfied to turn isValid = true
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    // we create a form to handle dynamically with our own input component
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        
        // update valid value of updatedFormElement
        // keep in mind that checkValidity() returns true/false, so we store the result of this check in the valid property
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);

        // make sure that only check the validity if the element was touched
        updatedFormElement.touched = true;
        
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        // turn off the ORDER btn if the form is invalid
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render() {
        // create all these <Input /> dynamically
        // -> need turn our 'state.orderForm' obj into some kind of arr (can loop though)
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {/* loop through the formElementsArray with map() to generate a new arr*/}
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}/>
                ))}
                <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Please enter your contact data!</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
    }
};

// the main thing is that we want to connect my container here to the new actions we created
const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));