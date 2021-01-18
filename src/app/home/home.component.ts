import { Component, OnInit } from '@angular/core';
import { SpaceXLaunchService } from './../services/spaceXlaunch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  years = [];
  launchYear = {
    year: ''
  };
  launchSuccess = {
    value: ''
  };
  landingSuccess = {
    value: ''
  };
  filteredData = [];

  constructor(private readonly spaceXService: SpaceXLaunchService) { }

  ngOnInit() {
    const startYear = 2006;
    this.getListOfYears(startYear);
    this.getDataWithoutFilter(0,0);
  }

  getListOfYears(startYear) {
      let currentYear = new Date().getFullYear();
      while ( startYear < currentYear ) {
          this.years.push(startYear++);
      }
      return this.years;
  }

  // get data without filter
  getDataWithoutFilter(value, type) {
    let data = {
      limit:100
    }
    if(type === 'year') {
       this.launchYear['year'] = value;
        data['launch_year'] = this.launchYear['year']
    } else if( type ==='successful_launch' && this.launchYear['year']) {
      this.launchSuccess['value'] = value;
      data['launch_year'] = this.launchYear['year'];
      data['launch_success'] = this.launchSuccess['value'];
    } else if (type === 'successful_landing' && this.launchSuccess['value'] && this.launchYear['year']) {
      this.landingSuccess['value'] = value;
      data['launch_year'] = this.launchYear['year'];
      data['launch_success'] = this.launchSuccess['value'];
      data['land_success'] = this.landingSuccess['value'];
    } else if(type === 'successful_launch') {
      this.launchSuccess['value'] = value;
      data['launch_success'] = this.launchSuccess['value']
    } else if(type === 'successful_landing') {
      this.landingSuccess['value'] = value;
      data['land_success'] = this.landingSuccess['value'];
    }
      this.spaceXService.getLaunchSuccessData(data).subscribe((res: any)=>{
        console.log('resp..', res)
        if(res && res.length > 0) {
        this.filteredData = res;
        }
      }, (err) => {
        console.log(err);
    });
  }
}
