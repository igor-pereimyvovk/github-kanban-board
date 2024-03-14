import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    fetchRepository,
    selectIsLoading,
    selectIssuesError,
    setErrorStatusToTrue,
    setIssuesFromLocaleStorage,
} from "../../features/repository/repositorySlice";
import { getRepositoryInfo } from "../../utils/getRepositoryInfo/getRepositoryInfo";
import { isValidUrl } from "../../utils/isValidUrl/isValidUrl";
import ErrorMessage from "../UI/ErrorMessage/ErrorMessage";
import LoadingSvg from "../UI/icons/LoadingSvg/LoadingSvg";
import styles from "./RepositoryForm.module.css";

const RepositoryForm: React.FC = () => {
    const [repositoryUrl, setRepositoryUrl] = useState<string>("");

    const error = useAppSelector(selectIssuesError);
    const isLoading = useAppSelector(selectIsLoading);

    const dispatch = useAppDispatch();

    const handleOnSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (isValidUrl(repositoryUrl)) {
            if (localStorage.getItem(repositoryUrl)) {
                dispatch(
                    setIssuesFromLocaleStorage(
                        localStorage.getItem(repositoryUrl)
                    )
                );
                setRepositoryUrl("");
                return;
            }

            const [owner, repo] = getRepositoryInfo(repositoryUrl);

            dispatch(fetchRepository({ owner, repo })).then((requestInfo) => {
                if (requestInfo.meta.requestStatus === "fulfilled") {
                    setRepositoryUrl("");
                }
            });
        } else {
            dispatch(setErrorStatusToTrue("Incorrect repository url"));
        }
    };

    return (
        <form className={styles.header} onSubmit={handleOnSubmit} role="form">
            <button className={styles.loadIssueButton}>Load issues</button>
            <input
                type="text"
                className={styles.input}
                value={repositoryUrl}
                onChange={(e) => setRepositoryUrl(e.target.value)}
                placeholder="Enter repo URL"
            />
            {error.status && (
                <ErrorMessage errorMessage={error.message as string} />
            )}
            {isLoading && <LoadingSvg />}
        </form>
    );
};

export default RepositoryForm;
