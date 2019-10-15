import { BackCard } from '../CardsTransactions/BackCard';
import { Card } from '../CardsTransactions/Card';
import { ReceiveCardDetail } from '../CardsTransactions/ReceiveCardDetail';

export class BackCardDetail {

    // ID
    public ID: number;
    // BackCardID
    public BackCardID: number;
    public BackCard: BackCard;
    // البطاقة
    public ReceiveCardDetailID: number;
    public ReceiveCardDetail: ReceiveCardDetail;
    // البطاقة 
    public CardID: number;
    public Card: Card;
    public Status: number;

    constructor() {

    }

}
