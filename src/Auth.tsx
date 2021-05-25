import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIsSignedIn } from './redux/users/selectors';
import { listenAuthState } from './redux/users/operations';
import { useRouter } from 'next/router';

const Auth = ({ children }: { children: JSX.Element }): JSX.Element => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const isSignedIn = getIsSignedIn(selector);
    const router = useRouter();

    const terms =
        !isSignedIn &&
        router.pathname !== '/templates/SignIn' &&
        router.pathname !== '/templates/SignUp' &&
        router.pathname !== '/templates/Reset';

    useEffect(() => {
        if (terms) {
            dispatch(listenAuthState());
        }
    }, []);

    if (terms) {
        return <></>;
    } else {
        return children;
    }
};

export default Auth;
