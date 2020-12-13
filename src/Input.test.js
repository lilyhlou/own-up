import React from "react";
import { shallow, configure, mount, render } from 'enzyme';
import { InputForm } from "./components/Input";
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
  // our mock login function to replace the one provided by mapDispatchToProps
  const mockfunction = jest.fn();
  it('submit button', () => {
    wrapper = shallow(<InputForm   
      items={[]}
      hasErrored={false}
      isLoading={false}
      fetchData={mockfunction}/>)

    console.log(wrapper.debug());
    wrapper.find('Button').simulate(
      'submit', 
      {preventDefault() {}}
    )
    expect(mockfunction.mock.calls.length).toBe(0)
   })
   it('show error alert', () => {
    wrapper = shallow(<InputForm   
      items={[]}
      hasErrored={false}
      isLoading={false}
      fetchData={mockfunction}/>)
      expect(wrapper.instance().validate()).toBe(false);

      wrapper.find('FormControl').at(0).simulate(
        'onChange', 
        {target: 
          {name: 'loan', value: '523532'}
        }
       );
       wrapper.find('FormControl').at(1).simulate(
        'onChange', 
        {target: 
          {name: 'property', value: 'SingleFamily'}
        }
       );
       wrapper.find('FormControl').at(2).simulate(
        'onChange', 
        {target: 
          {name: 'credit', value: '750'}
        }
       );
       wrapper.find('FormControl').at(3).simulate(
        'onChange', 
        {target: 
          {name: 'occupancy', value: 'Primary'}
        }
       );
       wrapper.find('Button').simulate(
        'submit', 
        {preventDefault() {}}
      );
  
      expect(wrapper.instance().validate()).toBe(true);
  
   })

});



/*

  it('test button click state change', () => {
    const onSubmitFn = jest.fn();
    const wrapper = mount(  
      <Provider store={store}>
      <InputForm onSubmit={onSubmitFn}/>
      </Provider>
    );
    const form = wrapper.find('form').first();
    form.simulate('submit');
    //console.log(form.debug())
    expect(onSubmitFn).toHaveBeenCalledTimes(1);

    //expect(Object.keys(wrapper.state('submitted'))).toBe(false);
  });
  it('test filling form', () => {
    const wrapper = mount(  
      <Provider store={store}>
        <InputForm store={store}/>
      </Provider>
    );
    const formPropsFromReduxForm = wrapper.find(InputForm).props(); // enzyme
    expect(
        formPropsFromReduxForm
      ).to.be.deep.equal({
        search: {}, 
        submitted: false, 
        loanErr: false, 
        propertyErr: false,
        creditErr: false,
        occupancyErr: false,
        errString: ""   
      });


    //wrapper.find('form').simulate('click'); // click submit on empty form.
    //wrapper.instance().validate().toBe(false);
    //const result = InputForm.prototype.validate.call();
    //expect(result).toBe(false);

    //expect(wrapper.find(InputForm).dive().state('loanErr')).toEqual(true);
    //.state('addNewOnSubmit')).toEqual(true)
    console.log(wrapper.debug());

    console.log(wrapper.dive().debug());
    //instance = wrapper.instance();
    //instance.vertify()
    //expect(instance.verifyInputs(state)).toBe(false);

    //const event = { target: { value: "59244" } };
    //wrapper.find("input").first().simulate("change", event);
    
    //expect(wrapper.find.props('search')).toBe("59244");

  })


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
