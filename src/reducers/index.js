import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading } from './rates';

export default combineReducers({
    items,
    itemsHasErrored,
    itemsIsLoading  
});
