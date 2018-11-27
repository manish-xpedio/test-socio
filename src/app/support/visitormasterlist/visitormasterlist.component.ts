import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-visitormasterlist',
	templateUrl: './visitormasterlist.component.html',
	styleUrls: ['./visitormasterlist.component.css']
})

export class VisitormasterlistComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();
	supp_visitor_master_list_status: string = '';
	supp_visitor_master_list: any = {};
	supp_visitor_master_listList: any = [];
	side_menu_list: any = [];

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'visitormasterlist',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);

		this.route.queryParams
			.subscribe(params => {
				this.supp_visitor_master_list['sysid'] = params.id;
			});

		this.ref_select();
		this.select_supp_visitor_master_list();
		this.side_menu_list = this.ds.getSidemenus(337);
	}

	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'supp_visitor_master_listOps'
			}
		})
		.subscribe(res => {
		});
	}

	select_supp_visitor_master_list(){
		this.supp_visitor_master_list['action']='SELECT_SUPP_VISITOR_MASTER_LIST';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.supp_visitor_master_list,
				proc: 'supp_visitor_master_listOps'
			}
		})
		.subscribe(res => {
			this.supp_visitor_master_listList = res['data'][0];
			if (+this.supp_visitor_master_list['sysid'] > 0){

				this.supp_visitor_master_list = this.supp_visitor_master_listList[0];
			}
			else
				this.supp_visitor_master_list = {};
		});
	}

	save_supp_visitor_master_list(frm){
		if (!frm.form.valid){
			this.supp_visitor_master_list_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.supp_visitor_master_list['action']='SAVE_SUPP_VISITOR_MASTER_LIST';

		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.supp_visitor_master_list,
				proc: 'supp_visitor_master_listOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.supp_visitor_master_list_status = res['data'][0][0].msg;
				this.supp_visitor_master_list = {};
				this.select_supp_visitor_master_list();
			}
			else
				this.supp_visitor_master_list_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_supp_visitor_master_list(sysid){
		this.supp_visitor_master_list['action']='DELETE_SUPP_VISITOR_MASTER_LIST';
		this.supp_visitor_master_list['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.supp_visitor_master_list,
				proc: 'supp_visitor_master_listOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.supp_visitor_master_list_status = res['data'][0][0].msg;
				this.supp_visitor_master_list = {};
				this.select_supp_visitor_master_list();
			}
			else
				this.supp_visitor_master_list_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_supp_visitor_master_list(rec){
		this.supp_visitor_master_list = rec;
		this.supp_visitor_master_list_status = '';
	}

	clear_supp_visitor_master_list(){
		this.supp_visitor_master_list = {};
		this.supp_visitor_master_list_status = '';
	}

}