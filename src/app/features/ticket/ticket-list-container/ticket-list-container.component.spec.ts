import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketListContainerComponent } from './ticket-list-container.component';

describe('TicketListContainerComponent', () => {
  let component: TicketListContainerComponent;
  let fixture: ComponentFixture<TicketListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketListContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
