import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Alert, Row, Col } from 'react-bootstrap';

class RateTable extends Component {
    render() {
        if (!this.props.submitted || this.props.isLoading) {
            return <p></p>;
        }
        if(this.props.submitted && this.props.items.length === 0) {
            return 	<Alert variant="warning">
                        No results found.  
                    </Alert>

        }
        if (this.props.hasErrored) {
            return 	<Row>
            <Col>
          <Alert variant="danger" className='d-block'>
          Sorry, there was an error loading the items. Try refreshing and submitting again.
            </Alert>
            </Col>
            </Row>
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
                   <tr>
                   <td key={i+"lenderName"}>{item.lenderName}</td> 
                   <td key={i+"loanType"}>{item.loanType}</td> 
                   <td key={i+"interestRate"}>{item.interestRate}%</td> 
                   <td key={i+"closingCosts"}>${item.closingCosts}</td> 
                   <td key={i+"monthlyPayment"}>${item.monthlyPayment}</td> 
                   <td key={i+"apr"}>{item.apr}%</td> 
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
