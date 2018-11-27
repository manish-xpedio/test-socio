import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment'; 
import { _ } from '../../../node_modules/underscore';

@Injectable({
	providedIn: 'root'
})

export class DataService {
 	v_dt: any;
 	side_menu_list: any = [];

	constructor(private http: HttpClient) {

	}

	getData(req)  {
		return this.http.post('http://localhost:9300/db_data', req.data);
	}
	
	getJsonDate(dt) {
		return {year: moment(dt).year(), month: moment(dt).month()+1, day: moment(dt).date()};
	}
	
	getStringDate(dt) {
		this.v_dt = moment(dt).format('YYYY-MM-DD');
		console.log(this.v_dt);
		return (this.v_dt=='Invalid date'?undefined:this.v_dt);
	}
	
	pushFileToStorage(file: File, form_data: any) {
		const formdata: FormData = new FormData();
		formdata.append('file', file, form_data['img_name']);
		formdata.append('form_field',form_data);
		return this.http.post('/upload',formdata, {reportProgress: true, responseType: 'text'});
	}
	
	pushFileToStorageDev(file: File, form_data: any) {
		const formdata: FormData = new FormData();
		formdata.append('file', file, form_data['img_name']);
		formdata.append('form_field',form_data);
		return this.http.post('http://localhost:9300/upload_dev',formdata, {reportProgress: true, responseType: 'text'});
	}

	textareaFormat(str){
		if (str==undefined) 
			return str;
		console.log(str.replace(/\\n/g, '\n'));
		return str.replace(/\\n/g, '\n');
	}
	
	setSidemenus(menu_list){
		this.side_menu_list = menu_list;
	}
	
	getSidemenus(pid){
		return _.where(this.side_menu_list, {parent_id: pid, menu_type: 3});
	}
}