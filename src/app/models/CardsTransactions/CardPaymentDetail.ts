import { CardPayment } from '../CardsTransactions/CardPayment';
import { ReceiveCardDetail } from '../CardsTransactions/ReceiveCardDetail';


export class CardPaymentDetail {

    // ID
    public ID: number;
    // CardPaymentID
    public CardPaymentID: number;
    public CardPayment: CardPayment;
    // البطاقة
    public ReceiveCardDetailID: number;
    public ReceiveCardDetail: ReceiveCardDetail;
    // القيمة
    public Value: number;
    public Status: number;


    constructor() {

    }

}
