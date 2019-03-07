import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-borrow-item',
  templateUrl: './borrow-item.component.html',
  styleUrls: ['./borrow-item.component.css']
})

export class BorrowItemComponent {

  //Forms in the html file
  private borrowForm;
  private borrowBookDetailsForm;
  private borrowDvdDetailsForm;
  private readerDetailsForm;

  //Response of the reader's registration
  private readerRegisterResponse: string;

  //Route urls
  private readerRegisterUrl= '/registerReader';
  private readerAddedResponse: string;
  private borrowBookUrl= '/borrowBookReader';
  private borrowDvdUrl= '/borrowDvdReader';

  constructor(private http: HttpClient) { }

  //On initialization
  ngOnInit(){ 

    //Hide book details form and dvd details form
    document.getElementById("borrowBookForm").hidden = true;
    document.getElementById("borrowDvdForm").hidden = true;

    //Initialize decision form
    this.borrowForm = new FormGroup({
      borrowItemType: new FormControl("",Validators.required)
    });

    //Initialize book details form
    this.borrowBookDetailsForm = new FormGroup({
      borrowBookIsbn: new FormControl("",Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
        Validators.pattern('(1111111[1-9]|111111[2-9][0-9]|11111[2-9][0-9]{2}|1111[2-9][0-9]{3}|111[2-9][0-9]{4}|11[2-9][0-9]{5}|1[2-9][0-9]{6}|[2-9][0-9]{7}|[1-8][0-9]{8}|9[0-8][0-9]{7}|99[0-8][0-9]{6}|999[0-8][0-9]{5}|9999[0-8][0-9]{4}|99999[0-8][0-9]{3}|999999[0-8][0-9]{2}|9999999[0-8][0-9]|99999999[0-9]|[1-8][0-9]{9}|9[0-8][0-9]{8}|99[0-8][0-9]{7}|999[0-8][0-9]{6}|9999[0-8][0-9]{5}|99999[0-8][0-9]{4}|999999[0-8][0-9]{3}|9999999[0-8][0-9]{2}|99999999[0-8][0-9]|999999999[0-9]|[1-8][0-9]{10}|9[0-8][0-9]{9}|99[0-8][0-9]{8}|999[0-8][0-9]{7}|9999[0-8][0-9]{6}|99999[0-8][0-9]{5}|999999[0-8][0-9]{4}|9999999[0-8][0-9]{3}|99999999[0-8][0-9]{2}|999999999[0-8][0-9]|9999999999[0-9]|[1-8][0-9]{11}|9[0-8][0-9]{10}|99[0-8][0-9]{9}|999[0-8][0-9]{8}|9999[0-8][0-9]{7}|99999[0-8][0-9]{6}|999999[0-8][0-9]{5}|9999999[0-8][0-9]{4}|99999999[0-8][0-9]{3}|999999999[0-8][0-9]{2}|9999999999[0-8][0-9]|99999999999[0-9]|[1-8][0-9]{12}|9[0-8][0-9]{11}|99[0-8][0-9]{10}|999[0-8][0-9]{9}|9999[0-8][0-9]{8}|99999[0-8][0-9]{7}|999999[0-8][0-9]{6}|9999999[0-8][0-9]{5}|99999999[0-8][0-9]{4}|999999999[0-8][0-9]{3}|9999999999[0-8][0-9]{2}|99999999999[0-8][0-9]|999999999999[0-9])')
      ])),
      borrowBookBorDate: new FormControl("",Validators.required),
      borrowBookBorTime: new FormControl("",Validators.required),
      borrowBookCurReaderID: new FormControl("",Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]))
    });

    //Initialize dvd details form
    this.borrowDvdDetailsForm = new FormGroup({

      borrowDvdBarcode: new FormControl("",Validators.compose([
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(12),
        Validators.pattern('(1111111[1-9]|111111[2-9][0-9]|11111[2-9][0-9]{2}|1111[2-9][0-9]{3}|111[2-9][0-9]{4}|11[2-9][0-9]{5}|1[2-9][0-9]{6}|[2-9][0-9]{7}|[1-8][0-9]{8}|9[0-8][0-9]{7}|99[0-8][0-9]{6}|999[0-8][0-9]{5}|9999[0-8][0-9]{4}|99999[0-8][0-9]{3}|999999[0-8][0-9]{2}|9999999[0-8][0-9]|99999999[0-9]|[1-8][0-9]{9}|9[0-8][0-9]{8}|99[0-8][0-9]{7}|999[0-8][0-9]{6}|9999[0-8][0-9]{5}|99999[0-8][0-9]{4}|999999[0-8][0-9]{3}|9999999[0-8][0-9]{2}|99999999[0-8][0-9]|999999999[0-9]|[1-8][0-9]{10}|9[0-8][0-9]{9}|99[0-8][0-9]{8}|999[0-8][0-9]{7}|9999[0-8][0-9]{6}|99999[0-8][0-9]{5}|999999[0-8][0-9]{4}|9999999[0-8][0-9]{3}|99999999[0-8][0-9]{2}|999999999[0-8][0-9]|9999999999[0-9]|[1-8][0-9]{11}|9[0-8][0-9]{10}|99[0-8][0-9]{9}|999[0-8][0-9]{8}|9999[0-8][0-9]{7}|99999[0-8][0-9]{6}|999999[0-8][0-9]{5}|9999999[0-8][0-9]{4}|99999999[0-8][0-9]{3}|999999999[0-8][0-9]{2}|9999999999[0-8][0-9]|99999999999[0-9]|[1-8][0-9]{12}|9[0-8][0-9]{11}|99[0-8][0-9]{10}|999[0-8][0-9]{9}|9999[0-8][0-9]{8}|99999[0-8][0-9]{7}|999999[0-8][0-9]{6}|9999999[0-8][0-9]{5}|99999999[0-8][0-9]{4}|999999999[0-8][0-9]{3}|9999999999[0-8][0-9]{2}|99999999999[0-8][0-9]|999999999999[0-9])')
      ])),
      borrowDvdBorDate: new FormControl("",Validators.required),
      borrowDvdBorTime: new FormControl("",Validators.required),
      borrowDvdCurReaderID: new FormControl("",Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]))
    });

    //Form to register readers
    this.readerDetailsForm = new FormGroup({
      readerId: new FormControl("",Validators.compose([
        Validators.required,
        Validators.pattern('^(\\(?\\+?[0-9]*\\)?)?[0-9_\\- \\(\\)]*$')
      ])),
      readerName: new FormControl("",Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ])),
      mobile: new FormControl("",Validators.compose([
        Validators.required,
          Validators.pattern('^0\\d{9}$'),
          Validators.minLength(9),
          Validators.maxLength(10)
        ])),
      email: new FormControl("",Validators.compose([
        Validators.required,
        Validators.email
      ]))
    })
  }

  //Decide what form to load
  public decideForm (decision){
    if(decision.borrowItemType == "dvd"){
      document.getElementById("borrowBookForm").hidden = true;
      document.getElementById("borrowDvdForm").hidden = false;
    }
    else{
      document.getElementById("borrowDvdForm").hidden = true;
      document.getElementById("borrowBookForm").hidden = false;
    }

  }

  //Send new user details
  registerReader(value: any): void {
    this.sendToRegister(value).subscribe((data: any) => {
      this.readerRegisterResponse = data;
      alert(this.readerRegisterResponse);
      document.getElementById("userMessage").innerText = this.readerRegisterResponse;
      this.readerDetailsForm.reset();
    });
  }

  //Send http post request
  private sendToRegister(value: any) {
    return this.http.post(this.readerRegisterUrl, value);
  }

  //Send book borrower details
  addBookReader(value: any): void {
    this.sendBookReader(value).subscribe((data: any) => {
      this.readerAddedResponse = data;
      alert(this.readerAddedResponse);
      document.getElementById("bookMessage").innerText = this.readerAddedResponse;
      this.borrowBookDetailsForm.reset();
    });
  }

  //Send http post request to add borrower for a book
  private sendBookReader(value: any) {
    return this.http.post(this.borrowBookUrl, value);
  }

  //Send dvd borrower details
  addDvdReader(value: any): void {
    this.sendDvdReader(value).subscribe((data: any) => {
      this.readerAddedResponse = data;
      alert(this.readerAddedResponse);
      document.getElementById("dvdMessage").innerText = this.readerAddedResponse;
      this.borrowDvdDetailsForm.reset();
    });
  }

  //Send http post request to add borrower for a dvd
  private sendDvdReader(value: any) {
    return this.http.post(this.borrowDvdUrl, value);
  }

}
