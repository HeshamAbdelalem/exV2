import Swal from 'sweetalert2';
import { ResultViewModel } from '../models/ResultViewModel';

export enum Action {
	Save = 1,
	Update = 2,
	Delete = 3
}

export const Messages = {
	DeleteConfirmation: 'هل تريد حذف هذا البيان ؟',
	DeleteWarning: 'لن تستطيع إرجاع هذا البيان مرة أخرى',
	SaveCompletedSuccessfully: 'تمت عملية الحفظ بنجاح',
	UpdateCompletedSuccessfully: 'تمت عملية التعديل بنجاح',
	DeleteCompletedSuccessfully: 'تمت عملية الحذف بنجاح',
	InvalidUserNameOrPassword: 'يوجد خطأ في اسم المستخدم أو كلمة المرور',
	Error: 'خطأ',
	Success: 'نجاح',
	Alert: 'تنبيه',

	ShowMessag: function(message: string, action: string, _duration: number = 2) {
		const msg: any = {};
		msg.position = 'center';
		msg.type = action;
		msg.title = message;
		msg.showConfirmButton = true;
		msg.confirmButtonText = 'نعم';
		msg.timer = _duration * 1000;		
		Swal.fire(msg);
	}
	,
	HandleResultViewModel: function(rvm: ResultViewModel) {

		if (rvm.Success) {			
			this.ShowMessag(Messages.SaveCompletedSuccessfully, 'success');
		} else {
			this.ShowMessag(rvm.Message, 'error');
		}

	}

};
