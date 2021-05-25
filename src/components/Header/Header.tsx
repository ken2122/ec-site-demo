import { useCallback, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-next-router';
import { getIsSignedIn } from '../../redux/users/selectors';
import { HeaderMenus, ClosableDrawer } from './index';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuBar: {
            backgroundColor: '#fff',
            color: '#444',
        },
        toolbar: {
            margin: '0 auto',
            maxWidth: 1024,
            width: '100%',
        },
        iconButtons: {
            margin: '0 0 0 auto',
        },
    })
);

const Header = (): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const isSignedIn = getIsSignedIn(selector);

    const [sideBarOpen, setSideBarOpen] = useState(false);

    const handleDrawerToggle = useCallback(
        (isOpen: boolean, event?: React.KeyboardEvent) => {
            if (event) {
                if (
                    event.type === 'keydown' &&
                    (event.key === 'Tab' ||
                        event.key === 'Shift' ||
                        event.key === 'Control')
                ) {
                    return;
                }
            }
            setSideBarOpen(isOpen);
        },
        [setSideBarOpen]
    );

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.menuBar}>
                <Toolbar className={classes.toolbar}>
                    <img
                        alt="Logo"
                        src={'/img/icons/logo.png'}
                        width="128px"
                        onClick={() => dispatch(push('/'))}
                        role="button"
                    />
                    {isSignedIn && (
                        <div className={classes.iconButtons}>
                            <HeaderMenus
                                handleDrawerToggle={handleDrawerToggle}
                            />
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <ClosableDrawer open={sideBarOpen} onClose={handleDrawerToggle} />
        </div>
    );
};
export default Header;
