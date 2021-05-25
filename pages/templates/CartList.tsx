import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsInCart } from '../../src/redux/users/selectors';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import { CartListItem } from '../../src/components/products/index';
import { PrimaryButton, GreyButton } from '../../src/components/UIkit/index';
import { push } from 'connected-next-router';
import styles from '../../src/assets/styles/style.module.css';

const useStyles = makeStyles(() => ({
    root: {
        margin: '0 auto',
        maxWidth: 512,
        width: '100%',
    },
}));

const CartList = (): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const productsInCart = getProductsInCart(selector);

    const goToOrder = useCallback(() => {
        dispatch(push('/templates/OrderConfirm'));
    }, []);

    const backToTop = useCallback(() => {
        dispatch(push('/'));
    }, []);

    return (
        <section className={styles.cSectionWrapin}>
            <h2 className={styles.uTextHeadline}>ショッピングカート</h2>
            <List className={classes.root}>
                {productsInCart.length > 0 &&
                    productsInCart.map((product) => (
                        <CartListItem product={product} key={product.cartId} />
                    ))}
            </List>
            <div className={styles.moduleSpacerMedium} />
            <div className={styles.pGridColumn}>
                <PrimaryButton label={'レジへ進む'} clickEvent={goToOrder} />
                <div className={styles.moduleSpacerExtraExtraSmall} />
                <GreyButton
                    label={'ショッピングを続ける'}
                    clickEvent={backToTop}
                />
            </div>
        </section>
    );
};

export default CartList;
