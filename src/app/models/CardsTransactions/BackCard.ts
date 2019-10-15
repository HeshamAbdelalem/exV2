import { Document } from '../Supers/Document';
import { Representative } from '../Masters/Representative';

import { BackCardDetail } from '../CardsTransactions/BackCardDetail';

export class BackCard extends Document {

    // DocumentID
    public DocumentID: number;
    public Document: Document;
    // RepresentativeID
    public RepresentativeID: number;
    public Representative: Representative;


    // تفاصيل البطاقات المستلمة من المندوب
    public BackCardDetail: BackCardDetail[];

    constructor() {
        super();
    }

}
