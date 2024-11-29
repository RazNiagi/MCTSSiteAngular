import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnitamaMovementCardGridComponent } from './onitama-movement-card-grid.component';

describe('OnitamaMovementCardGridComponent', () => {
  let component: OnitamaMovementCardGridComponent;
  let fixture: ComponentFixture<OnitamaMovementCardGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnitamaMovementCardGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnitamaMovementCardGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
