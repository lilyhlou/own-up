export function itemsHasErrored(bool) {
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

export function itemsFetchDataSuccess(items) {
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
                    throw Error(response.statusText);
                }
                dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(itemsFetchDataSuccess(items.rateQuotes)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}
