import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.css']
})
export class GenerateReportComponent implements OnInit {

  //Forms in the html file
  private currentDateTimeForm;

  //To store the overdue items
  private overdueItems: any;

  //Route url
  private getOverdueItemsUrl = '/getOverdueItems';

  constructor(private http: HttpClient) { }

  //On Initialization
  ngOnInit() {

    this.currentDateTimeForm = new FormGroup({
      curDate: new FormControl("",Validators.required),
      curTime: new FormControl("",Validators.required)
    });

  }

  //Get all the overdue items
  public getOverdueItems(value: any): void {
    this.sendToGetItems(value).subscribe((data: any) => {
      this.overdueItems = data;
    });
  }

  //Send http post request to get items
  private sendToGetItems(value: any): Observable<any>  {
    return this.http.post(this.getOverdueItemsUrl, value);
  }

}
