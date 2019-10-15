import { Account } from '../GeneralLedger/Account';

export class Treasury extends Account {

    // الحساب
    public AccountID: number;
    public Account: Account;

    constructor() {
        super();
    }

}
