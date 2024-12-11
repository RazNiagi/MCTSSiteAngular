import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnitamaEditorBoardComponent } from './onitama-editor-board.component';

describe('OnitamaEditorBoardComponent', () => {
  let component: OnitamaEditorBoardComponent;
  let fixture: ComponentFixture<OnitamaEditorBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnitamaEditorBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnitamaEditorBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
