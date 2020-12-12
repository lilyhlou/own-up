import React from "react";
import { shallow, configure, mount, render } from 'enzyme';
import InputForm from "./components/Input";
import { Provider } from 'react-redux';
import "./setupTests"
import renderer from 'react-test-renderer';
import App from './App';
import configureStore from 'redux-mock-store'

const mockStore = configureStore([]);
 
describe('Testing Input.js', () => {
  let store;
  let component;
 
  beforeEach(() => {
    store = mockStore({
      items: [],
      hasErrored: false,
      isLoading: false,
  });
 
    store.dispatch = jest.fn();
 
    component = renderer.create(
      <Provider store={store}>
        <InputForm
        itemsHasErrored={false}
        itemsIsLoading={false}
        />
      </Provider>
    );
  });
  it('snapshot test', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
  it('should dispatch an action on button click', () => {

         });
   });


/*


describe('Testing Input.js', () => {
    let store;
    let component;
   
    beforeEach(() => {
      store = mockStore({
        items: [],
        hasErrored: false,
        isLoading: false,
      });

      component = renderer.create(
        <Provider store={store}>
          <Input />
        </Provider>
      );
  
   
    it('snapshot test', () => {
      expect(component.toJSON()).toMatchSnapshot();
    });
    it('renders form', () => {
        const loan = <label>Loan Size</label>;
        const credit = <label>Property Type</label>;
        const property = <label>Credit Score</label>;
        const occupancy = <label>Occupancy</label>;
        expect(component.contains(loan));
        expect(component.contains(credit));
        expect(component.contains(property));
        expect(component.contains(occupancy));
        expect(component.find("button").prop("type")).toBe("submit");
    });
  });
});







store.dispatch = jest.fn();
 
component = renderer.create(
  <Provider store={store}>
    <App />
  </Provider>
);
});

it('check to see number of drop downs', () => {
const test = component.find('form').length;
expect(test).toEqual(1); // or the number of occurrence you're expecting
});

it('should dispatch an action on button click', () => {
renderer.act(() => {
  component.root.findByType('button').props.onClick();
});

renderer.act(() => {
  component.root.findByType('input')
    .props.onChange({ target: { value: '600' } });
});

expect(store.dispatch).toHaveBeenCalledTimes(1);
expect(store.dispatch).toHaveBeenCalledWith(
  myAction({ payload: 'some other text' })
);
});
*/
