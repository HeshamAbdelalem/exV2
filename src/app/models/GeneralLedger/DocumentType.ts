
import { DocumentAccount } from '../GeneralLedger/DocumentAccount';
import { DocumentValue } from '../GeneralLedger/DocumentValue';
import { DocumentXFile } from '../GeneralLedger/DocumentXFile';

export class DocumentType {

    // ID
    public ID: number;
    // الاسم
    public Name: string;
    // اسم الجدول في قاعدة البيانات
    public TableName: string;
    public Status: number;


    // حسابات المستند
    public DocumentAccount: DocumentAccount[];

    // قيم المستند
    public DocumentValue: DocumentValue[];

    // عناصر المستند الثابتة
    public DocumentXFile: DocumentXFile[];

    constructor() {
        // super();
    }

}
