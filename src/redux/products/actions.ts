import { Product } from '../../../types/index';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const fetchProductsAction = (
    products: Product[]
): {
    type: 'FETCH_PRODUCTS';
    payload: Product[];
} => {
    return {
        type: 'FETCH_PRODUCTS',
        payload: products,
    };
};

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const deleteProductAction = (
    products: Product[]
): {
    type: 'DELETE_PRODUCT';
    payload: Product[];
} => {
    return {
        type: 'DELETE_PRODUCT',
        payload: products,
    };
};
