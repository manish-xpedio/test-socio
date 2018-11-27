import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-myacc',
	templateUrl: './myacc.component.html',
	styleUrls: ['./myacc.component.css']
})

export class MyaccComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();

	fin_maintainance_charges_details: any = {};
	fin_maintainance_charges_detailsList: any = [];
	total_charges = {};

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'myacc',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.select_fin_maintainance_charges_details();


	}

	select_fin_maintainance_charges_details(){
		this.fin_maintainance_charges_details['action']='SELECT_FIN_MAINTAINANCE_CHARGES_DETAILS';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.fin_maintainance_charges_details,
				proc: 'fin_maintainance_charges_detailsOps'
			}
		})
		.subscribe(res => {
			this.fin_maintainance_charges_detailsList = res['data'][0];
			this.total_charges = res['data'][1][0];
		});
	}
}