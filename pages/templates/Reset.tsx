import { useState, useCallback } from 'react';
import styles from '../../src/assets/styles/style.module.css';
import { TextInput, PrimaryButton } from '../../src/components/UIkit/index';
import { resetPassword } from '../../src/redux/users/operations';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

const Reset = (): JSX.Element => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');

    const inputEmail = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
        },
        [setEmail]
    );

    return (
        <div className={styles.cSectionContainer}>
            <h2 className={`${styles.uTextHeadline} ${styles.uTextCenter}`}>
                パスワードのリセット
            </h2>
            <div className={styles.moduleSpacerMedium} />

            <TextInput
                fullWidth={true}
                label={'メールアドレス'}
                multiline={false}
                required={true}
                rows={1}
                value={email}
                type={'email'}
                onChange={inputEmail}
            />

            <div className={styles.moduleSpacerMedium} />
            <div className={styles.center}>
                <PrimaryButton
                    label={'パスワードをリセット'}
                    clickEvent={() => dispatch(resetPassword(email))}
                />
                <div className={styles.moduleSpacerMedium} />
                <Link href="/templates/SignIn">
                    <a>ログイン画面に戻る</a>
                </Link>
            </div>
        </div>
    );
};
export default Reset;
