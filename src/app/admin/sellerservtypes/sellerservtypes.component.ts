import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
@Component({
	selector: 'app-sellerservtypes',
	templateUrl: './sellerservtypes.component.html',
	styleUrls: ['./sellerservtypes.component.css']
})

export class SellerservtypesComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	sales_serv_type_status: string = '';
	sales_serv_type_details_status: string = '';
	sales_serv_type: any = {};
	sales_serv_typeList: any = [];
	sales_serv_type_details: any = {};
	sales_serv_type_detailsList: any = [];
	selected_service_id: string = '';
	selected_service_name: string = '';

	constructor( private ds: DataService, private route: ActivatedRoute ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'sellerservtypes',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.route.queryParams
			.subscribe(params => {
			this.sales_serv_type['sysid'] = params.id;
		});
		this.select_sales_serv_type();
	}

	select_sales_serv_type(){
		this.sales_serv_type['action']='SELECT_SALES_SERV_TYPE';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.sales_serv_type,
				proc: 'sales_serv_typeOps'
			}
		})
		.subscribe(res => {
			this.sales_serv_typeList = res['data'][0];
			if (+this.sales_serv_type['sysid'] > 0){
				this.sales_serv_type = this.sales_serv_typeList[0];
				this.sales_serv_type_detailsList = res['data'][1];
			}
			else
				this.sales_serv_type = {};
		});
	}

	save_sales_serv_type(frm){
		if (!frm.form.valid){
			this.sales_serv_type_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.sales_serv_type['action']='SAVE_SALES_SERV_TYPE';

		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.sales_serv_type,
				proc: 'sales_serv_typeOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.sales_serv_type_status = res['data'][0][0].msg;
				this.sales_serv_type = {};
				this.select_sales_serv_type();
			}
			else
				this.sales_serv_type_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_sales_serv_type(sysid){
		this.sales_serv_type['action']='DELETE_SALES_SERV_TYPE';
		this.sales_serv_type['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.sales_serv_type,
				proc: 'sales_serv_typeOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.sales_serv_type_status = res['data'][0][0].msg;
				this.sales_serv_type = {};
				this.select_sales_serv_type();
			}
			else
				this.sales_serv_type_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_sales_serv_type(rec){
		this.selected_service_id = rec.sysid;
		this.selected_service_name = rec.serv_type_name;
		console.log(rec);
		this.sales_serv_type = {sysid: rec['sysid']};
		this.select_sales_serv_type();
		this.sales_serv_type_status = '';
	}

	clear_sales_serv_type(){
		this.sales_serv_type = {};
		this.sales_serv_type_status = '';
	}

	select_sales_serv_type_details(){
		this.sales_serv_type_details['action']='SELECT_SALES_SERV_TYPE_DETAILS';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.sales_serv_type_details,
				proc: 'sales_serv_type_detailsOps'
			}
		})
		.subscribe(res => {
			this.sales_serv_type_detailsList = res['data'][0];
			if (+this.sales_serv_type_details['sysid'] > 0){
				this.sales_serv_type_details = this.sales_serv_type_detailsList[0];
			}
			else
				this.sales_serv_type_details = {};
		});
	}

	save_sales_serv_type_details(frm){
		if (!frm.form.valid){
			this.sales_serv_type_details_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.sales_serv_type_details['action']='SAVE_SALES_SERV_TYPE_DETAILS';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.sales_serv_type_details,
				proc: 'sales_serv_type_detailsOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.sales_serv_type_details_status = res['data'][0][0].msg;
				this.sales_serv_type_details = {};
				this.select_sales_serv_type_details();
			}
			else
				this.sales_serv_type_details_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_sales_serv_type_details(sysid){
		this.sales_serv_type_details['action']='DELETE_SALES_SERV_TYPE_DETAILS';
		this.sales_serv_type_details['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.sales_serv_type_details,
				proc: 'sales_serv_type_detailsOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.sales_serv_type_details_status = res['data'][0][0].msg;
				this.sales_serv_type_details = {};
				this.select_sales_serv_type_details();
			}
			else
				this.sales_serv_type_details_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_sales_serv_type_details(rec){
		this.sales_serv_type_details = rec;
		this.sales_serv_type_details_status = '';
	}

	clear_sales_serv_type_details(){
		this.sales_serv_type_details = { serv_id: this.selected_service_id };
		this.sales_serv_type_details_status = '';
	}
}