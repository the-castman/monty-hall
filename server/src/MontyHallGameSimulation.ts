import { SimulationResult } from "./models/SimulationResult";
import { Door } from "./models/Door";

const runMontyHallGameSimulaton = (nrOfGamesToRun: number, changeDoors: boolean): SimulationResult => {
    let nrTimesWon: number = 0;
    let nrTimesLost: number = 0;

    // Let the games begin, run all rounds
    for (let gameRun = 0; gameRun < nrOfGamesToRun; gameRun++) {
        const gameDoors = [new Door(1), new Door(2), new Door(3)] as Array<Door>;
        const doorThatHasCar: number = Math.floor(Math.random() * 3);
        const doorContestantSelects: number = Math.floor(Math.random() * 3);
        let presenterOpenedDoor = false;

        // Now set selections for game doors for this round (hasCar, selected, opened)
        gameDoors.forEach((door, index) => {
            door.hasCar = index === doorThatHasCar;
            door.selected = index === doorContestantSelects;

            // Now let the presenter open the door without the car of the remaining doors
            if (!door.hasCar && !door.selected && !presenterOpenedDoor) {
                door.opened = true;
                presenterOpenedDoor = true;
            }
        });

        // Now lets find out if contestant won, either by changing doors or not
        if (gameDoors.find(door =>
            !changeDoors ? door.selected : !door.selected && !door.opened).hasCar) {
            nrTimesWon++;
        } else {
            nrTimesLost++;
        }
    }

    return {
        nrOfTimesWon: nrTimesWon,
        nrOfTimesLost: nrTimesLost,
        doorChanged: changeDoors,
        totalGamesRun: nrOfGamesToRun
    } as SimulationResult;
}

export default runMontyHallGameSimulaton;