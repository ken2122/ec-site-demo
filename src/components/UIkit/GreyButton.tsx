import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import { createStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { PrimaryButtonProps } from '../../../types/index';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            backgroundColor: theme.palette.grey['300'],
            fontSize: 16,
            height: 48,
            marginBottom: 16,
            width: 256,
        },
    })
);

const GreyButton = (props: PrimaryButtonProps): JSX.Element => {
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

export default GreyButton;
