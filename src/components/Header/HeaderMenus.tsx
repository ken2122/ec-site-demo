import { useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Badge } from '@material-ui/core';
import { fetchProductsInCart } from '../../redux/users/operations';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsInCart, getUserId } from '../../redux/users/selectors';
import { push } from 'connected-next-router';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuIcon from '@material-ui/icons/Menu';
import { db, userConverterCart } from '../../firebase/index';
import { HeaderMenusProps } from '../../../types/index';

const HeaderMenu = (props: HeaderMenusProps): JSX.Element => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const userId = getUserId(selector);
    let productsInCart = getProductsInCart(selector);

    // Listen products in user's cart
    useEffect(() => {
        const unsubscribe = db
            .collection('users')
            .doc(userId)
            .collection('cart')
            .withConverter(userConverterCart)
            .onSnapshot((snapshots) => {
                snapshots.docChanges().forEach((change) => {
                    const product = change.doc.data();
                    const changeType = change.type;
                    let index: number;

                    switch (changeType) {
                        case 'added':
                            productsInCart.push(product);
                            break;
                        case 'modified':
                            index = productsInCart.findIndex(
                                (product) => product.cartId === change.doc.id
                            );
                            productsInCart[index] = product;
                            break;
                        case 'removed':
                            productsInCart = productsInCart.filter(
                                (product) => product.cartId !== change.doc.id
                            );
                            break;
                        default:
                            break;
                    }
                });

                dispatch(fetchProductsInCart(productsInCart));
            });

        return () => unsubscribe();
    }, []);

    return (
        <>
            {productsInCart && (
                <>
                    <IconButton
                        onClick={() => dispatch(push('/templates/CartList'))}
                    >
                        <Badge
                            badgeContent={productsInCart.length}
                            color="secondary"
                        >
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>

                    <IconButton
                        aria-label="Menu Items"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={() => props.handleDrawerToggle(true)}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                </>
            )}
        </>
    );
};

export default HeaderMenu;
