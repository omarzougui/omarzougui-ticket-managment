import { Component, OnInit } from '@angular/core';
import { Ticket } from '@core/models/interfaces/ticket.interface';
import { BackendService } from '@core/services/backend.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RootModules } from '@core/root-modules.enum';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

export type TicketWithoutAuthorName = Omit<FormattedTicket, 'author'>;

export interface FormattedTicket extends Ticket {
    completedString: 'Done' | 'In progress',
    author: string,
}

@Component({
    selector: 'app-ticket-list',
    templateUrl: './ticket-list.component.html',
    styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

    ticketDataSource: MatTableDataSource<FormattedTicket>;
    tickets: FormattedTicket[];
    displayedColumns: (keyof FormattedTicket)[] = ['description', 'completedString', 'author'];

    constructor(
        private backendService: BackendService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.initTicketList();
    }


    static formatTicketState(ticket: Ticket): TicketWithoutAuthorName {
        return { ...ticket, completedString: ticket.completed ? 'Done' : 'In progress' }
    }

    initTicketList(): void {
        combineLatest([
            this.backendService.tickets().pipe(map(this.formatTicketsState)),
            this.backendService.users(),
        ]).subscribe(([tickets, users]) => {
            const formattedTickets = tickets.map((ticket) => {
                return { ...ticket, author: _.find(users, (user) => user.id === ticket.assigneeId).name }
            })
            this.tickets = formattedTickets;
            this.ticketDataSource = new MatTableDataSource(formattedTickets);
        })
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.ticketDataSource.filter = filterValue.trim().toLowerCase();
    }

    formatTicketsState(tickets: Ticket[]): TicketWithoutAuthorName[] {
        return tickets.map((ticket) => {
            return TicketListComponent.formatTicketState(ticket)
        })
    }

    showTicketDetails(ticket: FormattedTicket) {
        this.router.navigate([RootModules.TICKET, ticket.id]);
    }





}
