import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
@Component({
	selector: 'app-sellersubtype',
	templateUrl: './sellersubtype.component.html',
	styleUrls: ['./sellersubtype.component.css']
})

export class SellersubtypeComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	sales_supp_subtype_status: string = '';
	sales_supp_subtype: any = {};
	sales_supp_subtypeList: any = [];

	constructor( private ds: DataService, private route: ActivatedRoute ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'sellersubtype',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.route.queryParams
			.subscribe(params => {
			this.sales_supp_subtype['sysid'] = params.id;
		});
		this.ref_select();
		this.select_sales_supp_subtype();


	}


	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'sales_supp_subtypeOps'
			}
		})
		.subscribe(res => {
		});
	}

	select_sales_supp_subtype(){
		this.sales_supp_subtype['action']='SELECT_SALES_SUPP_SUBTYPE';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.sales_supp_subtype,
				proc: 'sales_supp_subtypeOps'
			}
		})
		.subscribe(res => {
			this.sales_supp_subtypeList = res['data'][0];
			if (+this.sales_supp_subtype['sysid'] > 0){
				this.sales_supp_subtype = this.sales_supp_subtypeList[0];
			}
			else
				this.sales_supp_subtype = {};
		});
	}

	save_sales_supp_subtype(){
		this.sales_supp_subtype['action']='SAVE_SALES_SUPP_SUBTYPE';

		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.sales_supp_subtype,
				proc: 'sales_supp_subtypeOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.sales_supp_subtype_status = res['data'][0][0].msg;
				this.sales_supp_subtype = {};
				this.select_sales_supp_subtype();
			}
			else
				this.sales_supp_subtype_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_sales_supp_subtype(sysid){
		this.sales_supp_subtype['action']='DELETE_SALES_SUPP_SUBTYPE';
		this.sales_supp_subtype['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.sales_supp_subtype,
				proc: 'sales_supp_subtypeOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.sales_supp_subtype_status = res['data'][0][0].msg;
				this.sales_supp_subtype = {};
				this.select_sales_supp_subtype();
			}
			else
				this.sales_supp_subtype_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_sales_supp_subtype(rec){
		this.sales_supp_subtype = rec;
		this.sales_supp_subtype_status = '';
	}

	clear_sales_supp_subtype(){
		this.sales_supp_subtype = {};
		this.sales_supp_subtype_status = '';
	}

}