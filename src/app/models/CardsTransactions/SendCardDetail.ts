import { Card } from '../CardsTransactions/Card';
import { ReceiveCardDetail } from '../CardsTransactions/ReceiveCardDetail';
import { SendCard } from '../CardsTransactions/SendCard';


export class SendCardDetail {

    // ID
    public ID: number;
    // SendCardID
    public SendCardID: number;
    public SendCard: SendCard;
    // ReceiveCardDetailID
    public ReceiveCardDetailID: number;
    public ReceiveCardDetail: ReceiveCardDetail;
    // البطاقة 
    public CardID: number;
    public Card: Card;
    // نسبة المندوب
    public RepresentativePercent: number;
    public Status: number;


    constructor() {

    }

}
