import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFacultyDialogComponent } from './delete-faculty-dialog.component';

describe('DeleteFacultyDialogComponent', () => {
  let component: DeleteFacultyDialogComponent;
  let fixture: ComponentFixture<DeleteFacultyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteFacultyDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteFacultyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
