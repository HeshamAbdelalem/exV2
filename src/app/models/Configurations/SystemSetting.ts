import { Currency } from '../Masters/Currency';

import { StaticAccount } from '../Configurations/StaticAccount';
import { CommissionAccount } from '../Configurations/CommissionAccount';

export class SystemSetting {

    // ID    public ID: number;
    // العملة المحلية    public NationalCurrencyID: number;    public NationalCurrency: Currency;
    // العملة الأجنبية الأكثر إستخدامًا    public DefaultForeignCurrencyID: number;    public DefaultForeignCurrency: Currency;


	// needing for paging & sorting
	public RowsCount: number;
	public RowNo: number;
	public PageSize: number;
	public PageIndex: number;
	
    // الحسابات الثابتة    public StaticAccount: StaticAccount[];
    // حسابات العمولات    public CommissionAccount: CommissionAccount[];

    constructor() {

    }

}
