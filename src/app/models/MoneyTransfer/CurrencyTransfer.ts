import { Account } from '../GeneralLedger/Account';
import { City } from '../Masters/City';
import { Currency } from '../Masters/Currency';
import { Document } from '../Supers/Document';
import { XCommissionType } from '../Lookups/XCommissionType';


export class CurrencyTransfer extends Document {

    // المستند    public DocumentID: number;    public Document: Document;
    // العملة    public CurrencyID: number;    public Currency: Currency;
    // المبلغ    public Amount: number;
    // سعر التحويل    public Price: number;
    // الإجمالي    public Total: number;
    // الحساب المرسل    public SenderAccountID: number;    public SenderAccount: Account;
    // عمولة المرسل    public SenderCommission: number;
    // عملة المرسل    public SenderCurrencyID: number;    public SenderCurrency: Currency;
    // نوع عمولة المرسل    public SenderXCommissionTypeID: number;    public SenderXCommissionType: XCommissionType;
    // الحساب المستلم    public ReceiverAccountID: number;    public ReceiverAccount: Account;
    // عمولة المستلم    public ReceiverCommission: number;
    // العملة    public ReceiverCurrencyID: number;    public ReceiverCurrency: Currency;
    // نوع العمولة    public ReceiverXCommissionTypeID: number;    public ReceiverXCommissionType: XCommissionType;
    // المرسل    public SenderName: string;
    // المستلم    public ReceiverName: string;
    // تم التسليم    public DeliveryIsDone: boolean;
    // عمولة    public Commission: number;
    // المدينة    public DeliveryLocationID: number;    public DeliveryLocation: City;
    // هاتف المرسل    public SenderPhone: string;
    // هاتف المستلم    public ReceiverPhone: string;


    constructor() {
        super();
    }

}
