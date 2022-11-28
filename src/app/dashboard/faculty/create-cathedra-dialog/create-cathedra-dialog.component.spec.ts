import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCathedraDialogComponent } from './create-cathedra-dialog.component';

describe('CreateCathedraDialogComponent', () => {
  let component: CreateCathedraDialogComponent;
  let fixture: ComponentFixture<CreateCathedraDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCathedraDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCathedraDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
