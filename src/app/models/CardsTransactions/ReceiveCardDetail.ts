import { Card } from '../CardsTransactions/Card';
import { Currency } from '../Masters/Currency';
import { ReceiveCard } from '../CardsTransactions/ReceiveCard';

import { Bank } from '../Masters/Bank';
import { CardIssuer } from '../Masters/CardIssuer';
import { CardType } from '../Masters/CardType';

export class ReceiveCardDetail {

    // ID
    public ID: number;
    // ReceiveCardID
    public ReceiveCardID: number;
    public ReceiveCard: ReceiveCard;
    // البطاقة 
    public CardID: number;
    public Card: Card;
    // كلمة مرور البطاقة
    public CardPin: string;
    // القيمة المتوقعة
    public EstimatedValue: number;
    // سعر الشراء
    public BuyPrice: number;
    // القيمة المستحقة
    public DueValue: number;
    // نسبة العمولة
    public CommissionPercent: number;
    // قيمة العمولة
    public CommissionValue: number;
    // عملة العمولة 
    public CommissionCurrencyID: number;
    public CommissionCurrency: Currency;
    public Status: number;


    // نوع البطاقة
    public CardTypeID: number;
    public CardType: CardType;
    // رقم البطاقة
    public CardNo: string;
    // كود البطاقة
    public CardCode: string;
    // الاسم على البطاقة
    public NameOnCard: string;
    // اسم صاحب البطاقة
    public CardOwnerName: string;
    // مصدر البطاقة
    public CardIssuerID: number;
    public CardIssuer: CardIssuer;
    // البنك المصدر
    public BankID: number;
    public Bank: Bank;
    // عملة البطاقة
    public CardCurrencyID: number;
    public CardCurrency: Currency;
    // كلمة مرور البطاقة
    // public CardPin: string;
    // هاتف صاحب البطاقة
    public OwnerPhone: string;

    constructor() {

    }

}
