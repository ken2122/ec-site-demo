import { useCallback } from 'react';
import { PrimaryButton } from '../../src/components/UIkit/index';
import { useDispatch } from 'react-redux';
import { push } from 'connected-next-router';
import styles from '../../src/assets/styles/style.module.css';

const OrderComplete = (): JSX.Element => {
    const dispatch = useDispatch();

    const goBackToTop = useCallback(() => {
        dispatch(push('/'));
    }, []);

    return (
        <div className={styles.cSectionContainer}>
            <p>ご注文ありがとうございました！</p>
            <div className={styles.moduleSpacerMedium} />
            <PrimaryButton
                label="ショッピングを続ける"
                clickEvent={goBackToTop}
            />
        </div>
    );
};

export default OrderComplete;
