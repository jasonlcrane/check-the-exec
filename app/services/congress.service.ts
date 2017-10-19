import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Representative} from '../order/representative';

@Injectable()
export class CongressService {
    private _baseUrl = "https://congress.api.sunlightfoundation.com/";

    constructor(private _http: Http) {}

    getRepresentatives (zip): Observable<Representative[]> {
        let urlFinish = "legislators/locate?zip=" + zip;
        console.log('url', this._baseUrl + urlFinish);
        return this._http.get(this._baseUrl + urlFinish)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        console.log(body.results[0]);
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