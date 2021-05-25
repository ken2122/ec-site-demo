import firebase from 'firebase/app';

type FirebaseTimestamp = firebase.firestore.Timestamp;

export type Image = {
    id: string;
    path: string;
};

export type Size = {
    quantity: number;
    size: string;
};

export type User = {
    created_at: FirebaseTimestamp;
    email: string;
    role: string;
    uid: string;
    update_at: FirebaseTimestamp;
    username: string;
};

export type Category = {
    id: string;
    name: string;
    order: string;
};

export type Product = {
    category: string;
    created_at?: string;
    description: string;
    gender: string;
    id?: string;
    images: Image[];
    name: string;
    price: number;
    sizes: Size[];
    updated_at: string;
};

export type ProductInCart = {
    added_at: FirebaseTimestamp;
    cartId?: string;
    description: string;
    gender: string;
    images: Image[];
    name: string;
    price: number;
    productId: string;
    quantity: number;
    size: string;
};

export type List = {
    id: string;
    name: string;
};

export type OrderProduct = {
    id: string;
    images: Image[];
    name: string;
    price: number;
    size: string;
};

export type Order = {
    amount: number;
    created_at: FirebaseTimestamp;
    id: string;
    products: OrderProduct[];
    shipping_date: FirebaseTimestamp;
    updated_at: FirebaseTimestamp;
};

export type FilterAndMenu = {
    func: (path: string, event?: React.KeyboardEvent) => void;
    label: string;
    icon?: JSX.Element;
    id: string;
    value: string;
};
