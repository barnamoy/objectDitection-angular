import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule } from "@angular/material/card";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

import { MatToolbarModule } from "@angular/material/toolbar";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { UploaderComponent } from "./uploader/uploader.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { ApiService } from "./services/api.service";
import { HttpClientModule } from "@angular/common/http";
import { ListComponent } from "./list/list.component";
import { AngularFileUploaderModule } from "angular-file-uploader";
import { MatSnackBar } from "@angular/material/snack-bar";
//import {Overlay} from "@angular/material/"
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { from } from "rxjs";
const appRoutes: Routes = [
  { path: "", component: UploaderComponent },
  { path: "upload", component: UploaderComponent },
  { path: "list", component: ListComponent }
];
@NgModule({
  declarations: [AppComponent, UploaderComponent, ListComponent],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatCardModule,
    MatGridListModule,
    HttpClientModule,
    AngularFileUploaderModule,
    MatSnackBarModule
  ],
  providers: [ApiService, MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule {}
