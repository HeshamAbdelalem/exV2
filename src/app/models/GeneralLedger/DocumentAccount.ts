import { Account } from '../GeneralLedger/Account';
import { DocumentType } from '../GeneralLedger/DocumentType';


export class DocumentAccount {

    // ID    public ID: number;
    // نوع المستند    public DocumentTypeID: number;    public DocumentType: DocumentType;
    // الحساب    public AccountID: number;    public  Account: Account;
    // عنوان الحساب في الصفحة    public AccountLabel: string;
    // الحقل في قاعدة البيانات    public FieldName: string;
    public Status: number;

    constructor() {

    }

}
