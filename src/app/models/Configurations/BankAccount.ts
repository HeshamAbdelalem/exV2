import { Account } from '../GeneralLedger/Account';
import { Bank } from '../Masters/Bank';
import { Currency } from '../Masters/Currency';


export class BankAccount extends Account {

    // الحساب
    public AccountID: number;
    public Account: Account;
    // المصرف
    public BankID: number;
    public Bank: Bank;
    // العملة
    public CurrencyID: number;
    public Currency: Currency;
    // تاريخ فتح الحساب
    public StartDate: Date;
    // الرصيد الافتتاحي
    public StartBalance: number;
    // ملاحظات
    public Notes: string;


    constructor() {
        super();
    }

}
