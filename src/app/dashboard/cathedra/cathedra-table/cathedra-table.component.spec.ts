import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CathedraTableComponent } from './cathedra-table.component';

describe('CathedraTableComponent', () => {
  let component: CathedraTableComponent;
  let fixture: ComponentFixture<CathedraTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CathedraTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CathedraTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
