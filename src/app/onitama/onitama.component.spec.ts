import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnitamaComponent } from './onitama.component';

describe('OnitamaComponent', () => {
  let component: OnitamaComponent;
  let fixture: ComponentFixture<OnitamaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnitamaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnitamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
