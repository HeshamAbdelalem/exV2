
import { SystemPageFunction } from '../Authorizations/SystemPageFunction';

export class SystemPage {

    // ID    public ID: number;
    // الكود    public Code: string;
    // الاسم    public Name: string;
    // رمز    public Icon: string;
    // تلميح    public Hint: string;


	// needing for paging & sorting
	public RowsCount: number;
	public RowNo: number;
	public PageSize: number;
	public PageIndex: number;
	
    // الوظائف  المتاحة للصفحة    public SystemPageFunction: SystemPageFunction[];

    constructor() {

    }

}
