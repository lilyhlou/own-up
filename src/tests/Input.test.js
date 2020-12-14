import React from "react";
import { shallow } from 'enzyme';
import { InputForm } from "../components/Input";
import { Provider } from 'react-redux';
import "./setupTests";
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
 
describe('Testing Input.js', () => {
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
        <InputForm
          items={[]}
          hasErrored={false}
          isLoading={false}
          fetchData={(url) => dispatch(itemsFetchData(url))}
        />
      </Provider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  let wrapper;
  const mockFetchDataFunction = jest.fn();
  it('submit button with no input in form', () => {
    wrapper = shallow(
      <InputForm   
        items={[]}
        hasErrored={false}
        isLoading={false}
        fetchData={mockFetchDataFunction}
      />
    )
    wrapper.find('Button').simulate(
      'click', 
      {preventDefault() {}}
    )
    expect(wrapper.instance().validate()).toBe(false); // test validate function
    expect(wrapper.state('submitted')).toEqual(false);
  });

  it('form filled out correctly', () => {
    wrapper = shallow(
      <InputForm   
        items={[]}
        hasErrored={false}
        isLoading={false}
        fetchData={mockFetchDataFunction}
      />
    )
    expect(wrapper.instance().validate()).toBe(false);

    wrapper.find('FormControl').at(0).simulate('change', 
      {target: 
        {name: 'loan', value: '523532'}
      });
      expect(wrapper.state('search')["loan"]).toEqual("523532");

      wrapper.find('FormControl').at(1).simulate('change', 
        {target: 
          {name: 'property', value: 'SingleFamily'}
      });
      expect(wrapper.state('search')["property"]).toEqual("SingleFamily");

      wrapper.find('FormControl').at(2).simulate('change', 
        {target: 
          {name: 'credit', value: '750'}
      });
      expect(wrapper.state('search')["credit"]).toEqual("750");

      wrapper.find('FormControl').at(3).simulate('change', 
        {target: 
          {name: 'occupancy', value: 'Primary'}
      });
      expect(wrapper.state('search')["occupancy"]).toEqual("Primary");
      expect(wrapper.state('submitted')).toEqual(false);
      expect(mockFetchDataFunction).not.toHaveBeenCalled();

      wrapper.find('Button').simulate(
        'click', 
        {preventDefault() {}}
      );
    expect(wrapper.state('submitted')).toEqual(true);
    expect(mockFetchDataFunction).toHaveBeenCalled(); // calls fetch data
    expect(wrapper.instance().validate()).toBe(true); 
   })

   it('loan field blank, everything else completed', () => {
    wrapper = shallow(
      <InputForm   
        items={[]}
        hasErrored={false}
        isLoading={false}
        fetchData={mockFetchDataFunction}
      />
    )
    expect(wrapper.instance().validate()).toBe(false);

    wrapper.find('FormControl').at(1).simulate(
      'change', 
      {target: 
        {name: 'property', value: 'SingleFamily'}
      }
    );
    expect(wrapper.state('search')["property"]).toEqual("SingleFamily");

    wrapper.find('FormControl').at(2).simulate(
      'change', 
      {target: 
        {name: 'credit', value: '750'}
      }
      );
    expect(wrapper.state('search')["credit"]).toEqual("750");

    wrapper.find('FormControl').at(3).simulate(
      'change', 
      {target: 
        {name: 'occupancy', value: 'Primary'}
      }
    );
    expect(wrapper.state('search')["occupancy"]).toEqual("Primary");
    expect(wrapper.state('submitted')).toEqual(false);
    expect(mockFetchDataFunction).not.toHaveBeenCalled();

    wrapper.find('Button').simulate(
      'click', 
      {preventDefault() {}}
    );
    expect(wrapper.instance().validate()).toBe(false); 
    expect(wrapper.state('errString')).toBe("Insert value in loan size field.");
    expect(wrapper.state('submitted')).toEqual(false);
    expect(mockFetchDataFunction).not.toHaveBeenCalled();
   })

  it('credit score out of range', () => {
    wrapper = shallow(<InputForm   
      items={[]}
      hasErrored={false}
      isLoading={false}
      fetchData={mockFetchDataFunction}/>)
    expect(wrapper.instance().validate()).toBe(false);

    wrapper.find('FormControl').at(0).simulate(
      'change', 
      {target: 
        {name: 'loan', value: '523532'}
    });
    expect(wrapper.state('search')["loan"]).toEqual("523532");

    wrapper.find('FormControl').at(1).simulate(
      'change', 
      {target: 
        {name: 'property', value: 'SingleFamily'}
      }
    );
    expect(wrapper.state('search')["property"]).toEqual("SingleFamily");

    wrapper.find('FormControl').at(2).simulate(
      'change', 
      {target: 
        {name: 'credit', value: '1750'}
      }
    );
    expect(wrapper.state('search')["credit"]).toEqual("1750");

    wrapper.find('FormControl').at(3).simulate(
      'change', 
      {target: 
        {name: 'occupancy', value: 'Primary'}
      }
    );
    expect(wrapper.state('search')["occupancy"]).toEqual("Primary");
    expect(wrapper.state('submitted')).toEqual(false);
    expect(mockFetchDataFunction).not.toHaveBeenCalled();

    wrapper.find('Button').simulate(
      'click', 
      {preventDefault() {}}
    );
    expect(wrapper.state('submitted')).toEqual(false);
    expect(wrapper.instance().validate()).toBe(false); 
    expect(wrapper.state('errString')).toBe("Credit score must be a whole number between 300 and 800.");
    expect(mockFetchDataFunction).not.toHaveBeenCalled();
   })

   it('form filled with credit score field left blank', () => {
    wrapper = shallow(
      <InputForm   
        items={[]}
        hasErrored={false}
        isLoading={false}
        fetchData={mockFetchDataFunction}
      />
    )
    expect(wrapper.instance().validate()).toBe(false);

    wrapper.find('FormControl').at(0).simulate(
      'change', 
      {target: 
        {name: 'loan', value: '523532'}
      }
    );
    expect(wrapper.state('search')["loan"]).toEqual("523532");

    wrapper.find('FormControl').at(1).simulate(
      'change', 
      {target: 
        {name: 'property', value: 'SingleFamily'}
      }
    );
    expect(wrapper.state('search')["property"]).toEqual("SingleFamily");

    wrapper.find('FormControl').at(3).simulate(
      'change', 
      {target: 
        {name: 'occupancy', value: 'Primary'}
      }
    );
    expect(wrapper.state('search')["occupancy"]).toEqual("Primary");
    expect(wrapper.state('submitted')).toEqual(false);
    expect(mockFetchDataFunction).not.toHaveBeenCalled();

    wrapper.find('Button').simulate(
      'click', 
      {preventDefault() {}}
    );
    expect(wrapper.state('submitted')).toEqual(false);
    expect(wrapper.instance().validate()).toBe(false); 
    expect(wrapper.state('errString')).toBe("Insert value in credit score field.");
    expect(mockFetchDataFunction).not.toHaveBeenCalled();
   })

   it('credit score input with decimal values', () => {
    wrapper = shallow(
      <InputForm   
        items={[]}
        hasErrored={false}
        isLoading={false}
        fetchData={mockFetchDataFunction}
      />
    )
    expect(wrapper.instance().validate()).toBe(false);

    wrapper.find('FormControl').at(0).simulate(
      'change', 
      {target: 
        {name: 'loan', value: '523532'}
      }
    );
    expect(wrapper.state('search')["loan"]).toEqual("523532");

    wrapper.find('FormControl').at(1).simulate(
      'change', 
      {target: 
        {name: 'property', value: 'SingleFamily'}
      }
    );
    expect(wrapper.state('search')["property"]).toEqual("SingleFamily");

    wrapper.find('FormControl').at(2).simulate(
      'change', 
      {target: 
        {name: 'credit', value: '750.3'}
      }
    );
    expect(wrapper.state('search')["credit"]).toEqual("750.3");

    wrapper.find('FormControl').at(3).simulate(
      'change', 
      {target: 
        {name: 'occupancy', value: 'Primary'}
      }
    );
    expect(wrapper.state('search')["occupancy"]).toEqual("Primary");
    expect(wrapper.state('submitted')).toEqual(false);
    expect(mockFetchDataFunction).not.toHaveBeenCalled();

    wrapper.find('Button').simulate(
      'click', 
      {preventDefault() {}}
    );
    expect(wrapper.state('submitted')).toEqual(false);
    expect(wrapper.instance().validate()).toBe(false); 
    expect(wrapper.state('errString')).toBe("Credit score field must be whole number and cannot contain decimal values.");
    expect(mockFetchDataFunction).not.toHaveBeenCalled();
   })

   it('property type field blank, everything else completed', () => {
    wrapper = shallow(
      <InputForm   
        items={[]}
        hasErrored={false}
        isLoading={false}
        fetchData={mockFetchDataFunction}
      />
    )
    expect(wrapper.instance().validate()).toBe(false);

    wrapper.find('FormControl').at(0).simulate(
      'change', 
      {target: 
        {name: 'loan', value: '523532'}
      }
    );
    expect(wrapper.state('search')["loan"]).toEqual("523532");
       
    wrapper.find('FormControl').at(2).simulate(
      'change', 
      {target: 
        {name: 'credit', value: '750'}
      }
    );
    expect(wrapper.state('search')["credit"]).toEqual("750");

    wrapper.find('FormControl').at(3).simulate(
      'change', 
      {target: 
        {name: 'occupancy', value: 'Primary'}
      }
    );
    expect(wrapper.state('search')["occupancy"]).toEqual("Primary");
    expect(wrapper.state('submitted')).toEqual(false);
    expect(mockFetchDataFunction).not.toHaveBeenCalled();

    wrapper.find('Button').simulate(
      'click', 
      {preventDefault() {}}
    );
    expect(wrapper.instance().validate()).toBe(false); 
    expect(wrapper.state('errString')).toBe("Select property type value from drop down.");
    expect(wrapper.state('submitted')).toEqual(false);
    expect(mockFetchDataFunction).not.toHaveBeenCalled();
   })

   it('occupancy type field blank, everything else completed', () => {
    wrapper = shallow(
      <InputForm   
        items={[]}
        hasErrored={false}
        isLoading={false}
        fetchData={mockFetchDataFunction}
      />
    )
    expect(wrapper.instance().validate()).toBe(false);

    wrapper.find('FormControl').at(0).simulate(
      'change', 
      {target: 
        {name: 'loan', value: '523532'}
      }
    );
    expect(wrapper.state('search')["loan"]).toEqual("523532");
      
    wrapper.find('FormControl').at(1).simulate(
      'change', 
      {target: 
        {name: 'property', value: 'SingleFamily'}
      }
    );
    expect(wrapper.state('search')["property"]).toEqual("SingleFamily");

    wrapper.find('FormControl').at(2).simulate(
      'change', 
      {target: 
        {name: 'credit', value: '750'}
      }
    );
    expect(wrapper.state('search')["credit"]).toEqual("750");
    expect(wrapper.state('submitted')).toEqual(false);
    expect(mockFetchDataFunction).not.toHaveBeenCalled();

    wrapper.find('Button').simulate(
      'click', 
      {preventDefault() {}}
    );
    expect(wrapper.instance().validate()).toBe(false); 
    expect(wrapper.state('errString')).toBe("Select occupancy value from drop down.");
    expect(wrapper.state('submitted')).toEqual(false);
    expect(mockFetchDataFunction).not.toHaveBeenCalled();
   })
});

