import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
@Component({
	selector: 'app-sellertype',
	templateUrl: './sellertype.component.html',
	styleUrls: ['./sellertype.component.css']
})

export class SellertypeComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	sales_supp_type_status: string = '';
	sales_supp_type: any = {};
	sales_supp_typeList: any = [];

	constructor( private ds: DataService, private route: ActivatedRoute ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'sellertype',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.route.queryParams
			.subscribe(params => {
			this.sales_supp_type['sysid'] = params.id;
		});
		this.ref_select();
		this.select_sales_supp_type();


	}


	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'sales_supp_typeOps'
			}
		})
		.subscribe(res => {
		});
	}

	select_sales_supp_type(){
		this.sales_supp_type['action']='SELECT_SALES_SUPP_TYPE';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.sales_supp_type,
				proc: 'sales_supp_typeOps'
			}
		})
		.subscribe(res => {
			this.sales_supp_typeList = res['data'][0];
			if (+this.sales_supp_type['sysid'] > 0){
				this.sales_supp_type = this.sales_supp_typeList[0];
			}
			else
				this.sales_supp_type = {};
		});
	}

	save_sales_supp_type(){
		this.sales_supp_type['action']='SAVE_SALES_SUPP_TYPE';

		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.sales_supp_type,
				proc: 'sales_supp_typeOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.sales_supp_type_status = res['data'][0][0].msg;
				this.sales_supp_type = {};
				this.select_sales_supp_type();
			}
			else
				this.sales_supp_type_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_sales_supp_type(sysid){
		this.sales_supp_type['action']='DELETE_SALES_SUPP_TYPE';
		this.sales_supp_type['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.sales_supp_type,
				proc: 'sales_supp_typeOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.sales_supp_type_status = res['data'][0][0].msg;
				this.sales_supp_type = {};
				this.select_sales_supp_type();
			}
			else
				this.sales_supp_type_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_sales_supp_type(rec){
		this.sales_supp_type = rec;
		this.sales_supp_type_status = '';
	}

	clear_sales_supp_type(){
		this.sales_supp_type = {};
		this.sales_supp_type_status = '';
	}

}