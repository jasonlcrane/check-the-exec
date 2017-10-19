import {Component, ElementRef, ViewChild} from '@angular/core';
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { openUrl } from 'utils/utils';
var firebase = require("nativescript-plugin-firebase");

@Component({
    selector: "ns-details",
    moduleId: module.id,
    templateUrl: "./about.component.html",
    styleUrls: ["./about.component.css"]
})
export class AboutComponent {

    constructor(
        private routerExtensions: RouterExtensions
    ) { }

    public goBack() {
        firebase.admob.showInterstitial({
            testing: false,
            androidInterstitialId: "ca-app-pub-2620969341912080/3006655850"
        }).then(
            function() {
                console.log("admob createInterstitial done");
                this.routerExtensions.back();

            },
            function(error) {
                console.log("admob createInterstitial error: " + error);
                this.routerExtensions.back();
            }
        );

        this.routerExtensions.back();
    }

    openLink(url: string) {
        openUrl(url);
    }
}
