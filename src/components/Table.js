import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { itemsFetchData } from '../actions/rates';

class Table extends Component {
    componentDidMount() {
        console.log(this.props)
        this.props.fetchData('http://599167402df2f40011e4929a.mockapi.io/items');
    }
    render() {
        if (this.props.hasErrored) {
            return <p>Sorry, there was an error loading the items. Try refreshing and submitting again.</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }
        return (
            <div>
            <ul>
                {this.props.items.map((item) => (
                    <li key={item.id}>
                        {item.label}
                    </li>
                ))}
            </ul>
                <p>{this.props.search["credit"]}</p>
                <p>{this.props.search["occupancy"]}</p>
                <p>{this.props.search["property"]}</p>
                <p>{this.props.search["loan"]}</p>

            </div>
        );
    }
}

Table.propTypes = {
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
        fetchData: (url) => dispatch(itemsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
