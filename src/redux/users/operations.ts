import firebase from 'firebase/app';
import {
    auth,
    FirebaseTimestamp,
    db,
    userConverterUsers,
    userConverterCart,
    userConverterOrders,
} from '../../firebase/index';
import {
    signInAction,
    signOutAction,
    fetchProductsInCartAction,
    fetchOrdersHistoryAction,
} from './actions';
import { push } from 'connected-next-router';
import { Dispatch } from 'redux';
import { ProductInCart, Order } from '../../../types/index';
import { DefaultRootState } from 'react-redux';

const usersRef = db.collection('users').withConverter(userConverterUsers);

export const listenAuthState = () => {
    return async (dispatch: Dispatch): Promise<firebase.Unsubscribe> => {
        return auth.onAuthStateChanged((user) => {
            if (user) {
                const uid = user.uid;

                usersRef
                    .doc(uid)
                    .get()
                    .then((snapshot) => {
                        const data = snapshot.data();
                        dispatch(
                            signInAction({
                                isSignedIn: true,
                                role: data.role,
                                uid: uid,
                                username: data.username,
                            })
                        );
                    });
            } else {
                dispatch(push('/templates/SignIn'));
            }
        });
    };
};

export const signIn = (email: string, password: string) => {
    return async (dispatch: Dispatch): Promise<boolean> => {
        if (email === '' || password === '') {
            alert('必須項目が未入力です');
            return false;
        }

        auth.signInWithEmailAndPassword(email, password).then((result) => {
            const user = result.user;

            if (user) {
                const uid = user.uid;

                usersRef
                    .doc(uid)
                    .get()
                    .then((snapshot) => {
                        const data = snapshot.data();

                        dispatch(
                            signInAction({
                                isSignedIn: true,
                                role: data.role,
                                uid: uid,
                                username: data.username,
                            })
                        );
                        dispatch(push('/'));
                    });
            }
        });
    };
};

export const signUp = (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
) => {
    return async (dispatch: Dispatch): Promise<false | void> => {
        if (
            username === '' ||
            email === '' ||
            password === '' ||
            confirmPassword === ''
        ) {
            alert('必須項目が未入力です');
            return false;
        }

        if (password !== confirmPassword) {
            alert('パスワードが一致しません');
            return false;
        }

        return auth
            .createUserWithEmailAndPassword(email, password)
            .then((result) => {
                const user = result.user;
                if (user) {
                    const uid = user.uid;
                    const timeStamp = FirebaseTimestamp.now();
                    const userInitialData = {
                        created_at: timeStamp,
                        email: email,
                        role: 'customer',
                        uid: uid,
                        update_at: timeStamp,
                        username: username,
                    };
                    db.collection('users')
                        .doc(uid)
                        .set(userInitialData)
                        .then(() => {
                            dispatch(push('/'));
                        });
                }
            });
    };
};

export const signOut = () => {
    return async (dispatch: Dispatch): Promise<void> => {
        auth.signOut().then(() => {
            dispatch(signOutAction());
            dispatch(push('/templates/SignIn'));
        });
    };
};

export const resetPassword = (email: string) => {
    return async (dispatch: Dispatch): Promise<boolean> => {
        if (email === '') {
            alert('必須項目が未入力です');
            return false;
        } else {
            auth.sendPasswordResetEmail(email)
                .then(() => {
                    alert(
                        '入力されたアドレスにパスワードリセット用のメールをお送りしました'
                    );
                    dispatch(push('/templates/SignIn'));
                })
                .catch(() => {
                    alert('パスワードリセットに失敗しました');
                });
        }
    };
};

export const addProductToCart = (addedProduct: ProductInCart) => {
    return async (
        dispatch: Dispatch,
        getState: () => DefaultRootState
    ): Promise<void> => {
        const uid = getState().users.uid;
        const cartRef = usersRef
            .doc(uid)
            .collection('cart')
            .withConverter(userConverterCart)
            .doc();
        addedProduct['cartId'] = cartRef.id;
        await cartRef.set(addedProduct);
        dispatch(push('/templates/CartList'));
    };
};

export const fetchProductsInCart = (products: ProductInCart[]) => {
    return async (dispatch: Dispatch): Promise<void> => {
        dispatch(fetchProductsInCartAction(products));
    };
};

export const fetchOrdersHistory = () => {
    return async (
        dispatch: Dispatch,
        getState: () => DefaultRootState
    ): Promise<void> => {
        const uid = getState().users.uid;
        const list: Order[] = [];

        usersRef
            .doc(uid)
            .collection('orders')
            .withConverter(userConverterOrders)
            .orderBy('updated_at', 'desc')
            .get()
            .then((snapshots) => {
                snapshots.forEach((snapshot) => {
                    const data = snapshot.data();
                    list.push(data);
                });
                dispatch(fetchOrdersHistoryAction(list));
            });
    };
};
