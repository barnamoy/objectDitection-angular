import { Component, OnInit } from "@angular/core";
import { Directive, Input, ViewChild, ElementRef } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ApiService } from "./../services/api.service";
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
  selector: "app-uploader",
  templateUrl: "./uploader.component.html",
  styleUrls: ["./uploader.component.css"]
})
export class UploaderComponent {
  @Input()
  mode;
  @Input()
  names;
  @Input()
  url;
  @Input()
  method;
  @Input()
  multiple;
  @Input()
  disabled;
  @Input()
  accept;
  @Input()
  maxFileSize;
  @Input()
  auto = true;
  @Input()
  withCredentials;
  @Input()
  invalidFileSizeMessageSummary;
  @Input()
  invalidFileSizeMessageDetail;
  @Input()
  invalidFileTypeMessageSummary;
  @Input()
  invalidFileTypeMessageDetail;
  @Input()
  previewWidth;
  @Input()
  chooseLabel = "Choose";
  @Input()
  uploadLabel = "Upload";
  @Input()
  cancelLabel = "Cance";
  @Input()
  customUpload;
  @Input()
  showUploadButton;
  @Input()
  showCancelButton;

  @Input()
  dataUriPrefix;
  @Input()
  deleteButtonLabel;
  @Input()
  deleteButtonIcon = "close";
  @Input()
  showUploadInfo;
  imageSrc: any;
  ImageData: any;
  showReturnImg: any = "true";
  /**
   *
   */

  @ViewChild("fileUpload")
  fileUpload: ElementRef;

  inputFileName: string;

  @Input()
  files: File[] = [];

  constructor(
    private sanitizer: DomSanitizer,
    private apiService: ApiService,
    private matSnackBar: MatSnackBar
  ) {}

  onClick(event) {
    if (this.fileUpload) this.fileUpload.nativeElement.click();
  }

  onInput(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = event => {
        // called once readAsDataURL is completed
        // this.ImageData = event.target.result;
      };
    }
  }

  onFileSelected(event) {
    let files = event.dataTransfer
      ? event.dataTransfer.files
      : event.target.files;
    console.log("event::::::", event);
    for (let i = 0; i < files.length; i++) {
      let file = files[i];

      //if(!this.isFileSelected(file)){
      if (this.validate(file)) {
        //      if(this.isImage(file)) {
        file.objectURL = this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(files[i])
        );
        //      }
        if (!this.isMultiple()) {
          this.files = [];
        }
        this.files.push(files[i]);
        //  }
      }
      //}
    }
  }

  removeFile(event, file) {
    let ix;
    if (this.files && -1 !== (ix = this.files.indexOf(file))) {
      this.files.splice(ix, 1);
      this.clearInputElement();
    }
  }

  validate(file: File) {
    for (const f of this.files) {
      if (
        f.name === file.name &&
        f.lastModified === file.lastModified &&
        f.size === f.size &&
        f.type === f.type
      ) {
        return false;
      }
    }
    return true;
  }

  clearInputElement() {
    this.fileUpload.nativeElement.value = "";
  }

  isMultiple(): boolean {
    return this.multiple;
  }
  upload() {
    // console.log('upload clicked',this.files)
    this.apiService.upload(this.files[0]).subscribe(ret => {
      console.log(ret);
      this.ImageData = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(ret)
      );
      this.openSnackBar("Your file uploaded sucessfully", "Ok");
      this.showReturnImg = "";
      this.apiService.uploadtoNodeServer(ret).subscribe(ret => {
        console.log(ret);
      });
    });
  }

  openSnackBar(message: string, action: string) {
    this.matSnackBar.open(message, action, {
      duration: 2000
    });
  }
}
