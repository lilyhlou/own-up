import React, { Component, Fragment, useState, useEffect } from 'react';
import '../App.css';
import { Form, FormControl, Container, Row, Col, InputGroup, Button } from 'react-bootstrap';


class InputForm extends Component {
	  render() {
		return(
			<Form id="forMedScreen">
  				<Form.Row>
					<Form.Group as={Col} md className="d-flex justify-content-end">     
						<div className="form-inline">
						<Form.Label>Loan Size</Form.Label>
						<InputGroup className="mb-3 formBox">
						<InputGroup.Prepend>
      						<InputGroup.Text>$</InputGroup.Text>
    					</InputGroup.Prepend>
						<FormControl type="text" placeholder="450,000" size="md" name="myInput"/>
						</InputGroup>
						</div>
					</Form.Group>
					<Form.Group as={Col} md className="d-flex justify-content-end"> 
						<div className="form-inline">
						<Form.Label>Property Type</Form.Label>
						<Form.Control as="select" size="md" name="property" className="formBox">
							<option>Single Family</option>
							<option>Condo</option>
							<option>Townhouse</option>
							<option>Multi-Family</option>
						</Form.Control>
						</div>
					</Form.Group>
  				</Form.Row>
  				<Form.Row>
    				<Form.Group as={Col} md className="d-flex justify-content-end">
						<div className="form-inline">
						<Form.Label>Credit Score</Form.Label>
						<FormControl type="text" placeholder="600-800" id="bar" size="md" name="credit" className="formBox"/>
						</div>
					</Form.Group>
    				<Form.Group as={Col} md className="d-flex justify-content-end">
						<div className="form-inline">
							<Form.Label>Occupancy</Form.Label>
							<Form.Control as="select" size="md" name="occupancy" className="formBox">
								<option>Primary Residence</option>
								<option>Secondary Residence</option>
								<option>Investment</option>
							</Form.Control>
						</div>
					</Form.Group>
  				</Form.Row>
				<Form.Row>
					<Form.Group as={Col} md className="d-flex justify-content-end button">
						<Button
							type="submit"
							className="blackBackground"
						>
							Quote Rates
						</Button>
					</Form.Group>
				</Form.Row>
  			</Form>
		);
	}
}
export default InputForm;

