import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import List from '@material-ui/core/List';
import { getOrdersHistory } from '../../src/redux/users/selectors';
import { OrderHistoryItem } from '../../src/components/products/index';
import { fetchOrdersHistory } from '../../src/redux/users/operations';
import { makeStyles } from '@material-ui/styles';
import styles from '../../src/assets/styles/style.module.css';
import { Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    orderList: {
        background: theme.palette.grey['100'],
        margin: '0 auto',
        padding: 32,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        [theme.breakpoints.up('md')]: {
            width: 768,
        },
    },
}));

const OrderHistory = (): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const orders = getOrdersHistory(selector);

    useEffect(() => {
        dispatch(fetchOrdersHistory());
    }, []);

    return (
        <section className={styles.cSectionWrapin}>
            <List className={classes.orderList}>
                {orders.length > 0 &&
                    orders.map((order) => (
                        <OrderHistoryItem order={order} key={order.id} />
                    ))}
            </List>
        </section>
    );
};

export default OrderHistory;
