import { Account } from '../GeneralLedger/Account';
import { Currency } from '../Masters/Currency';
import { SystemSetting } from '../Configurations/SystemSetting';


export class CommissionAccount {

    // ID
    public ID: number;
    // إعدادات المنظومة
    public SystemSettingID: number;
    public SystemSetting: SystemSetting;
    // العملة
    public CurrencyID: number;
    public Currency: Currency;
    // حساب العمولات المحصلة
    public DebitAccountID: number;
    public DebitAccount: Account;
    // حساب العمولات الممنوحة
    public CreditAccountID: number;
    public CreditAccount: Account;
    public Status: number;
    constructor() {

    }

}
