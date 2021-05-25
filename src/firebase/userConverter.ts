import {
    Product,
    Category,
    User,
    ProductInCart,
    Order,
} from '../../types/index';
import firebase from 'firebase/app';

type UserConverter<T> = {
    toFirestore(data: T): firebase.firestore.DocumentData;
    fromFirestore(
        snapshot: firebase.firestore.QueryDocumentSnapshot,
        options: firebase.firestore.SnapshotOptions
    ): T;
};

export const userConverterProducts: UserConverter<Product> = {
    toFirestore(products) {
        return {
            category: products.category,
            created_at: products.created_at,
            description: products.description,
            gender: products.gender,
            id: products.id,
            images: products.images,
            name: products.name,
            price: products.price,
            sizes: products.sizes,
            updated_at: products.updated_at,
        };
    },

    fromFirestore(snapshot, options) {
        const data = snapshot.data(options);

        return {
            category: data.category,
            created_at: data.created_at,
            description: data.description,
            gender: data.gender,
            id: data.id,
            images: data.images,
            name: data.name,
            price: data.price,
            sizes: data.sizes,
            updated_at: data.updated_at,
        };
    },
};

export const userConverterCategories: UserConverter<Category> = {
    toFirestore(categories) {
        return {
            id: categories.id,
            name: categories.name,
            order: categories.order,
        };
    },

    fromFirestore(snapshot, options) {
        const data = snapshot.data(options);

        return {
            id: data.id,
            name: data.name,
            order: data.order,
        };
    },
};

export const userConverterUsers: UserConverter<User> = {
    toFirestore(user) {
        return {
            created_at: user.created_at,
            email: user.email,
            role: user.role,
            uid: user.uid,
            update_at: user.update_at,
            username: user.username,
        };
    },

    fromFirestore(snapshot, options) {
        const data = snapshot.data(options);

        return {
            created_at: data.created_at,
            email: data.email,
            role: data.role,
            uid: data.uid,
            update_at: data.update_at,
            username: data.username,
        };
    },
};

export const userConverterCart: UserConverter<ProductInCart> = {
    toFirestore(cart) {
        return {
            added_at: cart.added_at,
            cartId: cart.cartId,
            description: cart.description,
            gender: cart.gender,
            images: cart.images,
            name: cart.name,
            price: cart.price,
            productId: cart.productId,
            quantity: cart.quantity,
            size: cart.size,
        };
    },

    fromFirestore(snapshot, options) {
        const data = snapshot.data(options);

        return {
            added_at: data.added_at,
            cartId: data.cartId,
            description: data.description,
            gender: data.gender,
            images: data.images,
            name: data.name,
            price: data.price,
            productId: data.productId,
            quantity: data.quantity,
            size: data.size,
        };
    },
};

export const userConverterOrders: UserConverter<Order> = {
    toFirestore(orders) {
        return {
            amount: orders.amount,
            created_at: orders.created_at,
            id: orders.id,
            products: orders.products,
            shipping_date: orders.shipping_date,
            updated_at: orders.updated_at,
        };
    },

    fromFirestore(snapshot, options) {
        const data = snapshot.data(options);

        return {
            amount: data.amount,
            created_at: data.created_at,
            id: data.id,
            products: data.products,
            shipping_date: data.shipping_date,
            updated_at: data.updated_at,
        };
    },
};
