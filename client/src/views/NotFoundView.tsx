import React from "react";
import { ReactComponent as Goat } from 'src/images/goat.svg';

import styles from 'src/styles/components/NotFoundView.module.scss';

const NotFoundView = () => {
    return (
        <section className={styles.notFoundViewContainer}>
            <h1 className={styles.largeErrorCode}>404</h1>
            <h2>Uhoh! You seem to be lost!</h2>
            <div>
                <Goat className={styles.goatAnimation} />
            </div>
        </section>
    )
}

export default NotFoundView;