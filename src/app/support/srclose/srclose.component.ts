import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-srclose',
	templateUrl: './srclose.component.html',
	styleUrls: ['./srclose.component.css']
})

export class SrcloseComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();
	supp_sr: any;


	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'srclose',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
	}

}