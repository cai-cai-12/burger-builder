// keep in mind for testing: most of our react components are functions
// therefore they only depend on the props receive
import React from 'react';
import { configure, shallow }  from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

// with that enzyme is connected
configure({adapter: new Adapter()});

// The 1st importand method is describe() - we don't need to import in that file
// it'll automatically be made available in our create react app project once we run the test command
// describe() is a func that takes 2 arguments
// the 1st: a description of the test bundle this file holes
// the 2nd: the our testing func
// it(): decribes or allows to write one individual test (also takes 2 arguments)
//// the 1st: a description which will appear in the console
//// the 2nd: a testing func

describe('<NavigationItems />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems/>);
    });

    it('should render 2 <NavigationItem/> elements if not authenticated', () => {
        // const wrapper = shallow(<NavigationItems />);
        // Inside expect(), we define the things we want to check
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render 3 <NavigationItem> elements if authenticated', () => {
        // const wrapper = shallow(<NavigationItems isAuthenticated />);
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should an exact Logout button', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true);
    });
});