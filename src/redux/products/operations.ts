import { push } from 'connected-next-router';
import {
    FirebaseTimestamp,
    db,
    userConverterProducts,
} from '../../firebase/index';
import { fetchProductsAction, deleteProductAction } from './actions';
import { Dispatch } from 'redux';
import { Product, Size, Image } from '../../../types/index';
import { DefaultRootState } from 'react-redux';
import { ProductInCart, OrderProduct } from '../../../types/index';

const productsRef = db
    .collection('products')
    .withConverter(userConverterProducts);

export const fetchProducts = (gender: string, category: string) => {
    return async (dispatch: Dispatch): Promise<void> => {
        let query = productsRef.orderBy('updated_at', 'desc');
        query = gender !== '' ? query.where('gender', '==', gender) : query;
        query =
            category !== '' ? query.where('category', '==', category) : query;

        query.get().then((snapshots) => {
            const productList: Product[] = [];
            snapshots.forEach((snapshots) => {
                const product = snapshots.data();
                productList.push(product);
                dispatch(fetchProductsAction(productList));
            });
        });
    };
};

export const saveProduct = (
    id: string,
    name: string,
    description: string,
    category: string,
    gender: string,
    price: number,
    images: Image[],
    sizes: Size[]
) => {
    return async (dispatch: Dispatch): Promise<void> => {
        const timestamp = FirebaseTimestamp.now().toDate().toString();

        const data: Product = {
            category: category,
            description: description,
            gender: gender,
            images: images,
            name: name,
            price: parseInt(price.toString(), 10),
            sizes: sizes,
            updated_at: timestamp,
        };

        if (id === 'ProductEdit') {
            const ref = productsRef.doc();
            id = ref.id;
            data.id = id;
            data.created_at = timestamp;
        }

        return db
            .collection('products')
            .doc(id)
            .set(data, { merge: true })
            .then(() => {
                dispatch(push('/'));
            })
            .catch((error: string) => {
                throw new Error(error);
            });
    };
};

export const deleteProduct = (id: string) => {
    return async (
        dispatch: Dispatch,
        getState: () => DefaultRootState
    ): Promise<void> => {
        productsRef
            .doc(id)
            .delete()
            .then(() => {
                const prevProducts = getState().products.list;
                const nextProducts = prevProducts.filter(
                    (product) => product.id !== id
                );
                dispatch(deleteProductAction(nextProducts));
            });
    };
};

export const orderProduct = (
    productsInCart: ProductInCart[],
    price: number
) => {
    return async (
        dispatch: Dispatch,
        getState: () => DefaultRootState
    ): Promise<boolean> => {
        const uid = getState().users.uid;
        const userRef = db.collection('users').doc(uid);
        const timestamp = FirebaseTimestamp.now();
        const products: OrderProduct[] = [];
        const soldOutProducts: string[] = [];

        const batch = db.batch();

        for (const product of productsInCart) {
            const snapshot = await productsRef.doc(product.productId).get();
            const sizes = snapshot.data().sizes;

            // Create a new array of the product sizes
            const updateSizes = sizes.map((sizes) => {
                if (sizes.size === product.size) {
                    if (sizes.quantity === 0) {
                        soldOutProducts.push(product.name);
                        return sizes;
                    }
                    return {
                        size: sizes.size,
                        quantity: sizes.quantity - 1,
                    };
                } else {
                    return sizes;
                }
            });

            products.push({
                id: product.productId,
                images: product.images,
                name: product.name,
                price: product.price,
                size: product.size,
            });

            batch.update(productsRef.doc(product.productId), {
                sizes: updateSizes,
            });
            batch.delete(userRef.collection('cart').doc(product.cartId));
        }

        if (soldOutProducts.length > 0) {
            const errorMessage =
                soldOutProducts.length > 1
                    ? soldOutProducts.join('と')
                    : soldOutProducts[0];
            alert(
                '大変申し訳ありません。' +
                    errorMessage +
                    'が在庫切れとなったため注文処理を中断しました。'
            );
            return false;
        } else {
            batch
                .commit()
                .then(() => {
                    // 注文履歴データを作成
                    const orderRef = userRef.collection('orders').doc();
                    const date = timestamp.toDate();
                    // 配送日を3日後に設定
                    const shippingDate = FirebaseTimestamp.fromDate(
                        new Date(date.setDate(date.getDate() + 3))
                    );

                    const history = {
                        amount: price,
                        created_at: timestamp,
                        id: orderRef.id,
                        products: products,
                        shipping_date: shippingDate,
                        updated_at: timestamp,
                    };
                    orderRef.set(history);
                    dispatch(push('/templates/OrderComplete'));
                })
                .catch(() => {
                    alert(
                        '注文処理に失敗しました。通信環境をご確認のうえ、もう一度お試しください。'
                    );
                    return false;
                });
        }
    };
};
