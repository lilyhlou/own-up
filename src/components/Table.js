import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
    render() {
        if (!this.props.submitted) {
            return <p></p>;
        }
        if (this.props.hasErrored) {
            return <p>Sorry, there was an error loading the items. Try refreshing and submitting again.</p>;
        }
        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }
        this.props.items.map((item) => (
           console.log(item)
        ));

        return (
            <ul>
                {this.props.items.map((item, i) => (
                   <div key={i}>
                   <li>{item.lenderName}</li> 
                   <li>{item.loanType}</li> 
                   </div>
                ))}
            </ul>
        );
    }
}

Table.propTypes = {
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


export default connect(mapStateToProps)(Table);
