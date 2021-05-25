import { useState, useCallback } from 'react';
import styles from '../../src/assets/styles/style.module.css';
import { TextInput, PrimaryButton } from '../../src/components/UIkit/index';
import { signIn } from '../../src/redux/users/operations';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

const SignIn = (): JSX.Element => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState(''),
        [password, setPassword] = useState('');

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

    return (
        <div className={styles.cSectionContainer}>
            <h2 className={`${styles.uTextHeadline} ${styles.uTextCenter}`}>
                サインイン
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

            <div className={styles.moduleSpacerMedium} />
            <div className={styles.center}>
                <PrimaryButton
                    label={'サインイン'}
                    clickEvent={() => dispatch(signIn(email, password))}
                />
                <div className={styles.moduleSpacerMedium} />
                <ul>
                    <li>
                        <Link href="/templates/SignUp">
                            <a>アカウントをお持ちでない方はこちら</a>
                        </Link>
                    </li>
                    <div className={styles.moduleSpacerExtraSmall} />
                    <li>
                        <Link href="/templates/Reset">
                            <a>パスワードをお忘れの方はこちら</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default SignIn;
