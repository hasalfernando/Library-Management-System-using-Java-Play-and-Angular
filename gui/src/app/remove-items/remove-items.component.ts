import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-remove-items',
  templateUrl: './remove-items.component.html',
  styleUrls: ['./remove-items.component.css']
})
export class RemoveItemsComponent {

  //Forms in the html file
  private removeForm;
  private removeBookDetailsForm;
  private removeDvdDetailsForm;

  //To store the number of book columns and dvd columns
  private noOfBookCols: string;
  private noOfDvdCols: string;

  //To store the response
  private idDeletionResponse: string;

  //Route urls
  private getBookColsUrl = '/getBookCols';
  private getDvdColsUrl = '/getDvdCols';
  private removeBookUrl= '/removeBook';
  private removeDvdUrl= '/removeDVD';

  constructor(private http: HttpClient) { }

  //On initialization
  ngOnInit(){

    //Get the number of book columns and dvd columns
    this.getNoOfBookCols();
    this.getNoOfDvdCols();

    //Hide the book details form and the dvd details form
    document.getElementById("removeBookForm").hidden = true;
    document.getElementById("removeDvdForm").hidden = true;

    //Initialize the decision form
    this.removeForm = new FormGroup({
      rItemType: new FormControl("",Validators.required)
    });

    //Initialize the book details form
    this.removeBookDetailsForm = new FormGroup({
      rBookIsbn: new FormControl("",Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
        Validators.pattern('(1111111[1-9]|111111[2-9][0-9]|11111[2-9][0-9]{2}|1111[2-9][0-9]{3}|111[2-9][0-9]{4}|11[2-9][0-9]{5}|1[2-9][0-9]{6}|[2-9][0-9]{7}|[1-8][0-9]{8}|9[0-8][0-9]{7}|99[0-8][0-9]{6}|999[0-8][0-9]{5}|9999[0-8][0-9]{4}|99999[0-8][0-9]{3}|999999[0-8][0-9]{2}|9999999[0-8][0-9]|99999999[0-9]|[1-8][0-9]{9}|9[0-8][0-9]{8}|99[0-8][0-9]{7}|999[0-8][0-9]{6}|9999[0-8][0-9]{5}|99999[0-8][0-9]{4}|999999[0-8][0-9]{3}|9999999[0-8][0-9]{2}|99999999[0-8][0-9]|999999999[0-9]|[1-8][0-9]{10}|9[0-8][0-9]{9}|99[0-8][0-9]{8}|999[0-8][0-9]{7}|9999[0-8][0-9]{6}|99999[0-8][0-9]{5}|999999[0-8][0-9]{4}|9999999[0-8][0-9]{3}|99999999[0-8][0-9]{2}|999999999[0-8][0-9]|9999999999[0-9]|[1-8][0-9]{11}|9[0-8][0-9]{10}|99[0-8][0-9]{9}|999[0-8][0-9]{8}|9999[0-8][0-9]{7}|99999[0-8][0-9]{6}|999999[0-8][0-9]{5}|9999999[0-8][0-9]{4}|99999999[0-8][0-9]{3}|999999999[0-8][0-9]{2}|9999999999[0-8][0-9]|99999999999[0-9]|[1-8][0-9]{12}|9[0-8][0-9]{11}|99[0-8][0-9]{10}|999[0-8][0-9]{9}|9999[0-8][0-9]{8}|99999[0-8][0-9]{7}|999999[0-8][0-9]{6}|9999999[0-8][0-9]{5}|99999999[0-8][0-9]{4}|999999999[0-8][0-9]{3}|9999999999[0-8][0-9]{2}|99999999999[0-8][0-9]|999999999999[0-9])')
      ]))
    });

    //Initialize the dvd details form
    this.removeDvdDetailsForm = new FormGroup({
      rDvdBarcode: new FormControl("",Validators.compose([
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(12),
        Validators.pattern('(1111111[1-9]|111111[2-9][0-9]|11111[2-9][0-9]{2}|1111[2-9][0-9]{3}|111[2-9][0-9]{4}|11[2-9][0-9]{5}|1[2-9][0-9]{6}|[2-9][0-9]{7}|[1-8][0-9]{8}|9[0-8][0-9]{7}|99[0-8][0-9]{6}|999[0-8][0-9]{5}|9999[0-8][0-9]{4}|99999[0-8][0-9]{3}|999999[0-8][0-9]{2}|9999999[0-8][0-9]|99999999[0-9]|[1-8][0-9]{9}|9[0-8][0-9]{8}|99[0-8][0-9]{7}|999[0-8][0-9]{6}|9999[0-8][0-9]{5}|99999[0-8][0-9]{4}|999999[0-8][0-9]{3}|9999999[0-8][0-9]{2}|99999999[0-8][0-9]|999999999[0-9]|[1-8][0-9]{10}|9[0-8][0-9]{9}|99[0-8][0-9]{8}|999[0-8][0-9]{7}|9999[0-8][0-9]{6}|99999[0-8][0-9]{5}|999999[0-8][0-9]{4}|9999999[0-8][0-9]{3}|99999999[0-8][0-9]{2}|999999999[0-8][0-9]|9999999999[0-9]|[1-8][0-9]{11}|9[0-8][0-9]{10}|99[0-8][0-9]{9}|999[0-8][0-9]{8}|9999[0-8][0-9]{7}|99999[0-8][0-9]{6}|999999[0-8][0-9]{5}|9999999[0-8][0-9]{4}|99999999[0-8][0-9]{3}|999999999[0-8][0-9]{2}|9999999999[0-8][0-9]|99999999999[0-9]|[1-8][0-9]{12}|9[0-8][0-9]{11}|99[0-8][0-9]{10}|999[0-8][0-9]{9}|9999[0-8][0-9]{8}|99999[0-8][0-9]{7}|999999[0-8][0-9]{6}|9999999[0-8][0-9]{5}|99999999[0-8][0-9]{4}|999999999[0-8][0-9]{3}|9999999999[0-8][0-9]{2}|99999999999[0-8][0-9]|999999999999[0-9])')
      ]))
    });

  }

  //decide what form to be shown
  public decideForm(decision){
    if(decision.rItemType == "dvd"){
      document.getElementById("removeBookForm").hidden = true;
      document.getElementById("removeDvdForm").hidden = false;
    }
    else{
      document.getElementById("removeDvdForm").hidden = true;
      document.getElementById("removeBookForm").hidden = false;
    }

  }

  //Get the number of book columns to be shown in the panel
  public getNoOfBookCols(): void {
    this.sendToGetBookCol().subscribe((data: any) => {
      this.noOfBookCols = data;
      document.getElementById('storedBooksNum').innerHTML = this.noOfBookCols;
      var free = 150 - +this.noOfBookCols;
      document.getElementById('availableBooksNum').innerHTML = String(free);
    });
  }

  //Get the number of dvd columns to be shown in the panel
  public getNoOfDvdCols(): void {
    this.sendToGetDvdCol().subscribe((data: any) => {
      this.noOfDvdCols = data;
      document.getElementById('storedDvdsNum').innerHTML = this.noOfDvdCols;
      var free = 50 - +this.noOfDvdCols;
      document.getElementById('availableDvdNum').innerHTML = String(free);
    });
  }

  //Send http post request to get book columns
  private sendToGetBookCol(): Observable<any>  {
    return this.http.post(this.getBookColsUrl, {});
  }

  //Send http post request to get dvd columns
  private sendToGetDvdCol(): Observable<any>  {
    return this.http.post(this.getDvdColsUrl, {});
  }

  //Send data in book details form to remove a book
  public sendToRemoveBook(value: any):void {

    this.sendBookIsbn(value).subscribe((data: any) => {
      this.idDeletionResponse = data;
      alert(this.idDeletionResponse);
      document.getElementById("bookMessage").innerText = this.idDeletionResponse;
      this.removeBookDetailsForm.reset();
    });
    this.changeBookColsAfterSubmit();
  }

  //Send http post request to delete the book
  private sendBookIsbn(value: any): Observable<any> {
    return this.http.post(this.removeBookUrl, value);
  }

  //Send data in dvd details form to remove a book
  public sendToRemoveDvd(value: any):void {

    this.sendDvdBarcode(value).subscribe((data: any) => {
      this.idDeletionResponse = data;
      alert(this.idDeletionResponse);
      document.getElementById("dvdMessage").innerText = this.idDeletionResponse;
      this.removeDvdDetailsForm.reset();
      this.changeDvdColsAfterSubmit();
    });

  }

  //Send http post request to delete the dvd
  private sendDvdBarcode(value: any): Observable<any> {
    return this.http.post(this.removeDvdUrl, value);
  }

  //Change the number of book columns after removing
  public changeBookColsAfterSubmit():any{
    window.setTimeout(() => {this.getNoOfBookCols();}, 300);
  }

  //Change the number of dvd columns after removing
  public changeDvdColsAfterSubmit():any{
    window.setTimeout(() => {this.getNoOfDvdCols();}, 300);
  }
}
