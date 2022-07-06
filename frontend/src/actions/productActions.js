import axios from 'axios';

import {
    ALL_PRODUCT_REQUESTS,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUESTS,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants';

export const getProducts = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUESTS });
        const { data } = await axios.get('/api/v1/products');
        dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ALL_PRODUCT_FAIL, payload: error.response.data.message });
    }
}

export const getProductsDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUESTS });
        const { data } = await axios.get(`/api/v1/products/${id}`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });
    } catch (error) {
        dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.response.data.message });
    }
}

// Clear errors.
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}