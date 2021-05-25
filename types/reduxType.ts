import { ProductInCart, Order, Product } from './index';
import { UrlObject } from 'url';

export type StateUsers = {
    cart: ProductInCart[];
    isSignedIn: boolean;
    orders: Order[];
    role: string;
    uid: string;
    username: string;
};

export type StateProducts = {
    list: Product[];
};

export type InitialState = {
    products: StateProducts;
    users: StateUsers;
};

export type SignInAction = {
    isSignedIn?: boolean;
    role: string;
    uid: string;
    username: string;
};

export type UsersAction =
    | { type: 'SIGN_IN'; payload: SignInAction }
    | { type: 'SIGN_OUT'; payload: StateUsers }
    | { type: 'FETCH_PRODUCTS_IN_CART'; payload: ProductInCart[] }
    | { type: 'FETCH_ORDERS_HISTORY'; payload: Order[] };

export type ProductsAction =
    | { type: 'FETCH_PRODUCTS'; payload: Product[] }
    | { type: 'DELETE_PRODUCT'; payload: Product[] };

type Router = {
    location: { href: string; pathname: string; search: string; hash: string };
};

declare module 'react-redux' {
    interface DefaultRootState extends InitialState {
        router: Router;
    }
}

type Url = string | UrlObject;

declare module 'redux' {
    interface AnyAction {
        type:
            | 'SIGN_IN'
            | 'SIGN_OUT'
            | 'FETCH_PRODUCTS_IN_CART'
            | 'FETCH_ORDERS_HISTORY'
            | 'FETCH_PRODUCTS'
            | 'DELETE_PRODUCT'
            | '@@router/CALL_ROUTER_METHOD';
        payload:
            | Product[]
            | SignInAction
            | StateUsers
            | ProductInCart[]
            | Order[]
            | { method: string; args: [Url, Url?, any?] };
    }
}
