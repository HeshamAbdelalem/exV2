import { Account } from '../GeneralLedger/Account';
import { DocumentValue } from '../GeneralLedger/DocumentValue';
import { JournalEntryDesign } from '../GeneralLedger/JournalEntryDesign';
import { XJournalEntrySide } from '../Lookups/XJournalEntrySide';


export class JournalEntryLineDesign {

    // ID    public ID: number;
    // تصميم القيد    public JournalEntryDesignID: number;    public JournalEntryDesign: JournalEntryDesign;
    // قيم المستند    public DocumentValueID: number;    public DocumentValue: DocumentValue;
    // الحساب    public AccountID: number;    public  Account: Account;
    // جانب القيد    public XJournalEntrySideID: number;    public XJournalEntrySide: XJournalEntrySide;
    public Status: number;

    constructor() {

    }

}
