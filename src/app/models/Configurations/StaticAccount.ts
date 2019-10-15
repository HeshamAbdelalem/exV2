import { Account } from '../GeneralLedger/Account';
import { Currency } from '../Masters/Currency';
import { SystemSetting } from '../Configurations/SystemSetting';
import { XStaticAccount } from '../Lookups/XStaticAccount';


export class StaticAccount {

    // ID    public ID: number;
    // SystemSettingID    public SystemSettingID: number;    public SystemSetting: SystemSetting;
    // نوع الحساب الثابت    public XStaticAccountID: number;    public XStaticAccount: XStaticAccount;
    //  الحساب    public AccountID: number;    public Account: Account;
    // العملة    public CurrencyID: number;    public Currency: Currency;
    public Status: number;

    constructor() {

    }

}
