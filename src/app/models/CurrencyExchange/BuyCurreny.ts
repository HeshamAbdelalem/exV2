import { BankAccount } from '../Configurations/BankAccount';
import { Currency } from '../Masters/Currency';
import { Document } from '../Supers/Document';
import { XCommercialPaperType } from '../Lookups/XCommercialPaperType';


export class BuyCurreny extends Document {

    // المستند    public DocumentID: number;    public Document: Document;
    // العملة    public CurrencyID: number;    public Currency: Currency;
    // المبلغ    public Amount: number;
    // سعر الشراء    public BuyPrice: number;
    // الإجمالي    public Total: number;
    // المشتري    public Buyer: string;
    // الهاتف    public Phone: string;
    // نوع المستند البنكي    public XCommercialPaperTypeID: number;    public XCommercialPaperType: XCommercialPaperType;
    // الحساب البنكي    public BankAccountID: number;    public BankAccount: BankAccount;
    // رقم المستند البنكي    public BankDocumentNo: string;


    constructor() {
        super();
    }

}
