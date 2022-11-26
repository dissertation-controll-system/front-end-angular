import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFacultyDialogComponent } from './edit-faculty-dialog.component';

describe('EditFacultyDialogComponent', () => {
  let component: EditFacultyDialogComponent;
  let fixture: ComponentFixture<EditFacultyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFacultyDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFacultyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
