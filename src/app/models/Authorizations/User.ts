import { Person } from '../Supers/Person';
import { XObjectType } from '../Lookups/XObjectType';

import { UserRule } from '../Authorizations/UserRule';
import { UserDefaultTreasury } from '../Authorizations/UserDefaultTreasury';

export class User {

    // ID    public ID: number;
    // اسم المستخدم    public UserName: string;
    // كلمة المرور    public Password: string;
    // نوع الشخص    public XPersonTypeID: number;    public XPersonType: XObjectType;
    // الشخص    public PersonID: number;    public Person: Person;


	// needing for paging & sorting
	public RowsCount: number;
	public RowNo: number;
	public PageSize: number;
	public PageIndex: number;
	
    // صلاحية مستخدم    public UserRule: UserRule[];
    // الخزن الافتراضية لكل عملة    public UserDefaultTreasury: UserDefaultTreasury[];

    constructor() {

    }

}
