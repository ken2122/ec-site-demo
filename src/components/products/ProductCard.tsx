import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import { push } from 'connected-next-router';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useState } from 'react';
import { deleteProduct } from '../../redux/products/operations';
import { ProductCardProps } from '../../../types/index';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            margin: 8,
            width: 'calc(50% - 16px)',
        },
        [theme.breakpoints.up('md')]: {
            margin: 16,
            width: 'calc(33.3333% - 32px)',
        },
    },
    content: {
        display: 'flex',
        padding: '16 8',
        textAlign: 'left',
        '&:last-child': {
            paddingBottom: 16,
            justifyContent: 'space-between',
        },
    },
    media: {
        height: 0,
        paddingTop: '100%',
    },
    price: {
        color: theme.palette.secondary.dark,
        fontSize: 16,
    },
}));

const ProductCard = (props: ProductCardProps): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState<Element>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const price = props.price.toLocaleString();
    const images =
        props.images.length > 0
            ? props.images
            : [{ path: '/img/src/no_image.png' }];

    return (
        <Card className={classes.root}>
            <CardMedia
                image={images[0].path}
                className={classes.media}
                title=""
                onClick={() => dispatch(push('/product/' + props.id))}
            />
            <CardContent className={classes.content}>
                <div onClick={() => dispatch(push('/product/' + props.id))}>
                    <Typography color="textSecondary" component="p">
                        {props.name}
                    </Typography>
                    <Typography className={classes.price} component="p">
                        ¥{price}
                    </Typography>
                </div>
                <div>
                    <IconButton onClick={handleClick}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem
                            onClick={() => {
                                dispatch(push('/templates/' + props.id));
                                handleClose();
                            }}
                        >
                            編集する
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                dispatch(deleteProduct(props.id));
                                handleClose();
                            }}
                        >
                            削除する
                        </MenuItem>
                    </Menu>
                </div>
            </CardContent>
        </Card>
    );
};
export default ProductCard;
