import { Card } from '../CardsTransactions/Card';
import { DeliveryCard } from '../CardsTransactions/DeliveryCard';
import { ReceiveCardDetail } from '../CardsTransactions/ReceiveCardDetail';


export class DeliveryCardDetail {

    // ID
    public ID: number;
    // DeliveryCardID
    public DeliveryCardID: number;
    public DeliveryCard: DeliveryCard;
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
