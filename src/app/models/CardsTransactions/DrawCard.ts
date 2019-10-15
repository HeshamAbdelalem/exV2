import { Currency } from '../Masters/Currency';
import { Document } from '../Supers/Document';
import { Representative } from '../Masters/Representative';

import { DrawCurrencyConversion } from '../CardsTransactions/DrawCurrencyConversion';
import { DrawCardDetail } from '../CardsTransactions/DrawCardDetail';

export class DrawCard extends Document {

    // DocumentID
    public DocumentID: number;
    public Document: Document;
    // المندوب
    public RepresentativeID: number;
    public Representative: Representative;
    // عملة السحب
    public DrawCurrencyID: number;
    public DrawCurrency: Currency;


    // معدلات تحويل عملات المسحوبات
    public DrawCurrencyConversion: DrawCurrencyConversion[];

    // تفاصيل مسحوبات البطاقات
    public DrawCardDetail: DrawCardDetail[];

    constructor() {
        super();
    }

}
