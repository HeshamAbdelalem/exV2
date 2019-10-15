import { NamedObject } from '../Supers/NamedObject';
import { XJournalEntrySide } from '../Lookups/XJournalEntrySide';


export class Account extends NamedObject {

    // الكائن المسمى    public NamedObjectID: number;    public NamedObject: NamedObject;
    // الحساب الرئيس    public ParentAccountID: number;    public ParentAccount: Account;
    // رقم الحساب بالكامل    public FullCode: string;
    // مسار الحساب بالكامل    public FullPath: string;
    // تاريخ الفتح    public OpenDate: Date;
    // تاريخ الإغلاق    public CloseDate: Date;
    // طبيعة الحساب    public XJournalEntrySideID: number;    public XJournalEntrySide: XJournalEntrySide;


    constructor() {
        super();
    }

}
