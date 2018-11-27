import { Component } from '@angular/core';
import { _ } from '../../node_modules/underscore';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app';
	p_flag: any = {};
	user_details: any = {};
	hm: boolean = false;
	comp_name: string;
	all_menus: any = [];
	main_menu_list: any = [];
	submenu_list: any = [];
	content_name: string = 'main-content';
	side_bg: string = '#515151';

	constructor(private route: Router, private ds: DataService) {}


	getParentFlags(p_f) {
		p_f.parent_flag.subscribe(event_flag => {
			this.p_flag = event_flag;
			console.log(this.p_flag);
			this.hm = event_flag.hide_side_menu;
			this.comp_name = event_flag.comp_name;
			if (this.comp_name == 'home') {
				p_f.user_details.subscribe(u_det => {
					this.user_details = u_det[0];
				});
				p_f.menu_list.subscribe(event_menu => {
					this.all_menus = event_menu;
					this.main_menu_list = _.where(event_menu, {parent_id: -1});
					console.log(this.all_menus);
				});
				this.content_name = 'main-content-home';
			}
			else {
				this.content_name = 'main-content';
				this.ds.setSidemenus(this.all_menus);
			}
		})
	}

	refreshPage() {
		console.log('In refresh');
    	this.route.navigate(['/']);
	}
}
