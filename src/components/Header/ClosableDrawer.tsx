import React, { useEffect, useState } from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { push } from 'connected-next-router';
import { useDispatch } from 'react-redux';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HistoryIcon from '@material-ui/icons/History';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { db, userConverterCategories } from '../../firebase';
import { signOut } from '../../redux/users/operations';
import { FilterAndMenu, ClosableDrawerProps } from '../../../types/index';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: 256,
                flexShrink: 0,
            },
        },
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: 256,
        },
        searchField: {
            alignItems: 'center',
            display: 'flex',
            marginLeft: 32,
        },
    })
);

const ClosableDrawer = (props: ClosableDrawerProps): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const selectMenu = (path: string, event?: React.KeyboardEvent) => {
        dispatch(push(path));
        props.onClose(false, event);
    };

    const [filters, setFilters] = useState<FilterAndMenu[]>([
        { func: selectMenu, label: 'すべて', id: 'all', value: '/' },
        {
            func: selectMenu,
            label: 'メンズ',
            id: 'male',
            value: '/?gender=male',
        },
        {
            func: selectMenu,
            label: 'レディース',
            id: 'female',
            value: '/?gender=female',
        },
    ]);

    const menus: FilterAndMenu[] = [
        {
            func: selectMenu,
            label: '商品登録',
            icon: <AddCircleIcon />,
            id: 'register',
            value: '/templates/ProductEdit',
        },
        {
            func: selectMenu,
            label: '注文履歴',
            icon: <HistoryIcon />,
            id: 'history',
            value: '/templates/OrderHistory',
        },
    ];

    useEffect(() => {
        db.collection('categories')
            .withConverter(userConverterCategories)
            .orderBy('order', 'asc')
            .get()
            .then((snapshots) => {
                const list: FilterAndMenu[] = [];
                snapshots.forEach((snapshot) => {
                    const category = snapshot.data();
                    list.push({
                        func: selectMenu,
                        label: category.name,
                        id: category.id,
                        value: `/?category=${category.id}`,
                    });
                });
                setFilters((prevState) => [...prevState, ...list]);
            });
    }, []);

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            <Drawer
                variant="temporary"
                anchor={'right'}
                open={props.open}
                onClose={() => props.onClose(false)}
                classes={{
                    paper: classes.drawerPaper,
                }}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                <div onKeyDown={(e) => props.onClose(false, e)}>
                    <Divider />
                    <List>
                        {menus.map(
                            (menu) => (
                                <ListItem
                                    button
                                    key={menu.id}
                                    onClick={() => menu.func(menu.value)}
                                >
                                    <ListItemIcon>{menu.icon}</ListItemIcon>
                                    <ListItemText primary={menu.label} />
                                </ListItem>
                            )
                            // )
                        )}
                        <ListItem
                            button
                            key="logout"
                            onClick={() => dispatch(signOut())}
                        >
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary="ログアウト" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {filters.map((filter) => (
                            <ListItem
                                button
                                key={filter.id}
                                onClick={() => filter.func(filter.value)}
                            >
                                <ListItemText primary={filter.label} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
        </nav>
    );
};

export default ClosableDrawer;
