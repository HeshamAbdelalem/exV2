import { XObjectType } from '../Lookups/XObjectType';


export class SuperObject {

    // ID    public ID: number;
    // نوع الكائن    public XObjectTypeID: number;    public XObjectType: XObjectType;


	// needing for paging & sorting
	public RowsCount: number;
	public RowNo: number;
	public PageSize: number;
	public PageIndex: number;
	

    constructor() {

    }

}
