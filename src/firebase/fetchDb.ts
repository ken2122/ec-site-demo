import { db, userConverterProducts, userConverterCategories } from './index';
import { Product, List } from '../../types/index';

export const fetchDbProduct = async (id: string): Promise<Product> => {
    let data: Product;
    await db
        .collection('products')
        .withConverter(userConverterProducts)
        .doc(id)
        .get()
        .then((doc) => {
            data = doc.data();
        });
    return data;
};

export const fetchDbCategories = async (): Promise<List[]> => {
    const list: List[] = [];
    await db
        .collection('categories')
        .withConverter(userConverterCategories)
        .orderBy('order', 'asc')
        .get()
        .then((snapshots) => {
            snapshots.forEach((snapshot) => {
                const data = snapshot.data();
                list.push({
                    id: data.id,
                    name: data.name,
                });
            });
        });
    return list;
};

export const fetchProductsId = async (): Promise<string[]> => {
    const id: string[] = [];
    await db
        .collection('products')
        .withConverter(userConverterProducts)
        .get()
        .then((snap) => {
            snap.forEach((doc) => {
                id.push(doc.id);
            });
        });
    return id;
};
