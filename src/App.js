import React, { Component } from 'react';
import {Router} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './components/Checkout/Checkout';

class App extends Component {
  render () {
    return (
      <div>
        <Layout>
            
            <BurgerBuilder />
            <Checkout />
        </Layout>
      </div>
    );
  }
}

export default App;
