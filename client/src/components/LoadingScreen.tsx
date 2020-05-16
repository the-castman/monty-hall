import React, { useState, useEffect } from 'react';
import { ReactComponent as Goat } from 'src/images/goat.svg';
import { ReactComponent as Car } from 'src/images/car.svg';

import styles from 'src/styles/components/LoadingScreen.module.scss';

const loadingQoutes = [
    "Declaring variables...",
    "Executing if statements...",
    "Running those for loops...",
    "Exhausting resources..."
] as Array<String>;

const LoadingScreen = () => {
    const [currentLoadingQoute, setLoadingQoute] = useState(loadingQoutes[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingQoute(loadingQoutes[Math.floor(Math.random() * loadingQoutes.length)]);
        }, 1500);

        return () => { clearInterval(interval); }
    }, []);

    return (
        <>
            <div className={styles.loadingScreen}>
                <Goat className={styles.goatAnimation} />
                <Car className={styles.carAnimation} />
            </div>
            <h2>{currentLoadingQoute}</h2>
        </>
    )
}

export default LoadingScreen;