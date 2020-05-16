export class Door {
    hasCar: boolean;
    selected: boolean;
    opened: boolean;
    doorNr: number;

    constructor(doorNr: number) {
        this.doorNr = doorNr;
        this.hasCar = false;
        this.selected = false;
        this.opened = false;
    }
}