import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnitamaMovementCardMiniGridComponent } from './onitama-movement-card-mini-grid.component';

describe('OnitamaMovementCardMiniGridComponent', () => {
  let component: OnitamaMovementCardMiniGridComponent;
  let fixture: ComponentFixture<OnitamaMovementCardMiniGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnitamaMovementCardMiniGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnitamaMovementCardMiniGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
