
import { Component, Input, OnInit, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { HttpRequest, HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';

import { Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ResultViewModel } from '../../../models/ResultViewModel';
import { ImageUrlPipe } from '../../../pipes/image-url.pipe';

// import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
// import { setInterval } from 'timers';


@Component({
  selector: 'app-file-upload',
  templateUrl: 'file-upload.component.html',
  styleUrls: ['file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => FileUploadComponent),
    }
  ]
})

export class FileUploadComponent implements ControlValueAccessor, OnInit {
  
  @Input() FileName;
  @Input() label;
  @Input() isRequired: boolean = false;
  @Input() isMultiple: boolean = false;
  @Input() acceptedExtensions: string[] = ['png', 'gif', 'jpg', 'pdf', 'doc', 'docx', 'xlsx', 'xls', 'iso', 'mp4'];
  @Input() veiwOnly: boolean = false;

  @Output() changed = new EventEmitter();

  acceptedExtensionsString: string;
  isDisabled: boolean = false;
  filesStatus = [];
  public file: any;

  constructor(
    private http: HttpClient,
    private _ImageUrlPipe: ImageUrlPipe
  ) { }

  ngOnInit() {
    let value = 0;
    setInterval(function(){
      value++;
      console.log('delay ' + value + ' second'); 
      console.log('FileName', this._ImageUrlPipe.transform(this.FileName));
      this.file = { Path: this.FileName, fullPath: this._ImageUrlPipe.transform(this.FileName)};
    }, 300)
    /*
    const Observable = Rx.Observable.interval(300).take(3);
		Observable.subscribe(value => { 
      console.log('delay ' + value + ' second'); 
      console.log('FileName', this._ImageUrlPipe.transform(this.FileName));
      this.file = { Path: this.FileName, fullPath: this._ImageUrlPipe.transform(this.FileName)};
    });
    */

    this.acceptedExtensionsString = this.acceptedExtensions.reduce((str, ext) => `.${ext},${str}`, '');

  }

  uploadFiles(files) {

    for (let j = 0; j < files.length; j++) {

      const fileStatus = <any>{};

      const formData: FormData = new FormData();

      formData.append('file', files[j], files[j].name);

      fileStatus.Name = files[j].name;

      const spiletedName = files[j].name.split('.');

      fileStatus.Extension = spiletedName[spiletedName.length - 1];

      fileStatus.Success = true;

      if (this.acceptedExtensions.indexOf(fileStatus.Extension.toLowerCase()) > -1) {

        const progress = new Subject<number>();

        fileStatus.uploudRequest =

          this.http
            .request(new HttpRequest('POST', `${environment.api_url}/Upload`, formData, { reportProgress: true }))
            .subscribe(event => {

              if (event.type === HttpEventType.UploadProgress) {

                progress.next(Math.round(100 * event.loaded / event.total));

              } else if (event instanceof HttpResponse) {

                progress.complete();

              }

              if (event.type === HttpEventType.Response) {

                const result: ResultViewModel = event.body as ResultViewModel;

                // (event.body['Success']) {
                if (result.Success) {

                  this.file = result.Data[0];

                  this.file.fullPath = this._ImageUrlPipe.transform(this.file.Path);

                  Object.assign(fileStatus, this.file); // event.body['Data'][0]); // extent object

                  this.changed.emit({ FilePath: this.file.fullPath, FileName: this.file.Path });

                  if (this.isMultiple) {
                    this.onChange(this.filesStatus);
                  } else {
                    this.onChange(this.file.Path);
                  }

                } else {

                  fileStatus.Message = result.Message; // event.body['Message'];

                  fileStatus.Success = result.Success; // event.body['Success'];
                }
              }
            },
              error => {
                fileStatus.Message = error.message;
                fileStatus.Success = false;
              }
            );

        progress.subscribe(process => fileStatus.progress = process);

        if (this.isMultiple) {

          fileStatus.DocumentID = 0;

          this.filesStatus.push(fileStatus);

        } else {

          this.filesStatus[0] = fileStatus;

        }
      }
    }
  }

  cancelUpload(fileName: string) {
    const thisFile = this.filesStatus.find(file => file.Name === fileName);
    thisFile.uploudRequest.unsubscribe();
    this.filesStatus.splice(this.filesStatus.indexOf(thisFile), 1);
  }

  deleteUpload(fileName: string) {
    this.file = { Path: '', fullPath: this._ImageUrlPipe.transform(null)};
    this.changed.emit(null);
    // const thisFile = this.filesStatus.find(file => file.Name === fileName);
    // this.filesStatus.splice(this.filesStatus.indexOf(thisFile), 1);
    // if (this.isMultiple) {
    //   this.onChange(this.filesStatus.filter(i => i.Name !== fileName));
    // } else {
    //   this.onChange(null);
    // }
  }

  spliteFileName(fileName: string): string {
    let splitedString: string;
    if (fileName && fileName.length > 35) {
      splitedString = fileName.replace(fileName.slice(12, fileName.length - 12), '...');
    } else {
      splitedString = fileName;
    }
    return splitedString;
  }

  openLink(url) {
    const dualScreenLeft = window.screenLeft !== undefined && window.screenLeft;
    const dualScreenTop = window.screenTop !== undefined && window.screenTop;
    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
    const w = 850;
    const h = 500;
    const left = ((width / 2) - (w / 2)) + dualScreenLeft;
    const top = ((height / 2) - (h / 2)) + dualScreenTop;
    // let thisWindow =
    window.open(url, 'thisWindow', 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    // thisWindow['print']();
  }

  writeValue(obj: any): void {

    console.log(obj);

    if (obj) {
      if (this.isMultiple) {
        if (obj.length) {
          obj.forEach(file => {
            const fileStatus = <any>{};
            fileStatus.Name = file.Name;
            fileStatus.ID = file.ID;
            const spiletedName = file.Path.split('.');
            fileStatus.Extension = spiletedName[spiletedName.length - 1];
            fileStatus.DocumentID = file.DocumentID;
            fileStatus.Success = true;
            fileStatus.TempUrl = file.Path;
            fileStatus.Path = file.Path;
            this.filesStatus.push(fileStatus);
          });
        }
      } else {
        const fileName = obj.split('/')[obj.split('/').length - 1].split('[^STOP^]')[0];
        this.filesStatus[0] = {
          // Path: obj,
          Extension: fileName.split('.')[fileName.split('.').length - 1],
          Name: fileName,
          TempUrl: obj
        };
      }
    }
  }

  onChange = (data) => this.writeValue(data);

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  onTouched = () => { };

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  getFullPath(Path) {
    return this._ImageUrlPipe.transform(Path);
  }

}