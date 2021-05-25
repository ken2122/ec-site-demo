import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import { PrimaryButtonProps } from '../../../types/index';

const useStyles = makeStyles({
    button: {
        backgroundColor: '#4dd0e1',
        color: '#000',
        fontSize: 16,
        height: 48,
        marginButton: 16,
        width: 256,
    },
});

const PrimaryButton = (props: PrimaryButtonProps): JSX.Element => {
    const classes = useStyles();

    return (
        <Button
            className={classes.button}
            variant="contained"
            onClick={props.clickEvent}
        >
            {props.label}
        </Button>
    );
};

export default PrimaryButton;
