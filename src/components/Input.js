import React, { Component } from 'react';
import '../App.css';
import { Form, FormControl, Col, InputGroup, Button } from 'react-bootstrap';
import Table from './Table';
import { itemsFetchData } from '../actions/rates';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class InputForm extends Component {
	constructor (props) {
		super(props);
		this.state = { // form inputs are kept in state of input component
		  search: {},
		  submitted: false,
		  items: [],
		};
		//this.validate = this.validate.bind(this);
		this.submit = this.submit.bind(this);
	  }
	  validate() {
		  let search = this.state.search;
		  let valid = true;
		  
		  search["loan"] = parseInt(search["loan"]);  
		  search["credit"] = parseInt(search["credit"]); // convert to string              
		  this.setState({search});
  
		  if(!search["loan"] || isNaN(search["loan"])) { // check if int (parseInt turns string into int if int, to NaN if unable to parse) and if loan exists 
			  valid = false;
		  }
		  if(!search["property"] || search["property"] === "") {
			  valid = false;
		  }
		  if(isNaN(search["credit"]) || search["credit"] < 300 || search["credit"] > 800 ) { // check if int and if credit is between 300 and 800
			  valid = false;
		  }
		  if(!search["occupancy"] || search["occupancy"] === "") {
			valid = false;
		}
		return valid;
	  }
	  submit(e) {
		  e.preventDefault();
		  if(this.validate()) { // ensure that data entered is within bounds
			alert("submitted successfully");
			this.setState({submitted: true});
			this.props.fetchData(`https://ss6b2ke2ca.execute-api.us-east-1.amazonaws.com/Prod/quotes?loanSize=${this.state.search["loan"]}&creditScore=${this.state.search["credit"]}&propertyType=${this.state.search["property"]}&occupancy=${this.state.search["occupancy"]}`);
		} else {
			alert(this.validate());
		  }
	  }  
	  update = (e) => {
		let search = this.state.search;
		search[e.target.name] = e.target.value;        
		this.setState({search});
	}
	render() {
		return(
			<div>
			<Form id="forMedScreen">
  				<Form.Row>
					<Form.Group as={Col} md className="d-flex justify-content-end">     
						<div className="form-inline">
						<Form.Label>Loan Size</Form.Label>
						<InputGroup className="mb-3 formBox">
						<InputGroup.Prepend>
      						<InputGroup.Text>$</InputGroup.Text>
    					</InputGroup.Prepend>
						<FormControl type="text" placeholder="450,000" size="md" name="loan" onChange={(e) => this.update(e)}/>
						</InputGroup>
						</div>
					</Form.Group>
					<Form.Group as={Col} md className="d-flex justify-content-end"> 
						<div className="form-inline">
						<Form.Label>Property Type</Form.Label>
						<Form.Control as="select" defaultValue={'DEFAULT'} size="md" name="property" className="formBox" onChange={(e) => this.update(e)}>
							<option value="DEFAULT" disabled hidden>Select Option</option>
							<option value="SingleFamily">Single Family</option>
							<option value="Condo">Condo</option>
							<option value="Townhouse">Townhouse</option>
							<option value="MultiFamily">Multi-Family</option>
						</Form.Control>
						</div>
					</Form.Group>
  				</Form.Row>
  				<Form.Row>
    				<Form.Group as={Col} md className="d-flex justify-content-end">
						<div className="form-inline">
						<Form.Label>Credit Score</Form.Label>
						<FormControl type="text" placeholder="600-800" id="bar" size="md" name="credit" className="formBox" onChange={(e) => this.update(e)}/>
						</div>
					</Form.Group>
    				<Form.Group as={Col} md className="d-flex justify-content-end">
						<div className="form-inline">
							<Form.Label>Occupancy</Form.Label>
							<Form.Control as="select" size="md" name="occupancy" className="formBox" defaultValue={'DEFAULT'} onChange={(e) => this.update(e)}>
								<option value="DEFAULT" disabled hidden>Select Option</option>
								<option value="Primary">Primary Residence</option>
								<option value="Secondary">Secondary Residence</option>
								<option value="Investment">Investment</option>
							</Form.Control>
						</div>
					</Form.Group>
  				</Form.Row>
				<Form.Row>
					<Form.Group as={Col} md className="d-flex justify-content-end button">
						<Button
							type="submit"
							className="blackBackground"
							onClick={this.submit}
						>
							Quote Rates
						</Button>
					</Form.Group>
				</Form.Row>
  			</Form>
			<Table
				submitted={this.state.submitted}
			>
			</Table>
		</div>
		);
	}
}

InputForm.propTypes = {
	fetchData: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};
const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
		fetchData: (url) => dispatch(itemsFetchData(url)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);

