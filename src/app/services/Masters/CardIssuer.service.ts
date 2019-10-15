import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '../ApiService';
import { AutoComplete } from '../../models/AutoComplete';
import { CardIssuer } from '../../models/Masters/CardIssuer';
import { ResultViewModel } from '../../models/ResultViewModel';

@Injectable()
export class CardIssuerService extends ApiService {

  constructor(private http: HttpClient) {
    super(http);
    this.ApiName = 'CardIssuer';
  }

  public CardIssuer_Auto(trem?: string): Observable<any> {
    this.autoComplete = new AutoComplete();
    this.autoComplete.Table = 'CardIssuer_Vw';
    this.autoComplete.SelectColumns = 'ID, Name';
    this.autoComplete.SearchColumns = 'Name';
    this.autoComplete.SearchCriteria = (trem === '' || trem === undefined) ? `%%` : `` + trem + `%`;
    return this.AutoComplete(this.autoComplete);
  }

  public GetCardIssuer(id: number): Observable<CardIssuer> {
    return this.GetByID(id).pipe(map(res => res));
  }

  public GetCardIssuerPage(obj: CardIssuer): Observable<ResultViewModel> {
    return this.GetPage(obj);
  }

  public GetCardIssuerPage_Old(sortColumn: string, sortDir: string, pageIndex: number): Observable<any> {

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

  public AddCardIssuer(obj: CardIssuer): Observable<ResultViewModel> {
    return this.Add(obj);
  }

  public UpdateCardIssuer(obj: CardIssuer): Observable<ResultViewModel> {
    return this.Update(obj);
  }

  public DeleteCardIssuer(id: number): Observable<ResultViewModel> {
    return this.Delete(id);
  }

}
