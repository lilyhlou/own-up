import './App.css';
import InputForm from './components/Input';
import Table from './components/Table'
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import ReactDOM, { render } from 'react-dom';

function App() {
  const store = configureStore(); // You can also pass in an initialState here

  return (
    <Provider store={store}>
    <div className="App">
        <InputForm></InputForm>
        <Table></Table>
    </div>
    </Provider>
  );
}

export default App;
