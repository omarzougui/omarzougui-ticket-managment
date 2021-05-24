import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RoutingModule } from '@core/routing.module';
import { CoreModule } from '@core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        RoutingModule,
        CoreModule,
        BrowserAnimationsModule,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
