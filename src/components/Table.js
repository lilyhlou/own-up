import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Alert, Row, Col } from 'react-bootstrap';

export class RateTable extends Component {
    render() {
        if (!this.props.submitted || this.props.isLoading) { 
            return <p></p>;
        }
        if (this.props.hasErrored) { // error from API 
            return 	<Row>
                        <Col>
                            <Alert variant="danger" className='d-block'>
                                Sorry, there was an error loading the items. Try refreshing and submitting again.
                            </Alert>
                        </Col>
                    </Row>
        }
        if(this.props.submitted && this.props.items.length === 0) { // api returned no results in items list
            return <Alert variant="warning">
                        No results found.  
                    </Alert>
        }

        return (
            <Table responsive>
                <thead>
                    <tr>
                        <th>LENDER</th>
                        <th>PRODUCT</th>
                        <th >RATE</th>
                        <th>CLOSING COSTS</th>
                        <th>MONTHLY PAYMENT</th>
                        <th>APR</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.items.map((item, i) => (
                        <tr key={i}>
                        <td>{(item.lenderName.length > 14) ? item.lenderName.substr(0, 13) + '...' : item.lenderName}</td> 
                        <td >{item.loanType}</td> 
                        <td >{item.interestRate.toFixed(3)}%</td> 
                        <td >${item.closingCosts.toFixed(2)}</td> 
                        <td >${item.monthlyPayment.toFixed(2)}</td> 
                        <td>{item.apr.toFixed(3)}%</td> 
                        </tr>
                        ))}
                </tbody>
            </Table>
        );
    }
}

RateTable.propTypes = {
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

export default connect(mapStateToProps)(RateTable);
