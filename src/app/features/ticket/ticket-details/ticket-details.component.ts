import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {combineLatest} from 'rxjs';
import {FormattedTicket, TicketListComponent} from '../ticket-list/ticket-list.component';
import {BackendService} from '@core/services/backend.service';
import {map, tap} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '@core/models/interfaces/user.interface';
import * as _ from 'lodash';

@Component({
    selector: 'app-ticket-details',
    templateUrl: './ticket-details.component.html',
    styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {
    ticketForm: FormGroup;
    users: User[];

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private backendService: BackendService,
    ) {
    }

    ngOnInit(): void {
        const ticketId: number = +this.route.snapshot.paramMap.get('ticketId');
        this.getTicketDetails(ticketId);
    }


    getTicketDetails(ticketId: number): void {
        combineLatest([
            this.backendService.users(),
            this.backendService.ticket(ticketId).pipe(map(TicketListComponent.formatTicketState))
        ]).subscribe(([users, ticket]) => {
            const formattedTicket = {...ticket, author: _.find(users, (user) => user.id === ticket.assigneeId).name}
            this.initTicketForm(formattedTicket)
            this.users = users;
        })
    }

    initTicketForm(ticket: FormattedTicket): void {
        this.ticketForm = this.fb.group({
            id: [ticket.id],
            author: [ticket.assigneeId],
            description: [ticket.description],
            completedString: [ticket.completedString],
        })
    }

    assignTicket(): void {
        const ticketId = this.ticketForm.value.id;
        const newAuthorId = this.ticketForm.value.author;
        this.backendService.assignTicket(ticketId, newAuthorId)
            .pipe(tap(this.resetTicketForm.bind(this)))
            .subscribe()
    }

    completeTicket(): void {
        const ticketId = this.ticketForm.value.id;
        this.backendService.complete(ticketId, true)
            .pipe(tap(this.resetTicketForm.bind(this)))
            .subscribe();
    }

    resetTicketForm(ticket): void {
        this.ticketForm = undefined;
        this.users = undefined;
        this.getTicketDetails(ticket.id);
    }


}

