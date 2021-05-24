import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketRoutes } from './ticket-routes.enum';
import { RouterModule, Routes } from '@angular/router';
import { TicketFilterComponent } from './ticket-filter/ticket-filter.component';
import { SharedModule } from '@shared/shared.module';
import { TicketListContainerComponent } from './ticket-list-container/ticket-list-container.component';

const routes: Routes = [
    {
        path: TicketRoutes.List,
        component: TicketListContainerComponent
    },
    {
        path: ':ticketId',
        component: TicketDetailsComponent
    },
    {
        path: '**',
        redirectTo: TicketRoutes.List,
    }
];

@NgModule({
    declarations: [
        TicketListComponent,
        TicketDetailsComponent,
        TicketFilterComponent,
        TicketListContainerComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
    ]
})
export class TicketModule {
}
