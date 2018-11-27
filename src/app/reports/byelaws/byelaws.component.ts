import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-byelaws',
	templateUrl: './byelaws.component.html',
	styleUrls: ['./byelaws.component.css']
})

export class ByelawsComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	report_byelaws_status: string = '';
	report_byelaws: any = {};
	report_byelawsList: any = [];

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'byelaws',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.route.queryParams
			.subscribe(params => {
			this.report_byelaws['sysid'] = params.id;
		});
		this.ref_select();
		this.select_report_byelaws();
		this.report_byelaws['amendment_date'] = this.ds.getJsonDate(this.report_byelaws['amendment_date']);

	}


	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'report_byelawsOps'
			}
		})
		.subscribe(res => {
		});
	}

	select_report_byelaws(){
		this.report_byelaws['action']='SELECT_REPORT_BYELAWS';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.report_byelaws,
				proc: 'report_byelawsOps'
			}
		})
		.subscribe(res => {
			this.report_byelawsList = res['data'][0];
			if (+this.report_byelaws['sysid'] > 0){
				this.report_byelaws = this.report_byelawsList[0];
			}
			else
				this.report_byelaws = {};
		});
	}

	save_report_byelaws(frm){
		if (!frm.form.valid){
			this.report_byelaws_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.report_byelaws['action']='SAVE_REPORT_BYELAWS';
		this.report_byelaws['amendment_date'] = this.ds.getStringDate(this.report_byelaws['amendment_date']);
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.report_byelaws,
				proc: 'report_byelawsOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.report_byelaws_status = res['data'][0][0].msg;
				this.report_byelaws = {};
				this.select_report_byelaws();
			}
			else
				this.report_byelaws_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_report_byelaws(sysid){
		this.report_byelaws['action']='DELETE_REPORT_BYELAWS';
		this.report_byelaws['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.report_byelaws,
				proc: 'report_byelawsOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.report_byelaws_status = res['data'][0][0].msg;
				this.report_byelaws = {};
				this.select_report_byelaws();
			}
			else
				this.report_byelaws_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_report_byelaws(rec){
		this.report_byelaws = rec;
		console.log(this.report_byelaws);
		this.report_byelaws_status = '';
	}

	clear_report_byelaws(){
		this.report_byelaws = {};
		this.report_byelaws_status = '';
	}

}