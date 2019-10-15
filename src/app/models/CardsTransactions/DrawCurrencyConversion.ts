import { Currency } from '../Masters/Currency';
import { DrawCard } from '../CardsTransactions/DrawCard';


export class DrawCurrencyConversion {

    // ID
    public ID: number;
    // DrawCardID
    public DrawCardID: number;
    public DrawCard: DrawCard;
    // العملة
    public CurrencyID: number;
    public Currency: Currency;
    // نسبة التحويل
    public ConversionRate: number;
    public Status: number;


    constructor() {

    }

}
