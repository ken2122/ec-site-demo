import { Image, Size, Product, List, Order, OrderProduct } from './index';
import { Dispatch, SetStateAction } from 'react';

export type PageProps = {
    product: Product;
    list?: List[];
};

export type ProductCardProps = {
    key: string;
    id: string;
    name: string;
    images: Image[];
    price: number;
};

export type SizeTableProps = {
    addProduct: (selectedSize: string) => void;
    sizes: Size[];
};

export type ImageAreaProps = {
    images: Image[];
    setImages: Dispatch<SetStateAction<Image[]>>;
};

export type ImagePreviewProps = {
    delete: (id: string) => Promise<any>;
    id: string;
    path: string;
    key: string;
};

export type SetSizeAreaProps = {
    sizes: Size[];
    setSizes: Dispatch<SetStateAction<Size[]>>;
};

export type PrimaryButtonProps = {
    label: string;
    clickEvent: Dispatch<any>;
};

export type TextDetailProps = {
    label: string;
    value: string;
};

export type OrderHistoryItemProps = {
    order: Order;
};

export type OrderedProductsProps = {
    products: OrderProduct[];
};

export type ClosableDrawerProps = {
    open: boolean;
    onClose: (isOpen: boolean, event?: React.KeyboardEvent) => void;
};

export type SelectBoxProps = {
    label: string;
    required: boolean;
    value: string;
    select: Dispatch<SetStateAction<string>>;
    options: List[];
};

export type HeaderMenusProps = {
    handleDrawerToggle: (isOpen: boolean, event?: React.KeyboardEvent) => void;
};
