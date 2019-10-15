import { Document } from '../Supers/Document';
import { Representative } from '../Masters/Representative';

import { SendCardDetail } from '../CardsTransactions/SendCardDetail';

export class SendCard extends Document {

    // DocumentID
    public DocumentID: number;
    public Document: Document;
    // المندوب
    public RepresentativeID: number;
    public Representative: Representative;


    // تفاصيل البطاقات المرسلة
    public SendCardDetail: SendCardDetail[];

    constructor() {
        super();
    }

}
