import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import styles from 'src/styles/components/App.module.scss';

const GameSetupView = React.lazy(() => import('./views/GameSetupView'))
const ResultView = React.lazy(() => import('./views/ResultView'))
const NotFoundView = React.lazy(() => import('./views/NotFoundView'))

function App() {
	return (
		<div className={styles.appContainer}>
			<header>
				<h1>Monty Hall game simulation</h1>
			</header>
			<Suspense fallback={<h2>Loading!</h2>}>
				<Router>
					<Switch>
						<Route exact path="/" component={GameSetupView} />
						<Route path="/result/:id" render={(routeProps) => {
							const { id } = routeProps.match.params;
							return <ResultView resultId={id} />
						}} />
						<NotFoundView />
					</Switch>
				</Router>
			</Suspense>
		</div>
	);
}

export default App;
