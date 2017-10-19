import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { HttpModule } from '@angular/http';
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { LISTVIEW_DIRECTIVES } from 'nativescript-telerik-ui/listview/angular';
import { TNSFontIconModule } from 'nativescript-ng2-fonticon';

import { OrdersService } from './order/orders.service';
import { OrdersComponent } from './order/orders.component';
import { OrderComponent } from './order/order.component';

import { AboutComponent } from './order/about.component';

import { CongressService } from './services/congress.service';

import { CapitalizePipe } from './order/capitalize.pipe';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        HttpModule,
        NativeScriptHttpModule,
        TNSFontIconModule.forRoot({
            'mdi': 'material-design-icons.css'
        }),
        NativeScriptFormsModule
    ],
    declarations: [
        LISTVIEW_DIRECTIVES,
        AppComponent,
        OrdersComponent,
        OrderComponent,
        AboutComponent,
        CapitalizePipe
    ],
    providers: [
        OrdersService,
        CongressService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
