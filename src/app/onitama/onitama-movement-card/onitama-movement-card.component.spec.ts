import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnitamaMovementCardComponent } from './onitama-movement-card.component';

describe('OnitamaMovementCardComponent', () => {
  let component: OnitamaMovementCardComponent;
  let fixture: ComponentFixture<OnitamaMovementCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnitamaMovementCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnitamaMovementCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
