import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { OrdersComponent } from "./order/orders.component";
import { OrderComponent } from "./order/order.component";
import { AboutComponent } from "./order/about.component";

const routes: Routes = [
    { path: "", redirectTo: "/orders", pathMatch: "full" },
    { path: "orders", component: OrdersComponent },
    { path: 'order', component: OrderComponent },
    { path: 'about', component: AboutComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }