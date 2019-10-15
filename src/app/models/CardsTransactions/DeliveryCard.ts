import { Document } from '../Supers/Document';
import { Guarantor } from '../Masters/Guarantor';

import { DeliveryCardDetail } from '../CardsTransactions/DeliveryCardDetail';

export class DeliveryCard extends Document {

    // DocumentID
    public DocumentID: number;
    public Document: Document;
    // GuarantorID
    public GuarantorID: number;
    public Guarantor: Guarantor;


    // تفاصيل البطاقات المسلمة للضامن
    public DeliveryCardDetail: DeliveryCardDetail[];

    constructor() {
        super();
    }

}
