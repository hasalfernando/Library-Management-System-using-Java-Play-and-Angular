import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Observable} from "rxjs";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
  
})

export class AddItemsComponent {

  //Forms in the html file
  private form;
  private bookDetailsForm;
  private dvdDetailsForm;

  //To get the responses after sending data
  private dvdFormResponse: string;
  private bookFormResponse: string;

  //To store the number of book columns and dvd columns
  private noOfBookCols: string;
  private noOfDvdCols: string;

  //Urls for the routes file
  private addBookUrl = '/addBook';
  private addDvdUrl = '/addDvd';
  private getBookColsUrl = '/getBookCols';
  private getDvdColsUrl = '/getDvdCols';

  constructor(private http: HttpClient) { }

  //On initialization
  ngOnInit(){

    //Get the number of book and dvd columns and store those in the display panel
    this.getNoOfBookCols();
    this.getNoOfDvdCols();

    //Hide the book details form and the dvd details form
    document.getElementById("bookForm").hidden = true;
    document.getElementById("dvdForm").hidden = true;

    //Initialize the decision form
    this.form = new FormGroup({
      itemType: new FormControl("",Validators.required)
    });

    //Initialize the book details form
    this.bookDetailsForm = new FormGroup({
      bTitle: new FormControl("",Validators.required),
      bIsbn: new FormControl("",Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
        Validators.pattern('(1111111[1-9]|111111[2-9][0-9]|11111[2-9][0-9]{2}|1111[2-9][0-9]{3}|111[2-9][0-9]{4}|11[2-9][0-9]{5}|1[2-9][0-9]{6}|[2-9][0-9]{7}|[1-8][0-9]{8}|9[0-8][0-9]{7}|99[0-8][0-9]{6}|999[0-8][0-9]{5}|9999[0-8][0-9]{4}|99999[0-8][0-9]{3}|999999[0-8][0-9]{2}|9999999[0-8][0-9]|99999999[0-9]|[1-8][0-9]{9}|9[0-8][0-9]{8}|99[0-8][0-9]{7}|999[0-8][0-9]{6}|9999[0-8][0-9]{5}|99999[0-8][0-9]{4}|999999[0-8][0-9]{3}|9999999[0-8][0-9]{2}|99999999[0-8][0-9]|999999999[0-9]|[1-8][0-9]{10}|9[0-8][0-9]{9}|99[0-8][0-9]{8}|999[0-8][0-9]{7}|9999[0-8][0-9]{6}|99999[0-8][0-9]{5}|999999[0-8][0-9]{4}|9999999[0-8][0-9]{3}|99999999[0-8][0-9]{2}|999999999[0-8][0-9]|9999999999[0-9]|[1-8][0-9]{11}|9[0-8][0-9]{10}|99[0-8][0-9]{9}|999[0-8][0-9]{8}|9999[0-8][0-9]{7}|99999[0-8][0-9]{6}|999999[0-8][0-9]{5}|9999999[0-8][0-9]{4}|99999999[0-8][0-9]{3}|999999999[0-8][0-9]{2}|9999999999[0-8][0-9]|99999999999[0-9]|[1-8][0-9]{12}|9[0-8][0-9]{11}|99[0-8][0-9]{10}|999[0-8][0-9]{9}|9999[0-8][0-9]{8}|99999[0-8][0-9]{7}|999999[0-8][0-9]{6}|9999999[0-8][0-9]{5}|99999999[0-8][0-9]{4}|999999999[0-8][0-9]{3}|9999999999[0-8][0-9]{2}|99999999999[0-8][0-9]|999999999999[0-9])')
      ])),
      bSector: new FormControl("",Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ])),
      bPubDate: new FormControl("",Validators.required),
      bAuthor: new FormControl("",Validators.required)
  });

    //Initialize the dvd details form
    this.dvdDetailsForm = new FormGroup({
      dTitle: new FormControl("",Validators.required),
      dBarcode: new FormControl("",Validators.compose([
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(12),
        Validators.pattern('(1111111[1-9]|111111[2-9][0-9]|11111[2-9][0-9]{2}|1111[2-9][0-9]{3}|111[2-9][0-9]{4}|11[2-9][0-9]{5}|1[2-9][0-9]{6}|[2-9][0-9]{7}|[1-8][0-9]{8}|9[0-8][0-9]{7}|99[0-8][0-9]{6}|999[0-8][0-9]{5}|9999[0-8][0-9]{4}|99999[0-8][0-9]{3}|999999[0-8][0-9]{2}|9999999[0-8][0-9]|99999999[0-9]|[1-8][0-9]{9}|9[0-8][0-9]{8}|99[0-8][0-9]{7}|999[0-8][0-9]{6}|9999[0-8][0-9]{5}|99999[0-8][0-9]{4}|999999[0-8][0-9]{3}|9999999[0-8][0-9]{2}|99999999[0-8][0-9]|999999999[0-9]|[1-8][0-9]{10}|9[0-8][0-9]{9}|99[0-8][0-9]{8}|999[0-8][0-9]{7}|9999[0-8][0-9]{6}|99999[0-8][0-9]{5}|999999[0-8][0-9]{4}|9999999[0-8][0-9]{3}|99999999[0-8][0-9]{2}|999999999[0-8][0-9]|9999999999[0-9]|[1-8][0-9]{11}|9[0-8][0-9]{10}|99[0-8][0-9]{9}|999[0-8][0-9]{8}|9999[0-8][0-9]{7}|99999[0-8][0-9]{6}|999999[0-8][0-9]{5}|9999999[0-8][0-9]{4}|99999999[0-8][0-9]{3}|999999999[0-8][0-9]{2}|9999999999[0-8][0-9]|99999999999[0-9]|[1-8][0-9]{12}|9[0-8][0-9]{11}|99[0-8][0-9]{10}|999[0-8][0-9]{9}|9999[0-8][0-9]{8}|99999[0-8][0-9]{7}|999999[0-8][0-9]{6}|9999999[0-8][0-9]{5}|99999999[0-8][0-9]{4}|999999999[0-8][0-9]{3}|9999999999[0-8][0-9]{2}|99999999999[0-8][0-9]|999999999999[0-9])')
      ])),
      dSector: new FormControl("",Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ])),
      dPubDate: new FormControl("",Validators.required),
      dProducer: new FormControl("",Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ])),
      dActor: new FormControl("",Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ])),
      dLanguages: new FormControl("",Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ])),
      dSubs: new FormControl("",Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]))
  });

  }

  //Function to decide whether to show the book form or the dvd form
  public decideForm(decision){

    if(decision.itemType == "dvd"){
      document.getElementById("bookForm").hidden = true;
      document.getElementById("dvdForm").hidden = false;
    }
    else{
      document.getElementById("dvdForm").hidden = true;
      document.getElementById("bookForm").hidden = false;
    }

  }

  //Function to post data of the book form, on submit
  public postBookFormData(value: any): void {
    if ((<HTMLInputElement>document.getElementById('availableBooksNum')).innerText == "0") {
      document.getElementById("bookErrorMessage").innerText = "No Spaces available for books.";
    }
    else {
      this.sendBookData(value).subscribe((data: any) => {
        this.bookFormResponse = data;

        if (this.bookFormResponse === 'Duplicate ISBN entry !') {
          document.getElementById("bookErrorMessage").innerText = this.bookFormResponse;
          alert(this.bookFormResponse);
          this.bookDetailsForm.reset();
        }
        else {
          this.bookDetailsForm.reset();
          alert("Book Added");
          this.changeBookColsAfterSubmit();
        }
      });
    }
  }

  //Function to post data of the dvd form, on submit
  public postDvdFormData(value: any): void {
    if ((<HTMLInputElement>document.getElementById('availableDvdNum')).innerText == "0") {
      document.getElementById("dvdErrorMessage").innerText = "No Spaces available for Dvds.";
    }
    else {
      this.sendDvdData(value).subscribe((data: any) => {
        this.dvdFormResponse = data;
        if (this.dvdFormResponse === 'Duplicate Barcode entry !') {
          document.getElementById("dvdErrorMessage").innerText = this.dvdFormResponse;
          alert(this.dvdFormResponse);
          this.dvdDetailsForm.reset();
        }
        else {
          this.dvdDetailsForm.reset();
          alert("Dvd added");
          this.changeDvdColsAfterSubmit();
        }
      });
    }
  }

  //Change the number of book columns after submit
  public changeBookColsAfterSubmit():any{
    document.getElementById("bookErrorMessage").innerText = "Book added";
    window.setTimeout(() => {this.getNoOfBookCols();}, 300);
  }

  //Change the number of dvd columns after submit
  public changeDvdColsAfterSubmit():any{
    document.getElementById("dvdErrorMessage").innerText = "Dvd added";
    window.setTimeout(() => {this.getNoOfDvdCols();}, 300);
  }

  //Get the number of book columns
  public getNoOfBookCols(): void {
    this.sendToGetBookCol().subscribe((data: any) => {
      this.noOfBookCols = data;
      document.getElementById('storedBooksNum').innerHTML = this.noOfBookCols;
      var free = 150 - +this.noOfBookCols;
      document.getElementById('availableBooksNum').innerHTML = String(free);
    });
  }

  //Get the number of dvd columns
  public getNoOfDvdCols(): void {
    this.sendToGetDvdCol().subscribe((data: any) => {
      this.noOfDvdCols = data;
      document.getElementById('storedDvdsNum').innerHTML = this.noOfDvdCols;
      var free = 50 - +this.noOfDvdCols;
      document.getElementById('availableDvdNum').innerHTML = String(free);
    });
  }

  //Send the http post request carrying data of book form
  public sendBookData(value: any): Observable<any> {
    return this.http.post(this.addBookUrl, value);
  }

  //Send the http post request carrying data of book form
  public sendDvdData(value: any): Observable<any> {
    return this.http.post(this.addDvdUrl, value);
  }

  //Send the http post request to get number of book columns
  private sendToGetBookCol(): Observable<any>  {
    return this.http.post(this.getBookColsUrl, {});
  }

  //Send the http post request to get the number of dvd columns
  private sendToGetDvdCol(): Observable<any>  {
    return this.http.post(this.getDvdColsUrl, {});
  }

}
