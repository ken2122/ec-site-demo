import { useState, useCallback } from 'react';
import styles from '../../src/assets/styles/style.module.css';
import { TextInput, PrimaryButton } from '../../src/components/UIkit/index';
import { signUp } from '../../src/redux/users/operations';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

const SignUp = (): JSX.Element => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState(''),
        [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [confirmPassword, setConfirmPassword] = useState('');

    const inputUsername = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(event.target.value);
        },
        [setUsername]
    );

    const inputEmail = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
        },
        [setEmail]
    );

    const inputPassword = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
        },
        [setPassword]
    );

    const inputConfirmPassword = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setConfirmPassword(event.target.value);
        },
        [setConfirmPassword]
    );

    return (
        <div className={styles.cSectionContainer}>
            <h2 className={`${styles.uTextHeadline} ${styles.uTextCenter}`}>
                アカウント登録
            </h2>
            <div className={styles.moduleSpacerMedium} />
            <TextInput
                fullWidth={true}
                label={'ユーザー名'}
                multiline={false}
                required={true}
                rows={1}
                value={username}
                type={'text'}
                onChange={inputUsername}
            />
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
            <TextInput
                fullWidth={true}
                label={'パスワード'}
                multiline={false}
                required={true}
                rows={1}
                value={password}
                type={'password'}
                onChange={inputPassword}
            />
            <TextInput
                fullWidth={true}
                label={'パスワード(再確認)'}
                multiline={false}
                required={true}
                rows={1}
                value={confirmPassword}
                type={'password'}
                onChange={inputConfirmPassword}
            />
            <div className={styles.moduleSpacerMedium} />
            <div className={styles.center}>
                <PrimaryButton
                    label={'アカウントを登録する'}
                    clickEvent={() =>
                        dispatch(
                            signUp(username, email, password, confirmPassword)
                        )
                    }
                />
                <div className={styles.moduleSpacerMedium} />

                <Link href="/templates/SignIn">
                    <a>アカウントをお持ちの方はこちら</a>
                </Link>
            </div>
        </div>
    );
};
export default SignUp;
