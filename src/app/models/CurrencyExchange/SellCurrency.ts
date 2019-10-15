import { Bank } from '../Masters/Bank';
import { BankAccount } from '../Configurations/BankAccount';
import { Currency } from '../Masters/Currency';
import { Document } from '../Supers/Document';
import { XCommercialPaperType } from '../Lookups/XCommercialPaperType';


export class SellCurrency extends Document {

    // المستند
    public DocumentID: number;
    public Document: Document;
    // العملة
    public CurrencyID: number;
    public Currency: Currency;
    // المبلغ
    public Amount: number;
    // سعر البيع
    public SellPrice: number;
    // الإجمالي
    public Total: number;
    // البائع
    public Seller: string;
    // الهاتف
    public Phone: string;
    // نوع المستند المصرفي
    public XCommercialPaperTypeID: number;
    public XCommercialPaperType: XCommercialPaperType;
    // الحساب المصرفي
    public BankAccountID: number;
    public BankAccount: BankAccount;
    // رقم المستند المصرفي
    public BankDocumentNo: string;
    // المصرف المصدر للمستند
    public IssuerBankID: number;
    public IssuerBank: Bank;


    constructor() {
        super();
    }

}
