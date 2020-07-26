import React, {Component} from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street',
                },
                value: '',
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',
                },
                value: '',
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your E-Mail',
                },
                value: '',
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ],
                },
                value: '',
            },
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();

        // we need access to the ingredients & contact data to make this request though
        // we set up this props in file Checkout.js (line 56), so now we can access the ingredients on props
    
        // call this.setState and set loading to true, 
        // because we're loading the request is about to get sent.
        // Once the "Response => console.log(Response)" though
        this.setState({loading: true});

        // use axios instance to send the request to our backend
        // for storing data, we should use a post request and therefore we use the post() method on that instance
        // now we also need to send some data and that data should be our order for the given burger config.
        const order = {
            ingredients: this.props.ingredients,
            // the totalPrice is only calculated & stored in the BurgerBuilder
            // so we have to pass the totalPrice along with the ingredients from the BurgerBuilder to the Checkout component.
            price: this.props.price,
        }
        axios.post('/orders.json', order)
            .then(Response => {
                // want to stop loading no matter what the response is 
                // because the request is done even if it failed.
                
                // set the loading to false again -> go back to the 'order'
                this.setState({loading: false});
                this.props.history.push('/');

            })
            .catch(error => {
                // want to set loading to false if we have an err
                // because even if an err occurred, we want to stop loading
                // and we don't want to show the spinner anymore 
                // because our UI would be stuck in this case and the user would think it's still loading
                // => close the Modal 
                // because the modal only shown if state.purchasing props = true -> so in both cases, we'll set purchasing = false
                this.setState({loading: false})
            });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
        console.log(updatedOrderForm);
        console.log(updatedFormElement);
        console.log(updatedOrderForm[inputIdentifier]);
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
            <form>
                {/* loop through the formElementsArray with map() to generate a new arr*/}
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
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

export default ContactData;