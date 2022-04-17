export class AuthResponse<TData>{
    private _success!: boolean;
    public message!: string;
    public data!: TData | null;


    constructor(success:boolean, data?: TData | null, message?:string | null)
    {
        this.data = data ?? null;
        this.message = message ?? "";
        this._success = success;
    }

    get success(): boolean { return this._success }


    setAsFailed()
    {
        this._success = false;
    }

    setAsSuccess()
    {
        this._success = true;
    }
}