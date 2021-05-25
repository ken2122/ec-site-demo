import {
    Order,
    SignInAction,
    StateUsers,
    ProductInCart,
} from '../../../types/index';

export const SIGN_IN = 'SIGN_IN';
export const signInAction = (
    userState: SignInAction
): { type: 'SIGN_IN'; payload: SignInAction } => {
    return {
        type: 'SIGN_IN',
        payload: {
            isSignedIn: true,
            role: userState.role,
            uid: userState.uid,
            username: userState.username,
        },
    };
};

export const SIGN_OUT = 'SIGN_OUT';
export const signOutAction = (): { type: 'SIGN_OUT'; payload: StateUsers } => {
    return {
        type: 'SIGN_OUT',
        payload: {
            isSignedIn: false,
            role: '',
            uid: '',
            username: '',
            cart: [],
            orders: [],
        },
    };
};

export const FETCH_PRODUCTS_IN_CART = 'FETCH_PRODUCTS_IN_CART';
export const fetchProductsInCartAction = (
    products: ProductInCart[]
): {
    type: 'FETCH_PRODUCTS_IN_CART';
    payload: ProductInCart[];
} => {
    return {
        type: 'FETCH_PRODUCTS_IN_CART',
        payload: products,
    };
};

export const FETCH_ORDERS_HISTORY = 'FETCH_ORDERS_HISTORY';
export const fetchOrdersHistoryAction = (
    orders: Order[]
): {
    type: 'FETCH_ORDERS_HISTORY';
    payload: Order[];
} => {
    return {
        type: 'FETCH_ORDERS_HISTORY',
        payload: orders,
    };
};
