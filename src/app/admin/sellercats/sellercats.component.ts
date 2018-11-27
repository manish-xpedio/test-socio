import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
@Component({
	selector: 'app-sellercats',
	templateUrl: './sellercats.component.html',
	styleUrls: ['./sellercats.component.css']
})

export class SellercatsComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	sales_supp_category_status: string = '';
	sales_supp_category: any = {};
	sales_supp_categoryList: any = [];

	constructor( private ds: DataService, private route: ActivatedRoute ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'sellercats',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.route.queryParams
			.subscribe(params => {
			this.sales_supp_category['sysid'] = params.id;
		});
		this.ref_select();
		this.select_sales_supp_category();


	}


	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'sales_supp_categoryOps'
			}
		})
		.subscribe(res => {
		});
	}

	select_sales_supp_category(){
		this.sales_supp_category['action']='SELECT_SALES_SUPP_CATEGORY';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.sales_supp_category,
				proc: 'sales_supp_categoryOps'
			}
		})
		.subscribe(res => {
			this.sales_supp_categoryList = res['data'][0];
			if (+this.sales_supp_category['sysid'] > 0){
				this.sales_supp_category = this.sales_supp_categoryList[0];
			}
			else
				this.sales_supp_category = {};
		});
	}

	save_sales_supp_category(){
		this.sales_supp_category['action']='SAVE_SALES_SUPP_CATEGORY';

		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.sales_supp_category,
				proc: 'sales_supp_categoryOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.sales_supp_category_status = res['data'][0][0].msg;
				this.sales_supp_category = {};
				this.select_sales_supp_category();
			}
			else
				this.sales_supp_category_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_sales_supp_category(sysid){
		this.sales_supp_category['action']='DELETE_SALES_SUPP_CATEGORY';
		this.sales_supp_category['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.sales_supp_category,
				proc: 'sales_supp_categoryOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.sales_supp_category_status = res['data'][0][0].msg;
				this.sales_supp_category = {};
				this.select_sales_supp_category();
			}
			else
				this.sales_supp_category_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_sales_supp_category(rec){
		this.sales_supp_category = rec;
		this.sales_supp_category_status = '';
	}

	clear_sales_supp_category(){
		this.sales_supp_category = {};
		this.sales_supp_category_status = '';
	}

}