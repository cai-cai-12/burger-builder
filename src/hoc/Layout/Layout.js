import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

// Where should the sideDrawer component be used at?
// It's here -> because it's part of our core layout
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


// In the end, we also need to create a connection from Tollbar to sideDrawer
// and we have that connection in Layout component already
// It makes more sense to turn the Layout component into a class component where we can implement the method so that we can listen to both the sideDrawer closing itself by clicking on the Backdrop
// ori.
// const layout = (props) => (
//     <Aux>
//         <Toolbar />
//         <SideDrawer />
//         <main className={classes.Content}>{props.children}</main>
//     </Aux>
// )

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToogleHandler = () => {
        // this.setState({showSideDrawer: !this.state.showSideDrawer});
        // if you plan on using the state, insert state
        // you should't do it like this, because due to the asynchronous nature of set state,
        // this may lead to unexpected outcomes
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render () {
        return (
            <Aux>
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    drawerToogleClicked={this.sideDrawerToogleHandler} />
                <SideDrawer 
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {/* and props can now be accessed with this.props */}
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        // do map some props to slices of our state
        isAuthenticated: state.auth.token !== null,
    };
};

export default connect(mapStateToProps)(Layout);