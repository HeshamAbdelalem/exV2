export class ResultViewModel {

    private _Success: boolean;
    private _Message: string;
    private _Data: any;

    constructor(private success?: boolean, private message?: string, private data?: any) {
        this._Success = success;
        this._Message = message;
        this._Data = data;
    }

    get Success() { return this._Success; }
    set Success(value) { this._Success = value; }

    get Message() { return this._Message; }
    set Message(value) { this._Message = value; }

    get Data() { return this._Data; }
    set Data(value) { this._Data = value; }

}
