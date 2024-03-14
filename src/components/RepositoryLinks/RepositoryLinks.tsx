import { useAppSelector } from "../../app/hooks";
import { selectRepositoryInfo } from "../../features/repository/repositorySlice";

import { formatStarsAmount } from "../../utils/formatStarsAmount/formatStarsAmount";

import PathArrow from "../UI/icons/PathArrowSvg";
import StarSvg from "../UI/icons/StarSvg";

import styles from "./RepositoryLinks.module.css";

const RepositoryLinks: React.FC = () => {
    const repositoryInfo = useAppSelector(selectRepositoryInfo);

    return (
        <section className={styles.repositoryInfo}>
            {repositoryInfo ? (
                <>
                    <div className={styles.links} role="display-info">
                        <a
                            href={repositoryInfo.owner.html_url}
                            className={styles.infoLinks}
                            target="_blank"
                        >
                            {repositoryInfo.owner.login}
                        </a>
                        <PathArrow />
                        <a
                            href={repositoryInfo.html_url}
                            className={styles.infoLinks}
                            target="_blank"
                        >
                            {repositoryInfo.name}
                        </a>
                    </div>
                    <div className={styles.stars}>
                        <StarSvg />
                        <span>{`${formatStarsAmount(
                            repositoryInfo.stargazers_count
                        )} Stars`}</span>
                    </div>
                </>
            ) : (
                <p className={styles.instruction}>
                    load the repository for information
                </p>
            )}
        </section>
    );
};

export default RepositoryLinks;
