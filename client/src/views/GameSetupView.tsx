import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import SetupForm from 'src/components/SetupForm';
import LoadingScreen from 'src/components/LoadingScreen';
import { post, fetchDelay } from "src/utils/fetch";
import { GameSetup } from 'src/models/GameSetup';
import { ExecutionResult } from 'src/models/ExecutionResult';

import styles from 'src/styles/components/GameSetupView.module.scss';

const GameSetupView = () => {
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	const _onSetupFormSubmit = (setup: GameSetup) => {
		setLoading(true);

		// "fetchDelay" is for the loading screen to appear and give a loading visual feedback
		// This would of course not be used this way on a production application, only for demo. ;)
		post("/api/run", setup)
			.then(fetchDelay)
			.then((result: ExecutionResult) => {
				setLoading(false);

				if (result.ok) {
					history.push(`/result/${result.resultId}`);
				}
			})
			.catch((error) => {
				console.log('Run submit failed: ', error);
				setLoading(false); // TODO: handle error a better way
			});
	}

	if (loading) {
		return <LoadingScreen />
	}

	return (
		<section className={styles.gameSetupContainer}>
			<SetupForm onSetupSubmitted={_onSetupFormSubmit} />
		</section>
	);
}

export default GameSetupView;