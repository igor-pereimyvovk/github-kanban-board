import { useEffect } from "react";
import ErrorSvg from "../icons/ErrorSvg";

import { useAppDispatch } from "../../../app/hooks";
import { setErrorStatusToFalse } from "../../../features/repository/repositorySlice";

import styles from "./ErrorMessage.module.css";

type ErrorMessageProps = {
    errorMessage: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorMessage }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(setErrorStatusToFalse());
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className={styles.modal} data-testid="errorElement">
            <div className={styles.error}>
                <ErrorSvg />
            </div>
            <p className={styles.errorMessage}>{errorMessage}</p>
        </div>
    );
};

export default ErrorMessage;
