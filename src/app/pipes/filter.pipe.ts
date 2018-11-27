import { Pipe, PipeTransform } from '@angular/core';
import { _ } from '../../../node_modules/underscore'

@Pipe({
	name: 'filter'
})

export class FilterPipe implements PipeTransform {

	transform(value: any, pid?: any): any {
		if (!value)
			return null;
		return _.where(value, { parent_id: pid.parent_id });
	}
}