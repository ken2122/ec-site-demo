import { useCallback } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/styles';
import { PrimaryButton } from '../UIkit/index';
import { useDispatch } from 'react-redux';
import { push } from 'connected-next-router';
import { OrderedProductsProps, OrderProduct } from '../../../types/index';

const useStyles = makeStyles(() => ({
    list: {
        background: '#fff',
        height: 'auto',
        display: 'flex',
        flexFlow: 'row wrap',
    },
    image: {
        objectFit: 'cover',
        margin: '8px 16px 8px 0',
        height: 96,
        width: 96,
    },
    text: {
        width: '40%',
    },
}));

const OrderedProducts = (props: OrderedProductsProps): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const products = props.products;

    const goToProductPage = useCallback((id: string) => {
        dispatch(push('/product/' + id));
    }, []);

    return (
        <List>
            {Object.keys(products).map((index) => {
                const product: OrderProduct = products[index];
                return (
                    <>
                        <ListItem className={classes.list} key={product.id}>
                            <ListItemAvatar>
                                <img
                                    className={classes.image}
                                    src={product.images[0].path}
                                    alt="商品のTOP画像"
                                />
                            </ListItemAvatar>
                            <div className={classes.text}>
                                <ListItemText
                                    primary={product.name}
                                    secondary={'サイズ：' + product.size}
                                />
                                <ListItemText
                                    primary={
                                        '¥' + product.price.toLocaleString()
                                    }
                                />
                            </div>
                            <PrimaryButton
                                label={'商品詳細を見る'}
                                clickEvent={() => goToProductPage(product.id)}
                            />
                        </ListItem>
                        <Divider />
                    </>
                );
            })}
        </List>
    );
};

export default OrderedProducts;
