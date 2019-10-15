import { SuperObject } from '../Supers/SuperObject';
import { XDocumentType } from '../Lookups/XDocumentType';


export class Document extends SuperObject {

    // ID    public SuperObjectID: number;    public SuperObject: SuperObject;
    // تاريخ المستند    public DocumentDate: Date;
    // كود المستند    public DocumentCode: string;
    // DocumentTypeID    public XDocumentTypeID: number;    public XDocumentType: XDocumentType;
    // رقم المستند    public DocumentNo: string;
    // ملاحظات    public Notes: string;


    constructor() {
        super();
    }

}
