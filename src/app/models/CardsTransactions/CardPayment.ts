import { Document } from '../Supers/Document';
import { ReceiveCard } from '../CardsTransactions/ReceiveCard';

import { CardPaymentDetail } from '../CardsTransactions/CardPaymentDetail';

export class CardPayment extends Document {

    // DocumentID
    public DocumentID: number;
    public Document: Document;
    // ReceiveCardID
    public ReceiveCardID: number;
    public ReceiveCard: ReceiveCard;
    // إجمالي المدفوع
    public TotalPaid: number;


    // تفاصيل المدفوعات
    public CardPaymentDetail: CardPaymentDetail[];

    constructor() {
        super();
    }

}
