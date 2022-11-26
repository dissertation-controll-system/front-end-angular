import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFacultyDialogComponent } from './create-faculty-dialog.component';

describe('CreateFacultyDialogComponent', () => {
  let component: CreateFacultyDialogComponent;
  let fixture: ComponentFixture<CreateFacultyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFacultyDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFacultyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
