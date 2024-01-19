import { Guid } from "guid-typescript";

export class GuidId {
    public id: string;

    constructor() {
        this.id = Guid.create().toString();
    }
}
// creates a new guid for each book