import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Observable} from "rxjs";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-return-item',
  templateUrl: './return-item.component.html',
  styleUrls: ['./return-item.component.css']
})
export class ReturnItemComponent {

  //Forms in the html file
  private returnForm;
  private returnBookDetailsForm;
  private returnDvdDetailsForm;

  //To store the response
  private returnResponse: string;

  //Route Urls
  private returnBookUrl= '/returnBook';
  private returnDvdUrl= '/returnDvd';

  constructor(private http: HttpClient) { }

  //On initialization
  ngOnInit(){ 

    //Hide book details form, dvd details form and the after return display
    document.getElementById("returnBookForm").hidden = true;
    document.getElementById("returnDvdForm").hidden = true;
    document.getElementById("afterReturnDisplay").hidden = true;

    //Initialize decision form
    this.returnForm = new FormGroup({
      returnItemType: new FormControl("",Validators.required)
    });

    //Initialize return book details form
    this.returnBookDetailsForm = new FormGroup({
      returnBookIsbn: new FormControl("",Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
        Validators.pattern('(1111111[1-9]|111111[2-9][0-9]|11111[2-9][0-9]{2}|1111[2-9][0-9]{3}|111[2-9][0-9]{4}|11[2-9][0-9]{5}|1[2-9][0-9]{6}|[2-9][0-9]{7}|[1-8][0-9]{8}|9[0-8][0-9]{7}|99[0-8][0-9]{6}|999[0-8][0-9]{5}|9999[0-8][0-9]{4}|99999[0-8][0-9]{3}|999999[0-8][0-9]{2}|9999999[0-8][0-9]|99999999[0-9]|[1-8][0-9]{9}|9[0-8][0-9]{8}|99[0-8][0-9]{7}|999[0-8][0-9]{6}|9999[0-8][0-9]{5}|99999[0-8][0-9]{4}|999999[0-8][0-9]{3}|9999999[0-8][0-9]{2}|99999999[0-8][0-9]|999999999[0-9]|[1-8][0-9]{10}|9[0-8][0-9]{9}|99[0-8][0-9]{8}|999[0-8][0-9]{7}|9999[0-8][0-9]{6}|99999[0-8][0-9]{5}|999999[0-8][0-9]{4}|9999999[0-8][0-9]{3}|99999999[0-8][0-9]{2}|999999999[0-8][0-9]|9999999999[0-9]|[1-8][0-9]{11}|9[0-8][0-9]{10}|99[0-8][0-9]{9}|999[0-8][0-9]{8}|9999[0-8][0-9]{7}|99999[0-8][0-9]{6}|999999[0-8][0-9]{5}|9999999[0-8][0-9]{4}|99999999[0-8][0-9]{3}|999999999[0-8][0-9]{2}|9999999999[0-8][0-9]|99999999999[0-9]|[1-8][0-9]{12}|9[0-8][0-9]{11}|99[0-8][0-9]{10}|999[0-8][0-9]{9}|9999[0-8][0-9]{8}|99999[0-8][0-9]{7}|999999[0-8][0-9]{6}|9999999[0-8][0-9]{5}|99999999[0-8][0-9]{4}|999999999[0-8][0-9]{3}|9999999999[0-8][0-9]{2}|99999999999[0-8][0-9]|999999999999[0-9])')
      ])),
      returnBookRetDate: new FormControl("", Validators.required),
      returnBookRetTime: new FormControl("", Validators.required)
    });

    //Initialize return dvd details form
    this.returnDvdDetailsForm = new FormGroup({
      returnDvdBarcode: new FormControl("",Validators.compose([
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(12),
        Validators.pattern('(1111111[1-9]|111111[2-9][0-9]|11111[2-9][0-9]{2}|1111[2-9][0-9]{3}|111[2-9][0-9]{4}|11[2-9][0-9]{5}|1[2-9][0-9]{6}|[2-9][0-9]{7}|[1-8][0-9]{8}|9[0-8][0-9]{7}|99[0-8][0-9]{6}|999[0-8][0-9]{5}|9999[0-8][0-9]{4}|99999[0-8][0-9]{3}|999999[0-8][0-9]{2}|9999999[0-8][0-9]|99999999[0-9]|[1-8][0-9]{9}|9[0-8][0-9]{8}|99[0-8][0-9]{7}|999[0-8][0-9]{6}|9999[0-8][0-9]{5}|99999[0-8][0-9]{4}|999999[0-8][0-9]{3}|9999999[0-8][0-9]{2}|99999999[0-8][0-9]|999999999[0-9]|[1-8][0-9]{10}|9[0-8][0-9]{9}|99[0-8][0-9]{8}|999[0-8][0-9]{7}|9999[0-8][0-9]{6}|99999[0-8][0-9]{5}|999999[0-8][0-9]{4}|9999999[0-8][0-9]{3}|99999999[0-8][0-9]{2}|999999999[0-8][0-9]|9999999999[0-9]|[1-8][0-9]{11}|9[0-8][0-9]{10}|99[0-8][0-9]{9}|999[0-8][0-9]{8}|9999[0-8][0-9]{7}|99999[0-8][0-9]{6}|999999[0-8][0-9]{5}|9999999[0-8][0-9]{4}|99999999[0-8][0-9]{3}|999999999[0-8][0-9]{2}|9999999999[0-8][0-9]|99999999999[0-9]|[1-8][0-9]{12}|9[0-8][0-9]{11}|99[0-8][0-9]{10}|999[0-8][0-9]{9}|9999[0-8][0-9]{8}|99999[0-8][0-9]{7}|999999[0-8][0-9]{6}|9999999[0-8][0-9]{5}|99999999[0-8][0-9]{4}|999999999[0-8][0-9]{3}|9999999999[0-8][0-9]{2}|99999999999[0-8][0-9]|999999999999[0-9])')
      ])),
      returnDvdRetDate: new FormControl("", Validators.required),
      returnDvdRetTime: new FormControl("", Validators.required)
    });

  }

  //decide what form to load
  public decideForm(decision){
    if(decision.returnItemType == "dvd"){
      document.getElementById("returnBookForm").hidden = true;
      document.getElementById("returnDvdForm").hidden = false;
    }
    else{
      document.getElementById("returnDvdForm").hidden = true;
      document.getElementById("returnBookForm").hidden = false;
    }

  }

  //send return book info
  returnBook(value: any): void {
    this.sendReturnBook(value).subscribe((data: any) => {
      this.returnResponse = data;
      alert(this.returnResponse);
      document.getElementById("description").innerText = this.returnResponse;
      document.getElementById("afterReturnDisplay").hidden = false;
      this.returnBookDetailsForm.reset();
    });
  }

  //Http post request containing return book info
  public sendReturnBook(value: any): Observable<any> {
    return this.http.post(this.returnBookUrl, value);
  }

  //Send return dvd info
  returnDvd(value: any): void {
    this.sendReturnDvd(value).subscribe((data: any) => {
      this.returnResponse = data;
      alert(this.returnResponse);
      document.getElementById("description").innerText = this.returnResponse;
      document.getElementById("afterReturnDisplay").hidden = false;
      this.returnDvdDetailsForm.reset();
    });
  }

  //Http post request containing return dvd info
  public sendReturnDvd(value: any): Observable<any> {
    return this.http.post(this.returnDvdUrl, value);
  }
}
