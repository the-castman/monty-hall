import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import { v4 as uuidV4 } from "uuid";

import runMontyHallSimulation from "./MontyHallGameSimulation";
import { GameSetupRequest } from "./models/GameSetupRequest";
import { SimulationResult } from "./models/SimulationResult";
import { ExecutionResult } from "./models/ExecutionResult";

const PORT: number = 3030;
const app: Application = express();
const storedGameResults = new Map<string, SimulationResult>() // Simulate a DB storage, only in memory for now

app.use(helmet());
app.use(express.json());

app.get("/", (request: Request, response: Response) => {
	response.send(`Mounty Hall API runnning on port: ${PORT}`);
});

app.post('/api/run', (request: Request, response: Response) => {
	const setupFromRequest = request.body as GameSetupRequest;

	if (setupFromRequest && setupFromRequest.nrOfGames === 0) {
		response.json({ ok: false } as ExecutionResult);
	}

	const resultId = uuidV4();
	const results = runMontyHallSimulation(
		setupFromRequest.nrOfGames,
		setupFromRequest.changeDoors);

	storedGameResults.set(resultId, results); // Simulate a DB storage

	response.json({ ok: true, resultId } as ExecutionResult);
});

app.get('/api/results/:id', (request: Request, response: Response) => {
	let result: SimulationResult = null;
	const id = request.params.id;

	if (id && storedGameResults.has(id)) {
		result = storedGameResults.get(id);
	}

	response.json(result);
});

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});