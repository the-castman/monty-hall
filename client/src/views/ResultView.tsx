import React, { useEffect, useState } from "react"
import PropTypes from "prop-types";
import { ReactComponent as Goat } from 'src/images/goat.svg';
import { ReactComponent as Car } from 'src/images/car.svg';
import { Link } from "react-router-dom";
import { get } from "src/utils/fetch";
import { SimulationResult } from "src/models/SimulationResult";

import styles from "src/styles/components/ResultView.module.scss";

interface IResultView {
    resultId?: string
}

const ResultView = ({ resultId }: IResultView) => {
    const [result, setResult] = useState<SimulationResult>();

    useEffect(() => {
        if (resultId) {
            get(`/api/results/${resultId}`)
                .then(result => setResult(result))
                .catch(() => console.log('Failed to fetch result!'));
        }
    }, [resultId])

    if (result === null) {
        return <h2>No results to show!</h2>;
    }

    return (
        <div>{result &&
            <>
                <dl className={styles.resultContainer}>
                    <dt>Nr of times the contestant won</dt>
                    <dd className={styles.won}>{result.nrOfTimesWon}</dd>
                    <dt>Nr of times the contestant lost</dt>
                    <dd className={styles.lost}>{result.nrOfTimesLost}</dd>
                    <dt>Total of games run</dt>
                    <dd>{result.totalGamesRun}</dd>
                    <dt>Contestant chose to change doors</dt>
                    <dd>{result.doorChanged ? "Yes" : "No"}</dd>
                </dl>
                <Link to="/" className={styles.tryAgainLink}>Try again?</Link>
            </>}
            <Goat className={styles.goat} />
            <Car className={styles.car} />
        </div>
    )
}

ResultView.propTypes = {
    resultId: PropTypes.string
}

export default ResultView;