import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-reserve-items',
  templateUrl: './reserve-items.component.html',
  styleUrls: ['./reserve-items.component.css']
})
export class ReserveItemsComponent implements OnInit {

  //Forms in the html file
  reserveDecisionForm;
  reserveBookDetailsForm;
  reserveDvdDetailsForm;

  //To store the response
  private reserveResponse: string;

  //Route Urls
  private reserveBookUrl:string = '/reserveBook';
  private reserveDvdUrl:string = '/reserveDvd';
  private confirmReserveBookUrl:string= '/confirmReserveBook';
  private confirmReserveDvdUrl:string= '/confirmReserveDvd';


  constructor(private http: HttpClient) { }

  //On Initialization
  ngOnInit() {

    document.getElementById("afterBookReserveDisplay").hidden = true;
    document.getElementById("afterDvdReserveDisplay").hidden = true;
    document.getElementById("reserveDvdForm").hidden = true;
    document.getElementById("reserveBookForm").hidden = true;
    document.getElementById("confirmBookReserveButton").hidden = true;
    document.getElementById("confirmDvdReserveButton").hidden = true;

    this.reserveDecisionForm = new FormGroup({
      reserveItemType: new FormControl("",Validators.required)
    });

    this.reserveBookDetailsForm = new FormGroup({
      reserveBookIsbn: new FormControl("",Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
        Validators.pattern('(1111111[1-9]|111111[2-9][0-9]|11111[2-9][0-9]{2}|1111[2-9][0-9]{3}|111[2-9][0-9]{4}|11[2-9][0-9]{5}|1[2-9][0-9]{6}|[2-9][0-9]{7}|[1-8][0-9]{8}|9[0-8][0-9]{7}|99[0-8][0-9]{6}|999[0-8][0-9]{5}|9999[0-8][0-9]{4}|99999[0-8][0-9]{3}|999999[0-8][0-9]{2}|9999999[0-8][0-9]|99999999[0-9]|[1-8][0-9]{9}|9[0-8][0-9]{8}|99[0-8][0-9]{7}|999[0-8][0-9]{6}|9999[0-8][0-9]{5}|99999[0-8][0-9]{4}|999999[0-8][0-9]{3}|9999999[0-8][0-9]{2}|99999999[0-8][0-9]|999999999[0-9]|[1-8][0-9]{10}|9[0-8][0-9]{9}|99[0-8][0-9]{8}|999[0-8][0-9]{7}|9999[0-8][0-9]{6}|99999[0-8][0-9]{5}|999999[0-8][0-9]{4}|9999999[0-8][0-9]{3}|99999999[0-8][0-9]{2}|999999999[0-8][0-9]|9999999999[0-9]|[1-8][0-9]{11}|9[0-8][0-9]{10}|99[0-8][0-9]{9}|999[0-8][0-9]{8}|9999[0-8][0-9]{7}|99999[0-8][0-9]{6}|999999[0-8][0-9]{5}|9999999[0-8][0-9]{4}|99999999[0-8][0-9]{3}|999999999[0-8][0-9]{2}|9999999999[0-8][0-9]|99999999999[0-9]|[1-8][0-9]{12}|9[0-8][0-9]{11}|99[0-8][0-9]{10}|999[0-8][0-9]{9}|9999[0-8][0-9]{8}|99999[0-8][0-9]{7}|999999[0-8][0-9]{6}|9999999[0-8][0-9]{5}|99999999[0-8][0-9]{4}|999999999[0-8][0-9]{3}|9999999999[0-8][0-9]{2}|99999999999[0-8][0-9]|999999999999[0-9])')
      ])),
      reserveBookReader: new FormControl("",Validators.compose([
        Validators.required,
        Validators.pattern('^(\\(?\\+?[0-9]*\\)?)?[0-9_\\- \\(\\)]*$')
      ]))
    });

    this.reserveDvdDetailsForm = new FormGroup({
      reserveDvdBarcode: new FormControl("",Validators.compose([
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(12),
        Validators.pattern('(1111111[1-9]|111111[2-9][0-9]|11111[2-9][0-9]{2}|1111[2-9][0-9]{3}|111[2-9][0-9]{4}|11[2-9][0-9]{5}|1[2-9][0-9]{6}|[2-9][0-9]{7}|[1-8][0-9]{8}|9[0-8][0-9]{7}|99[0-8][0-9]{6}|999[0-8][0-9]{5}|9999[0-8][0-9]{4}|99999[0-8][0-9]{3}|999999[0-8][0-9]{2}|9999999[0-8][0-9]|99999999[0-9]|[1-8][0-9]{9}|9[0-8][0-9]{8}|99[0-8][0-9]{7}|999[0-8][0-9]{6}|9999[0-8][0-9]{5}|99999[0-8][0-9]{4}|999999[0-8][0-9]{3}|9999999[0-8][0-9]{2}|99999999[0-8][0-9]|999999999[0-9]|[1-8][0-9]{10}|9[0-8][0-9]{9}|99[0-8][0-9]{8}|999[0-8][0-9]{7}|9999[0-8][0-9]{6}|99999[0-8][0-9]{5}|999999[0-8][0-9]{4}|9999999[0-8][0-9]{3}|99999999[0-8][0-9]{2}|999999999[0-8][0-9]|9999999999[0-9]|[1-8][0-9]{11}|9[0-8][0-9]{10}|99[0-8][0-9]{9}|999[0-8][0-9]{8}|9999[0-8][0-9]{7}|99999[0-8][0-9]{6}|999999[0-8][0-9]{5}|9999999[0-8][0-9]{4}|99999999[0-8][0-9]{3}|999999999[0-8][0-9]{2}|9999999999[0-8][0-9]|99999999999[0-9]|[1-8][0-9]{12}|9[0-8][0-9]{11}|99[0-8][0-9]{10}|999[0-8][0-9]{9}|9999[0-8][0-9]{8}|99999[0-8][0-9]{7}|999999[0-8][0-9]{6}|9999999[0-8][0-9]{5}|99999999[0-8][0-9]{4}|999999999[0-8][0-9]{3}|9999999999[0-8][0-9]{2}|99999999999[0-8][0-9]|999999999999[0-9])')
      ])),
      reserveDvdReader: new FormControl("",Validators.compose([
        Validators.required,
        Validators.pattern('^(\\(?\\+?[0-9]*\\)?)?[0-9_\\- \\(\\)]*$')
      ]))
    });

  }

  //Decide the form
  decideForm(decision){

    if(decision.reserveItemType == "dvd"){
      document.getElementById("reserveBookForm").hidden = true;
      document.getElementById("reserveDvdForm").hidden = false;
    }
    else{
      document.getElementById("reserveDvdForm").hidden = true;
      document.getElementById("reserveBookForm").hidden = false;
    }

  }

  //Get details
  reserveBookInfo(value: any): void {
    this.sendReserveBookInfo(value).subscribe((data: any) => {
      this.reserveResponse = data;

      if(this.reserveResponse == "This book is currently available"||this.reserveResponse == "There is no book with that isbn in the library") {
        document.getElementById("bookDescription").innerText = this.reserveResponse;
        document.getElementById("afterBookReserveDisplay").hidden = false;
        document.getElementById("confirmBookReserveButton").hidden = true;
      }
      else{
        document.getElementById("bookDescription").innerText = this.reserveResponse;
        document.getElementById("afterBookReserveDisplay").hidden = false;
        document.getElementById("confirmBookReserveButton").hidden = false;
      }

      this.reserveBookDetailsForm.reset();
    });
  }

  public sendReserveBookInfo(value: any): Observable<any> {
    return this.http.post(this.reserveBookUrl, value);
  }

  reserveDvdInfo(value: any): void {
    this.sendReserveDvdInfo(value).subscribe((data: any) => {
      this.reserveResponse = data;
      if(this.reserveResponse == "This dvd is currently available"||this.reserveResponse == "There is no dvd with that barcode   in the library") {
        document.getElementById("dvdDescription").innerText = this.reserveResponse;
        document.getElementById("afterDvdReserveDisplay").hidden = false;
        document.getElementById("confirmDvdReserveButton").hidden = true;
      }
      else{
        document.getElementById("dvdDescription").innerText = this.reserveResponse;
        document.getElementById("afterDvdReserveDisplay").hidden = false;
        document.getElementById("confirmDvdReserveButton").hidden = false;
      }
      this.reserveDvdDetailsForm.reset();
    });
  }

  public sendReserveDvdInfo(value: any): Observable<any> {
    return this.http.post(this.reserveDvdUrl, value);
  }

  //Confirm reservations
  confirmReserveBook(value: any): void {
    this.sendConfirmReserveBook(value).subscribe((data: any) => {
      this.reserveResponse = data;

      document.getElementById("bookDescription").innerText = this.reserveResponse;
      document.getElementById("confirmBookReserveButton").hidden = true;
    });
  }

  public sendConfirmReserveBook(value: any): Observable<any> {
    return this.http.post(this.confirmReserveBookUrl, value);
  }

  confirmReserveDvd(value: any): void {
    this.sendConfirmReserveDvd(value).subscribe((data: any) => {
      this.reserveResponse = data;

      document.getElementById("dvdDescription").innerText = this.reserveResponse;
      document.getElementById("confirmDvdReserveButton").hidden = true;
    });
  }

  public sendConfirmReserveDvd(value: any): Observable<any> {
    return this.http.post(this.confirmReserveDvdUrl, value);
  }

}
