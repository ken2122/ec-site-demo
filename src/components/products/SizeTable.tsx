import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import IconButton from '@material-ui/core/IconButton';
import TableContainer from '@material-ui/core/TableContainer';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/styles';
import { SizeTableProps } from '../../../types/index';

const useStyles = makeStyles({
    iconCell: {
        padding: 0,
        height: 48,
        width: 48,
    },
});

const SizeTable = (props: SizeTableProps): JSX.Element => {
    const classes = useStyles();
    const sizes = props.sizes;

    return (
        <TableContainer>
            <Table aria-label="simple table">
                <TableBody>
                    {sizes.length > 0 &&
                        sizes.map((item) => (
                            <TableRow key={item.size}>
                                <TableCell component="th" scope="row">
                                    {item.size}
                                </TableCell>
                                <TableCell>残り{item.quantity}点</TableCell>
                                <TableCell className={classes.iconCell}>
                                    {item.quantity > 0 ? (
                                        <IconButton
                                            className={classes.iconCell}
                                            onClick={() =>
                                                props.addProduct(item.size)
                                            }
                                        >
                                            <ShoppingCartIcon />
                                        </IconButton>
                                    ) : (
                                        <div>売切</div>
                                    )}
                                </TableCell>
                                <TableCell className={classes.iconCell}>
                                    <IconButton
                                        className={classes.iconCell}
                                    ></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
export default SizeTable;
