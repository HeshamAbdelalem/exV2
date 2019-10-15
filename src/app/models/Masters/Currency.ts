import { NamedObject } from '../Supers/NamedObject';


export class Currency extends NamedObject {

    // NamedObjectID    public NamedObjectID: number;    public NamedObject: NamedObject;
    // الرمز    public Symbole: string;
    // سعر الشراء - نقدي    public CashBuyPrice: number;
    // سعر البيع - نقدي    public CashSellPrice: number;
    // سعر الشراء - صك    public ChequeBuyPrice: number;
    // سعر البيع - صك    public ChequeSellPrice: number;


    constructor() {
        super();
    }

}
