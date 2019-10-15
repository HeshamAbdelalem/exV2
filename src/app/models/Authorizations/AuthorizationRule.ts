
import { SystemRuleAuthorization } from '../Authorizations/SystemRuleAuthorization';
import { AuthorizedAccount } from '../Authorizations/AuthorizedAccount';
import { SpecialAuthority } from '../Authorizations/SpecialAuthority';

export class AuthorizationRule {

    // ID    public ID: number;
    // الاسم    public Name: string;
    // مؤشر المدير    public AdminInd: boolean;
    public Status: number;
    //  تفاصيل صلاحيات النظام    public SystemRuleAuthorization: SystemRuleAuthorization[];
    // الحسابات المصرح برؤية رصيدها    public AuthorizedAccount: AuthorizedAccount[];
    // صلاحية خاصة    public SpecialAuthority: SpecialAuthority[];

    constructor() {

    }

}
