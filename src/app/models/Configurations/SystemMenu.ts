

export class SystemMenu {

    // ID
    public ID: number;
    // الكود
    public Code: string;
    // الاسم
    public Name: string;
    // مسلسل
    public Serial: number;
    // أيقونة
    public Icon: string;

	// needing for paging & sorting
	public RowsCount: number;
	public RowNo: number;
	public PageSize: number;
	public PageIndex: number;
	

    constructor() {

    }

}
