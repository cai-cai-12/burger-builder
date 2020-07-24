import React, {Component} from 'react';
import axios from '../../../axios-orders';

import Button from '../../UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
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
            customer: {
                name: 'Hai Trieu',
                address: {
                    street: 'Dinh Tien Hoang',
                    zipCode: '70000',
                    country: 'Viet Nam'
                },
                email: 'trieungochai.dev@gmail.com'
            },
            deliveryMethod: 'fastest'
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

    render() {
        let form = (
            <form>
                <input className={classes.Input} type='text' name='name' placeholder='Your Name' />
                <input className={classes.Input} type='email' name='email' placeholder='Your Mail' />
                <input className={classes.Input} type='text' name='street' placeholder='Street' />
                <input className={classes.Input} type='text' name='postal' placeholder='Postal Code' />
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