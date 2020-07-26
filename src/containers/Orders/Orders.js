import React, {Component} from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true,
    }

    // we can use componentDidMount() here 
    // because we only want to fetch orders when this is loaded
    componentDidMount() {
        axios.get('/orders.json')
            .then(Response => {
                const fetchedOrders = [];
                for (let key in Response.data) {
                    fetchedOrders.push({
                        ...Response.data[key],
                        id: key
                    });
                }
                this.setState({loading: false, orders: fetchedOrders})
            })
            .catch(error => {
                this.setState({loading: false})
            });
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}/>
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);