import { Bank } from '../Masters/Bank';
import { CardIssuer } from '../Masters/CardIssuer';
import { CardType } from '../Masters/CardType';
import { Currency } from '../Masters/Currency';


export class Card {

    // ID
    // نوع البطاقة
    // رقم البطاقة
    // كود البطاقة
    // الاسم على البطاقة
    // اسم صاحب البطاقة
    // مصدر البطاقة
    // البنك المصدر
    // عملة البطاقة
    // كلمة مرور البطاقة
    // هاتف صاحب البطاقة


	// needing for paging & sorting
	public RowsCount: number;
	public RowNo: number;
	public PageSize: number;
	public PageIndex: number;
	

    constructor() {

    }

}