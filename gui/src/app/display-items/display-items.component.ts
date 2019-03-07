import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-display-items',
  templateUrl: './display-items.component.html',
  styleUrls: ['./display-items.component.css']
})
export class DisplayItemsComponent implements OnInit {

  //To store data
  private book: any;
  private dvd: any;
  private items: any;
  private sresult: any =null;

  //To control the search bar
  private show:boolean = true;

  //Url
  private getItemsUrl= '/getItems';



  constructor(private http: HttpClient) { }

  //On Initialization
  ngOnInit() {

    this.show= true;
    this.sresult= null;
    this.getAllItems();
    (<HTMLInputElement>document.getElementById('searchBar')).value="";
  }

  //Search for an item
  public search():void{

    var input = (<HTMLInputElement>document.getElementById('searchBar')).value;

    for(let i=0;i<this.items.length;i++){
      if(input == this.items[i].name){
          this.show = false;
          this.sresult = this.items[i];
          break;
      }
    }
    if(this.sresult == null) {
      (<HTMLInputElement>document.getElementById('searchBar')).value = "No Result";
    }
  }

  //Get all items in the library
  public getAllItems(): void {
    this.sendToGetItems().subscribe((data: any) => {
      this.items = data;
    });
  }

  //Send http post request to get all the items in a list
  private sendToGetItems(): Observable<any>  {
    return this.http.post(this.getItemsUrl, {});
  }

}
