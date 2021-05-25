import { createStore as reduxCreateStore, applyMiddleware, Store } from 'redux';
import { UsersReducer } from '../users/reducers';
import { ProductsReducer } from '../products/reducers';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { createRouterMiddleware, routerReducer } from 'connected-next-router';
import { useMemo } from 'react';

function initStore() {
    return reduxCreateStore(
        combineReducers({
            router: routerReducer,
            users: UsersReducer,
            products: ProductsReducer,
        }),
        applyMiddleware(createRouterMiddleware(), thunk)
    );
}

export function useStore(): Store {
    const store = useMemo(() => initStore(), []);
    return store;
}
