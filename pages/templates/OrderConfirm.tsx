import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsInCart } from '../../src/redux/users/selectors';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { CartListItem } from '../../src/components/products/index';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { PrimaryButton, TextDetail } from '../../src/components/UIkit/index';
import { orderProduct } from '../../src/redux/products/operations';
import styles from '../../src/assets/styles/style.module.css';

const useStyles = makeStyles((theme: Theme) => ({
    detailBox: {
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
            width: 320,
        },
        [theme.breakpoints.up('md')]: {
            width: 512,
        },
    },
    orderBox: {
        border: '1px solid rgba(0,0,0,0.2)',
        borderRadius: 4,
        boxShadow: '0 4px 2px 2px rgba(0,0,0,0.2)',
        height: 256,
        margin: '24px auto 16px auto',
        padding: 16,
        width: 288,
    },
}));

const OrderConfirm = (): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const productsInCart = getProductsInCart(selector);

    const subtotal = useMemo(() => {
        return productsInCart.reduce(
            (sum, product) => (sum += product.price),
            0
        );
    }, [productsInCart]);

    const shippingFee: number = useMemo(() => (subtotal >= 10000 ? 0 : 210), [
        subtotal,
    ]);
    const tax = useMemo(() => subtotal * 0.1, [subtotal, shippingFee]);
    const total = useMemo(() => subtotal + shippingFee + tax, [
        subtotal,
        shippingFee,
        tax,
    ]);

    const order = useCallback(() => {
        dispatch(orderProduct(productsInCart, total));
    }, [productsInCart]);

    return (
        <section className={styles.cSectionWrapin}>
            <h2 className={styles.uTextHeadline}>注文の確認</h2>
            <div className={styles.pGridRow}>
                <div className={classes.detailBox}>
                    <List>
                        {productsInCart.length > 0 &&
                            productsInCart.map((product) => (
                                <CartListItem
                                    product={product}
                                    key={product.cartId}
                                />
                            ))}
                    </List>
                </div>
                <div className={classes.orderBox}>
                    <TextDetail
                        label={'商品合計'}
                        value={'¥' + subtotal.toLocaleString()}
                    />
                    <TextDetail
                        label={'消費税'}
                        value={'¥' + tax.toLocaleString()}
                    />
                    <TextDetail
                        label={'送料'}
                        value={'¥' + shippingFee.toLocaleString()}
                    />
                    <Divider />
                    <div className={styles.moduleSpacerExtraExtraSmall} />
                    <TextDetail
                        label={'合計(税込)'}
                        value={'¥' + total.toLocaleString()}
                    />
                    <PrimaryButton
                        label={'注文を確定する'}
                        clickEvent={order}
                    />
                </div>
            </div>
        </section>
    );
};

export default OrderConfirm;
