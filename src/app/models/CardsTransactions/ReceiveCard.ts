import { Document } from '../Supers/Document';
import { Guarantor } from '../Masters/Guarantor';
import { XCardsOperationsType } from '../Lookups/XCardsOperationsType';

import { ReceiveCardDetail } from '../CardsTransactions/ReceiveCardDetail';

export class ReceiveCard extends Document {

    // DocumentID
    public DocumentID: number;
    public Document: Document;
    // الضامن
    public GuarantorID: number;
    public Guarantor: Guarantor;
    // نوع العملية
    public XCardsOperationsTypeID: number;
    public XCardsOperationsType: XCardsOperationsType;
    // المستلم
    public ReceiverName: string;


    // تفاصيل البطاقات المستلمة
    public ReceiveCardDetail: ReceiveCardDetail[];

    constructor() {
        super();
    }

}
