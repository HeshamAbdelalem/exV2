import { DocumentXFile } from '../GeneralLedger/DocumentXFile';
import { JournalEntryDesign } from '../GeneralLedger/JournalEntryDesign';


export class JournalEntryFilter {

    // ID    public ID: number;
    // تصميم القيد    public JournalEntryDesignID: number;    public JournalEntryDesign: JournalEntryDesign;
    // عناصر المستند الثابتة    public DocumentXFileID: number;    public DocumentXFile: DocumentXFile;
    // القيمة    public XFileValue: number;
    public Status: number;

    constructor() {

    }

}
