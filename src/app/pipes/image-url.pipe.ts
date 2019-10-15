
	import { Pipe, PipeTransform } from '@angular/core';
	import { environment } from '../../environments/environment';

	@Pipe({
	  name: 'imageUrl'
	})
	export class ImageUrlPipe implements PipeTransform {

	  transform(value: any, args?: any): any {
		let newValue: string = '';
		if (!value) {
		  newValue = environment.api_url + 'uploads/default-avatar.png';
		} else {
		  newValue = environment.api_url + 'uploads/' + value;
		}
		console.log(newValue, value);
		return newValue;
	  }

	}
