import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnitamaBoardComponent } from './onitama-board.component';

describe('OnitamaBoardComponent', () => {
  let component: OnitamaBoardComponent;
  let fixture: ComponentFixture<OnitamaBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnitamaBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnitamaBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
