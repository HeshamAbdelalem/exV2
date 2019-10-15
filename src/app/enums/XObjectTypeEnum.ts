export const XObjectTypeEnum = {
	// قوائم النظام
	SystemMenu: 1
	// صفحات النظام
	, SystemPage: 2
	// صفحات القوائم
	, SystemMenuPage: 3
	// المصارف
	, Bank: 4
	// أنواع البطاقات
	, CardType: 5
	// أسعار العملات
	, CurrencyPrice: 6
	// العملات
	, Currency: 7
	// الدولة
	, Country: 8
	// المدن
	, City: 9
	// الضامنين
	, Guarantor: 10
	// المندوبين
	, Representative: 11
	// مصدرون البطاقات
	, CardIssuer: 12
	// العملاء
	, Customer: 13
	// شراء عملة نقدي
	, CashBuyCurrency: 14
	// شراء عملة بمستند بنكي
	, ChequeBuyCurreny: 15
	// بيع عملة نقدي
	, CashSellCurrency: 16
	// بيع عملة بمستند مصرفي
	, ChequeSellCurrency: 17
	// بيع عملة لعميل
	, SellCurrencyToCustomer: 18
	// بيع عملة بالخارج
	, SellCurrencyOut: 19
	// تحويل عملة 
	, CurrencyTransfer: 20
	// تحويل داخلي
	, LocalCurrencyTransfer: 21
	// إستلام بطاقات من ضامن - شراء
	, BuyCard: 22
	// أسعار التحويلات الداخلية
	, LocalTransferPrice: 23
	// تفاصيل البطاقات المرسلة
	, SendCardDetail: 24
	// إرسال البطاقات للمندوب
	, SendCard: 25
	// تفاصيل البطاقات المستلمة
	, ReceiveCardDetail: 26
	//  إستلام بطاقات من ضامن - نسبة من القيمة
	, CollectCardForPercent: 27
	// إستلام بطاقات من ضامن - قيمة ثابتة
	, CollectCardForValue: 28
	// معدلات تحويل عملات المسحوبات
	, DrawCurrencyConversion: 29
	// تفاصيل مسحوبات البطاقات
	, DrawCardDetail: 30
	// مسحوبات البطاقات
	, DrawCard: 31
	// تفاصيل البطاقات المستلمة من المندوب
	, BackCardDetail: 32
	// إستلام البطاقات من المندوب
	, BackCard: 33
	// تفاصيل البطاقات المسلمة للضامن
	, DeliveryCardDetail: 34
	// تسليم البطاقات للضامن
	, DeliveryCard: 35
	// تفاصيل المدفوعات
	, CardPaymentDetail: 36
	// مدفوعات
	, CardPayment: 37
	// الحساب المصرفي
	, BankAccount: 38
	// الحسابات الثابتة
	, StaticAccount: 39
	// حسابات العمولات
	, CommissionAccount: 40
	// إعدادات المنظومة
	, SystemSetting: 41
	// الخزن
	, Treasury: 42
	// صلاحيات خاصة
	, SpecialAuthority: 43
	//  تفاصيل صلاحيات النظام
	, SystemRuleAuthorization: 44
	// الحسابات المصرح برؤية رصيدها
	, AuthorizedAccount: 45
	// صلاحيات المستخدمين
	, AuthorizationRule: 46
	// الوظائف  المتاحة للصفحة
	, SystemPageFunction: 47
	// الخزن الافتراضية لكل عملة
	, UserDefaultTreasury: 48
	// صلاحية مستخدم
	, UserRule: 49
	// المستخدم
	, User: 50
	// الموظفين
	, Employee: 51
	// البطاقة
	, Card: 52
};