export function itemsHasErrored(bool, dispatch) {
    dispatch(itemsIsLoading(false));
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function itemsIsLoading(bool) {
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    };
}

export function itemsFetchDataSuccess(items, dispatch) {
    dispatch(itemsIsLoading(false));
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items
    };
}

export function itemsFetchData(url) {
    require('dotenv').config();
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch(url, {
            method: 'GET',
            headers: new Headers({
              'Authorization': 'OU-AUTH ' + process.env.REACT_APP_API_KEY
            })
        })
            .then((response) => {
                if (!response.ok) {
                    console.log(response);
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(itemsFetchDataSuccess(items.rateQuotes, dispatch)))
            .catch(() => dispatch(itemsHasErrored(true, dispatch)));
    };
}

