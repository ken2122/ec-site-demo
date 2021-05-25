import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useCallback } from 'react';
import styles from '../../src/assets/styles/style.module.css';
import { makeStyles, Theme } from '@material-ui/core/styles';
import HTMLReactParser from 'html-react-parser';
import { FirebaseTimestamp, fetchDbProduct } from '../../src/firebase/index';
import { ImageSwiper, SizeTable } from '../../src/components/products/index';
import { addProductToCart } from '../../src/redux/users/operations';
import { useDispatch } from 'react-redux';
import { Product, PageProps } from '../../types/index';

interface Params extends ParsedUrlQuery {
    ProductDetail: string;
}

export const getServerSideProps: GetServerSideProps<PageProps, Params> =
    async ({ params }) => {
        const id = params.ProductDetail;
        const product: Product = await fetchDbProduct(id);
        return {
            props: {
                product,
            },
        };
    };

const useStyles = makeStyles((theme: Theme) => ({
    sliderBox: {
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto 24px auto',
            height: 320,
            width: 320,
        },
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto',
            height: 400,
            width: 400,
        },
    },
    detail: {
        textAlign: 'left',
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto 16px auto',
            height: 320,
            width: 320,
        },
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto',
            height: 'auto',
            width: 400,
        },
    },
    price: {
        fontSize: 36,
    },
}));

export const returnCodeToBr = (
    text: string
): string | JSX.Element | JSX.Element[] => {
    if (text === '') {
        return text;
    } else {
        return HTMLReactParser(text.replace(/\r?\n/g, '<br/>'));
    }
};

const ProductDetail = ({ product }: PageProps): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const addProduct = useCallback(
        (selectedSize: string) => {
            const timestamp = FirebaseTimestamp.now();
            dispatch(
                addProductToCart({
                    added_at: timestamp,
                    description: product.description,
                    gender: product.gender,
                    images: product.images,
                    name: product.name,
                    price: product.price,
                    productId: product.id,
                    quantity: 1,
                    size: selectedSize,
                })
            );
        },
        [product]
    );

    return (
        <section className={styles.cSectionWrapin}>
            <div className={styles.pGridRow}>
                <div className={classes.sliderBox}>
                    <ImageSwiper images={product.images} />
                </div>
                <div className={classes.detail}>
                    <h2 className={styles.uTextHeadline}>{product.name}</h2>
                    <p className={classes.price}>
                        ¥{product.price.toLocaleString()}
                    </p>
                    <div className={styles.moduleSpacerSmall} />
                    <SizeTable addProduct={addProduct} sizes={product.sizes} />
                    <div className={styles.moduleSpacerSmall} />
                    <p>{returnCodeToBr(product.description)}</p>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;
