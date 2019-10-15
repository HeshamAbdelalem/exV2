import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from '../ApiService';
import { AutoComplete } from '../../models/AutoComplete';
import { Document } from '../../models/Supers/Document';
import { ResultViewModel } from '../../models/ResultViewModel';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DocumentService extends ApiService {

  constructor(private http: HttpClient) {
    super(http);
    this.ApiName = 'Document';
  }

  public Document_Auto(trem?: string): Observable<any> {
    this.autoComplete = new AutoComplete();
    this.autoComplete.Table = 'Document_Vw';
    this.autoComplete.SelectColumns = 'ID, Name';
    this.autoComplete.SearchColumns = 'Name';
    this.autoComplete.SearchCriteria = (trem === '' || trem === undefined) ? `%%` : `` + trem + `%`;
    return this.AutoComplete(this.autoComplete);
  }

  public GetDocument(id: number): Observable<Document> {
    // return this.GetByID(id).pipe(map(res => res));
    return this.GetByID(id).pipe(map(res => res));
  }

  public GetDocumentPage(obj: Document): Observable<ResultViewModel> {
    return this.GetPage(obj);
  }

  public GetDocumentPage_Old(sortColumn: string, sortDir: string, pageIndex: number): Observable<any> {

    sortColumn = 'ID';

    sortDir = 'Asc';

    let extraParams = ``;
    
    extraParams += `?`;
    extraParams += `sortColumn=${sortColumn}`;
    extraParams += `&sortDir=${sortDir}`;
    extraParams += `&pageSize=${environment.pageSize}`;
    extraParams += `&pageIndex=${pageIndex + 1}`;
    return this.Get(extraParams).pipe(map(res => res));
  }

  public AddDocument(obj: Document): Observable<ResultViewModel> {
    return this.Add(obj);
  }

  public UpdateDocument(obj: Document): Observable<ResultViewModel> {
    return this.Update(obj);
  }

  public DeleteDocument(id: number): Observable<ResultViewModel> {
    return this.Delete(id);
  }

}
