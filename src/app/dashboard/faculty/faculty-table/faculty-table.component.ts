import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { filter, map, merge, startWith, switchMap } from "rxjs";
import { FacultyService } from "../../../shared/services/faculty.service";
import { FacultyResponseDTO } from "../../../shared/interfaces/faculty-dto.interface";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { CreateFacultyDialogComponent } from "../create-faculty-dialog/create-faculty-dialog.component";
import { EditFacultyDialogComponent } from "../edit-faculty-dialog/edit-faculty-dialog.component";
import { DeleteFacultyDialogComponent } from "../delete-faculty-dialog/delete-faculty-dialog.component";
import { CathedraResponseDTO } from "../../../shared/interfaces/cathedra-dto.interface";
import { CreateCathedraDialogComponent } from "../create-cathedra-dialog/create-cathedra-dialog.component";
import { ISortDirection } from "../../../shared/interfaces/page-dto.interface";

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
  cathedrasData: CathedraResponseDTO[];

  displayColumns: string[] = ['id', 'name', 'edit', 'delete'];

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
            sort: [`${this.sort.active},${this.sort.direction.toLocaleUpperCase()}`]
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
    });

    dialogRef.afterClosed().subscribe((response: FacultyResponseDTO) => {
      if (response) {
        this.toastrService.success(`Факультет ${response.name} успішно створено`);
      }
    });
  }

  openEditFacultyDialog(facultyId: number, facultyName: string): void {
    let dialogRef = this.dialog.open(EditFacultyDialogComponent, {
      data: {
        id: facultyId,
        name: facultyName
      },
      width: '50%'
    });

    dialogRef.afterClosed().subscribe((response: FacultyResponseDTO) => {
      if (response) {
        this.toastrService.success(`Факультет ${facultyName} успішно змінено на ${response.name}`);
      }
    });
  }

  openDeleteFacultyConfrimDialog(facultyId: number, facultyName: string): void {
    let dialogRef = this.dialog.open(DeleteFacultyDialogComponent, {
      data: {
        id: facultyId,
        name: facultyName
      },
      width: '50%'
    });

    dialogRef.afterClosed().subscribe((facultyName: string) => {
      this.toastrService.success(`Факультет ${facultyName} успішно видалено`);
    });
  }

  openCreateCathedraByFacultyDialog(facultyId: number, facultyName: string): void {
    let dialogRef = this.dialog.open(CreateCathedraDialogComponent, {
      data: {
        id: facultyId,
        name: facultyName
      },
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(({ cathedraName, facultyName }) => {
      this.toastrService.success(`Кафедра ${cathedraName} для ${facultyName} успішно створена`);
    });
  }
}
