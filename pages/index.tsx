import { useSelector, useDispatch } from 'react-redux';
import styles from '../src/assets/styles/style.module.css';
import { ProductCard } from '../src/components/products/index';
import { useEffect } from 'react';
import { fetchProducts } from '../src/redux/products/operations';
import { getProducts } from '../src/redux/products/selectors';

const Index = (): JSX.Element => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const products = getProducts(selector);
    const query = window.location.search;
    const gender = /^\?gender=/.test(query) ? query.split('?gender=')[1] : '';
    const category = /^\?category=/.test(query)
        ? query.split('?category=')[1]
        : '';

    useEffect(() => {
        dispatch(fetchProducts(gender, category));
    }, [query]);

    return (
        <section className={styles.cSectionWrapin}>
            <div className={styles.pGridRow}>
                {products.length > 0 &&
                    products.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            images={product.images}
                            price={product.price}
                        />
                    ))}
            </div>
        </section>
    );
};

export default Index;
