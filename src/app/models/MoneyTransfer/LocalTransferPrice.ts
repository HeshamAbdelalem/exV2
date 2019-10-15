import { Account } from '../GeneralLedger/Account';
import { City } from '../Masters/City';


export class LocalTransferPrice {

    // ID    public ID: number;
    // الحساب    public AccountID: number;    public Account: Account;
    // المدينة    public CityID: number;    public City: City;
    // رسم التحويل على كل الف    public ThousandsCommission: number;
    // عمولة الحساب    public AccountCommission: number;


	// needing for paging & sorting
	public RowsCount: number;
	public RowNo: number;
	public PageSize: number;
	public PageIndex: number;
	

    constructor() {

    }

}
