import './App.css';
import InputForm from './components/Input';
import Header from './components/header';

function App() {

  return (
    <div className="App">
        <Header></Header>
        <h1 id="title"><span>Rate Quote Calculator</span></h1>
        <p id="description">At Own Up we’re always looking to help our customers save money on their mortgage. As such, we want to make sure we’re looking at quotes from multiple local lenders to find the best rate. This calculator helps you compare and calculate mortgage product rate quotes from our lender network. Just fill out the form below to get started.</p>
        <InputForm></InputForm>
    </div>
  );
}

export default App;
