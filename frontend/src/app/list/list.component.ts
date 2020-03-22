import { Component, OnInit } from "@angular/core";
import { ApiService } from "./../services/api.service";
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  file: "";
  list: any;
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getList().subscribe(ret => {
      console.log(ret);
      this.list = ret.data;
    });
  }
}
