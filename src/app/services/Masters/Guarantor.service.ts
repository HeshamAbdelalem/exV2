import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '../ApiService';
import { AutoComplete } from '../../models/AutoComplete';
import { Guarantor } from '../../models/Masters/Guarantor';
import { ResultViewModel } from '../../models/ResultViewModel';

@Injectable()
export class GuarantorService extends ApiService {

  constructor(private http: HttpClient) {
    super(http);
    this.ApiName = 'Guarantor';
  }

  public Guarantor_Auto(trem?: string): Observable<any> {
    this.autoComplete = new AutoComplete();
    this.autoComplete.Table = 'Guarantor_Vw';
    this.autoComplete.SelectColumns = 'ID, Name';
    this.autoComplete.SearchColumns = 'Name';
    this.autoComplete.SearchCriteria = (trem === '' || trem === undefined) ? `%%` : `` + trem + `%`;
    return this.AutoComplete(this.autoComplete);
  }

  public GetGuarantor(id: number): Observable<Guarantor> {
    return this.GetByID(id).pipe(map(res => res));
  }

  public GetGuarantorPage(obj: Guarantor): Observable<ResultViewModel> {
    return this.GetPage(obj);
  }

  public GetGuarantorPage_Old(sortColumn: string, sortDir: string, pageIndex: number): Observable<any> {

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

  public AddGuarantor(obj: Guarantor): Observable<ResultViewModel> {
    return this.Add(obj);
  }

  public UpdateGuarantor(obj: Guarantor): Observable<ResultViewModel> {
    return this.Update(obj);
  }

  public DeleteGuarantor(id: number): Observable<ResultViewModel> {
    return this.Delete(id);
  }

}
