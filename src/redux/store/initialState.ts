import { InitialState } from '../../../types/index';

const initialState: InitialState = {
    products: {
        list: [],
    },
    users: {
        cart: [],
        isSignedIn: false,
        orders: [],
        role: '',
        uid: '',
        username: '',
    },
};

export default initialState;
