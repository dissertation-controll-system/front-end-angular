import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { map, merge, startWith, switchMap } from "rxjs";
import { FacultyService } from "../../../shared/services/faculty.service";
import { FacultyResponseDTO } from "../../../shared/interfaces/faculty-dto.interface";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { CreateFacultyDialogComponent } from "../create-faculty-dialog/create-faculty-dialog.component";
import { EditFacultyDialogComponent } from "../edit-faculty-dialog/edit-faculty-dialog.component";
import { DeleteFacultyDialogComponent } from "../delete-faculty-dialog/delete-faculty-dialog.component";

@Component({
  selector: 'app-faculty-table',
  templateUrl: './faculty-table.component.html',
  styleUrls: ['./faculty-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class FacultyTableComponent implements AfterViewInit {

  isFacultyDataLoading: boolean;
  isCathedraDataLoading: boolean;

  lengths: number;

  data: FacultyResponseDTO[];
  cathedrasData: any;

  displayColumns: string[] = ['id', 'faculty', 'edit', 'delete'];

  expandedElement: FacultyResponseDTO | null

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private facultyService: FacultyService,
    private toastrService: ToastrService,
    private dialog: MatDialog
  ) { }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page, this.dialog.afterAllClosed)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.facultyService.getAllFaculties({
            page: this.paginator.pageIndex,
            size: this.paginator.pageSize,
          });
        }),
        map(data => {
          this.isFacultyDataLoading = true;
          this.lengths = data.totalElements;
          return data.content;
        }))
      .subscribe(data => {
        this.isFacultyDataLoading = false;
        this.data = data
      });
  }

  onFacultyRow(facultyId: number): void {
    this.facultyService.getAllCathedrasByFacultyId(facultyId)
      .pipe(
        map(cathedrasData => {
          this.isCathedraDataLoading = true;
          return cathedrasData.content;
        } ),
      )
      .subscribe(cathedraData => {
        this.isCathedraDataLoading = false;
        this.cathedrasData = cathedraData;
      });
  }

  openCreateFacultyDialog(): void {
    let dialogRef = this.dialog.open(CreateFacultyDialogComponent, {
      width: '50%'
    })
  }

  openEditFacultyDialog(facultyId: number, facultyName: string): void {
    let dialogRef = this.dialog.open(EditFacultyDialogComponent, {
      data: {
        id: facultyId,
        name: facultyName
      },
      width: '50%'
    });
  }

  openDeleteFacultyConfrimDialog(facultyId: number): void {
    let dialogRef = this.dialog.open(DeleteFacultyDialogComponent, {
      data: {
        id: facultyId
      },
      width: '50%'
    })
  }

}
