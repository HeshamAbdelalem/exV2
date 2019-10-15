import { Bank } from '../Masters/Bank';
import { CardIssuer } from '../Masters/CardIssuer';
import { CardType } from '../Masters/CardType';
import { Currency } from '../Masters/Currency';


export class Card {

    // ID    public ID: number;
    // نوع البطاقة    public CardTypeID: number;    public CardType: CardType;
    // رقم البطاقة    public CardNo: string;
    // كود البطاقة    public CardCode: string;
    // الاسم على البطاقة    public NameOnCard: string;
    // اسم صاحب البطاقة    public CardOwnerName: string;
    // مصدر البطاقة    public CardIssuerID: number;    public CardIssuer: CardIssuer;
    // البنك المصدر    public BankID: number;    public Bank: Bank;
    // عملة البطاقة    public CardCurrencyID: number;    public CardCurrency: Currency;
    // كلمة مرور البطاقة    public CardPin: string;
    // هاتف صاحب البطاقة    public OwnerPhone: string;


	// needing for paging & sorting
	public RowsCount: number;
	public RowNo: number;
	public PageSize: number;
	public PageIndex: number;
	

    constructor() {

    }

}
