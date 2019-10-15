import { Currency } from '../Masters/Currency';
import { Document } from '../Supers/Document';


export class CurrencyPrice extends Document {

    // DocumentID    public DocumentID: number;    public Document: Document;
    // العملة    public CurrencyID: number;    public Currency: Currency;
    // سعر الشراء - نقدي    public CashBuyPrice: number;
    // سعر البيع - نقدي    public CashSellPrice: number;
    // سعر الشراء - صك    public ChequeBuyPrice: number;
    // سعر البيع - صك    public ChequeSellPrice: number;


    constructor() {
        super();
    }

}
