import { Card } from '../CardsTransactions/Card';
import { DrawCard } from '../CardsTransactions/DrawCard';
import { ReceiveCardDetail } from '../CardsTransactions/ReceiveCardDetail';
import { XCardProblem } from '../Lookups/XCardProblem';


export class DrawCardDetail {

    // ID
    public ID: number;
    // DrawCardID
    public DrawCardID: number;
    public DrawCard: DrawCard;
    // ReceiveCardDetailID
    public ReceiveCardDetailID: number;
    public ReceiveCardDetail: ReceiveCardDetail;
    // مشكلة البطاقة
    public XCardProblemID: number;
    public XCardProblem: XCardProblem;
    // قيمة السحب
    public DrawValue: number;
    // قيمة السحب بعملة البطاقة
    public DrawValueInCadCurrency: number;
    // إجمالي قيمة المسحوبات
    public DrawValueTotal: number;
    // الرصيد الفعلي
    public ActualBalance: number;
    // تم السحب
    public DrawingIsDone: boolean;
    // البطاقة 
    public CardID: number;
    public Card: Card;
    public Status: number;


    constructor() {

    }

}
