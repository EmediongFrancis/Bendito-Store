import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productReducer, productDetailsReducer } from './reducers/productReducer';

const reducer = combineReducers({
    product: productReducer,
    productDetails: productDetailsReducer
})

let initialState = {}

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;
