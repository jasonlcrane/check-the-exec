import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Order } from './order'
import { Memo } from './memo';

@Injectable()
export class OrdersService {
    private document_type: string = '2';
    private _baseUrl = "https://www.federalregister.gov/api/v1/documents.json?conditions%5Bcorrection%5D=0&conditions%5Bpresident%5D=donald-trump&conditions%5Btype%5D=PRESDOCU&fields%5B%5D=citation&fields%5B%5D=document_number&fields%5B%5D=end_page&fields%5B%5D=executive_order_notes&fields%5B%5D=public_inspection_pdf_url&fields%5B%5D=executive_order_number&fields%5B%5D=publication_date&fields%5B%5D=signing_date&fields%5B%5D=start_page&fields%5B%5D=title&fields%5B%5D=subtype&fields%5B%5D=body_html_url&order=newest&per_page=1000";

    constructor(private _http: Http) {}

    getOrders (document_type): Observable<Order[]> {
        // let urlFinish = "&conditions%5Bpresidential_document_type_id%5D=" + document_type;
        return this._http.get(this._baseUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getMemos (): Observable<Memo[]> {
        let urlFinish = "&conditions%5Bpresidential_document_type_id%5D=3";
        return this._http.get(this._baseUrl + urlFinish)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.results || { };
    }
    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    // public getOrders(document_type) {
    //     var url = this._baseUrl + "&conditions%5Bpresidential_document_type_id%5D=" + document_type;
    //     console.log('url', url);
    //     return this._http.get(url).map(res => <Order[]> res.json());
    // }
}