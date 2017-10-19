import { Component, OnInit, Input, ViewChild, ElementRef} from "@angular/core";
import observable = require("data/observable");
import { Router } from "@angular/router";
import { openUrl } from 'utils/utils';
import dialogs = require("ui/dialogs")

import {TITLE_STATE} from 'nativescript-bottombar/bottombar.common';
import * as SocialShare from "nativescript-social-share";

import { Order } from "./order";
import { Representative } from "./representative";
import { OrdersService } from "./orders.service";
import { CongressService } from "../services/congress.service";

import {CapitalizePipe} from "./capitalize.pipe";

import { TabView, SelectedIndexChangedEventData } from "ui/tab-view";
import * as TNSPhone from 'nativescript-phone';
import * as TNSEmail from "nativescript-email";

import listViewModule = require("nativescript-telerik-ui/listview");
import {registerElement} from 'nativescript-angular/element-registry';
import * as ApplicationSettings from "application-settings";

registerElement("BottomBar", () => require("nativescript-bottombar").BottomBar);

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./orders.component.html",
    styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {
    public orders: Array<Order> = [];
    // public memos: Array<Memo> = [];
    public representatives: Array<Representative> = [];
    ordersService: OrdersService;
    congressService: CongressService;
    count: any = '';
    private _fullOrderList: Array<any> = [];
    private _fullMemoList: Array<any> = [];
    order_type: string = '2';
    memo_type: string = '3';
    document_type: string = this.order_type;
    public titleState;
    errorMessage: string;
    tabviewitems: Array<any>;
    repsLoaded = false;
    zip: string = '';

    public tabView: TabView;

    @ViewChild("tabview") tab: ElementRef;

    public navItems: Array<any> = [
        {
            title: "Executive Orders",
            icon: "ic_gavel_black_24dp",
            color: "#3F51B5",
            documentType: this.order_type
        },
        {
            title: "Executive Memos",
            icon: "ic_subject_black_24dp",
            color: "#3F51B5",
            documentType: this.memo_type
        }
    ];


    @Input() order;
    @Input() index;

    constructor(
                private _router: Router,
                ordersService: OrdersService,
                congressService: CongressService
    ) {
        this.ordersService = ordersService;
        this.congressService = congressService;
        this.titleState = TITLE_STATE.ALWAYS_SHOW;
    }

    public refresh($event) {
        this.loadDefaults();
    }

    public shareDoc(url) {
        console.log(url);
        var link = 'Check this out: ' + url;
        SocialShare.shareText(link);
    }

    protected loadCongress(zip) {
        // this.orders.splice(0, this.orders.length);
        this.congressService.getRepresentatives(zip)
            .subscribe(
                representatives => {
                    this.representatives = representatives;
                    if (this.representatives.length) {
                        this.repsLoaded = true;
                    }
                    else {
                        dialogs.alert({
                            title: "Sorry",
                            message: "We couldn't find any representatives for that ZIP code.",
                            okButtonText: "OK"
                        }).then(() => {
                            console.log("Dialog closed!");
                        });
                    }


                },
                error =>  this.errorMessage = <any>error
            );
    }

    showZipForm() {
        this.repsLoaded = false;
    }

    protected loadDefaults() {
        // this.orders.splice(0, this.orders.length);
            this.ordersService.getOrders(this.document_type)
                .subscribe(
                    orders => {
                        this.orders = orders;

                    },
                    error =>  this.errorMessage = <any>error
                );

    }

    public onClick(order) {
        ApplicationSettings.setString("order", JSON.stringify(order));
        this._router.navigate(["/order"]);
    }

    call(number: string = '') {
        TNSPhone.dial(number, true);
    }

    sendEmail(email: string = '') {
        TNSEmail.compose({
            subject: '',
            body: '',
            to: [email]
        }).then(function(){
            console.log("Email composer closed");
        });
    }

    public showAbout() {
        this._router.navigate(["/about"]);
    }

    openLink(url: string) {
        openUrl(url);
    }

    submitZip(zip) {
        console.log(zip);
        if (zip.length === 5 && zip.match(/[0-9]{5}/)) {
            this.loadCongress(zip);
        }
        else {
            dialogs.alert({
                title: "Whoops",
                message: "Please enter a 5-digit ZIP code.",
                okButtonText: "Got it"
            }).then(() => {
                console.log("Dialog closed!");
            });
        }
    }

    ngOnInit(): void {
        this.loadDefaults();
        // this.loadMemos();

        this.tabView = this.tab.nativeElement;

        this.tabView.on("selectedIndexChanged", (args: SelectedIndexChangedEventData) => {
            this.tabSelected(args);
        });
    }

    tabSelected (args) {
        console.log(args.newIndex);
        if (args.newIndex !== 1) {
            this.document_type = this.navItems[args.newIndex].documentType;
            if (this.document_type === this.memo_type) {
                // this.loadMemos();
            }
            else {
                this.loadDefaults();
            }
        }

    }

    private _storeOrders() {
        ApplicationSettings.setString("orders", JSON.stringify(this._fullOrderList));
    }
}