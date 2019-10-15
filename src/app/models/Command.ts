export class Command {
    
    private _Name: string;
    get Name(): string { return this._Name; }
    set Name(value) { this._Name = value; }

    private _Params: string[];
    get Params(): string[] { return this._Params; }
    set Params(value) { this._Params = value; }
    
    private _ExecuteNonQuery: boolean;
    get ExecuteNonQuery(): boolean { return this._ExecuteNonQuery; }
    set ExecuteNonQuery(value) { this._ExecuteNonQuery = value; }

    private _ResultType: ResultTypeEnum;
    get ResultType(): ResultTypeEnum { return this._ResultType; }
    set ResultType(value) { this._ResultType = value; }

    public constructor(name: string, params: any) {
        this._Name = name;
        this._Params = params;
    }

}

export enum ResultTypeEnum {
    DataTable = 0,
    JsonArray = 1,
    JsonObject = 2
}
