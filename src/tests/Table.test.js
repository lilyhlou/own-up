import React from "react";
import { shallow, configure, mount, render } from 'enzyme';
import { RateTable } from "../components/Table";
import { Provider } from 'react-redux';
import "./setupTests"
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'

const mockStore = configureStore([]);
 
describe('Testing Table.js', () => {
  let store;
  let component;
 
  beforeEach(() => {
    store = mockStore({
      items: [],
      itemsHasErrored: false,
      itemsIsLoading: false,
    });
  });
  it('snapshot test', () => {
    component = renderer.create(
      <Provider store={store}>
        <RateTable
          items={[]}
          hasErrored={false}
          isLoading={false}
        />
      </Provider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('Unit testing for Table.js', () => {
    let wrapper;

    it('tests to render table thats still loading', () => {
      wrapper = shallow(
        <RateTable   
          items={[]}
          hasErrored={false}
          isLoading={true}
          submitted={true}
        />
      );
      expect(wrapper.contains(<p></p>)).toBe(true);  
    });
    it('tests to render table thats errored', () => {
      wrapper = shallow(
        <RateTable   
          items={[]}
          hasErrored={true}
          isLoading={false}
          submitted={true}
        />
      );
      expect(wrapper.text()).toEqual('Sorry, there was an error loading the items. Try refreshing and submitting again.');
  });
    it('tests to render table with no info', () => {
      wrapper = shallow(
        <RateTable   
          items={[]}
          hasErrored={false}
          isLoading={false}
          submitted={true}
        />
        );
      expect(wrapper.text()).toEqual('No results found.');
    });
    it('tests to render table and check for concat methods', () => {
      wrapper = shallow(
      <RateTable   
        items={[{
          "lenderName": "TFB Federal Credit Union",
          "loanType": "30YR Fixed",
          "interestRate": 4.125,
          "closingCosts": 10000,
          "monthlyPayment": 1000,
          "apr": 4.25
        }]}
        hasErrored={false}
        isLoading={false}
        submitted={true}
      />);
      // to test string concat and fixed number of decimals and display data
      expect(wrapper.text()).toMatch(/TFB Federal C.../); 
      expect(wrapper.text()).toMatch(/4.125%/); 
      expect(wrapper.text()).toMatch(/\$10000.00/);
      expect(wrapper.text()).toMatch(/\$1000.00/);
      expect(wrapper.text()).toMatch(/4.250%/);
    });
  });
});
