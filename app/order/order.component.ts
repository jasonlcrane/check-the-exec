import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Order } from "./order";
import * as SocialShare from "nativescript-social-share";
import * as ApplicationSettings from "application-settings";
var firebase = require("nativescript-plugin-firebase");

@Component({
    selector: "ns-details",
    moduleId: module.id,
    templateUrl: "./order.component.html",
    styleUrls: ["./order.component.css"]
})
export class OrderComponent implements OnInit {
    order: Order;

    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.order = JSON.parse(ApplicationSettings.getString("order"));

        firebase.admob.showBanner({
            size: firebase.admob.AD_SIZE.SMART_BANNER, // see firebase.admob.AD_SIZE for all options
            margins: { // optional nr of device independent pixels from the top or bottom (don't set both)
                bottom: 0
            },
            androidBannerId: "ca-app-pub-2620969341912080/2308651857",
            testing: false
        }).then(
            function () {
                console.log("AdMob banner showing");
            },
            function (errorMessage) {
                console.log("AdMob error", errorMessage);
            }
        );

    }

    public shareDoc(url) {
        var link = 'Check this out: ' + url;
        SocialShare.shareText(link);
    }

    // public getOrder() {
    //     this.order =
    // }
}
