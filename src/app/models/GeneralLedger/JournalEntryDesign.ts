import { DocumentType } from '../GeneralLedger/DocumentType';
import { JournalType } from '../GeneralLedger/JournalType';

import { JournalEntryFilter } from '../GeneralLedger/JournalEntryFilter';
import { JournalEntryLineDesign } from '../GeneralLedger/JournalEntryLineDesign';

export class JournalEntryDesign {

    // ID    public ID: number;
    // نوع المستند    public DocumentTypeID: number;    public DocumentType: DocumentType;
    // وصف القيد    public JournalEntryDescription: string;
    // نوع اليومية    public JournalTypeID: number;    public JournalType: JournalType;


	// needing for paging & sorting
	public RowsCount: number;
	public RowNo: number;
	public PageSize: number;
	public PageIndex: number;
	
    // شروط تنفيذ القيد    public JournalEntryFilter: JournalEntryFilter[];
    // تفاصيل القيد    public JournalEntryLineDesign: JournalEntryLineDesign[];

    constructor() {

    }

}
