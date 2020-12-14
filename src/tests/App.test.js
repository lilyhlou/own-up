import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import App from '../App';
import ReactDOM from 'react-dom';


const mockStore = configureStore([]);
 
describe('App.js snapshot test', () => {
  let store;
  let component;
 
  beforeEach(() => {
      store = mockStore({
      items: [],
      itemsHasErrored: false,
      itemsIsLoading: false,
    });
    component = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
 
  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>
    , div);
    ReactDOM.unmountComponentAtNode(div);

  })
 });

