import { Component, OnInit, ViewChild } from '@angular/core';
import { FacultyResponseDTO } from "../../../shared/interfaces/faculty-dto.interface";
import { CathedraResponseDTO } from "../../../shared/interfaces/cathedra-dto.interface";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { map, merge, startWith, switchMap } from "rxjs";
import { FacultyService } from "../../../shared/services/faculty.service";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { CathedraService } from "../../../shared/services/cathedra.service";

@Component({
  selector: 'app-cathedra-table',
  templateUrl: './cathedra-table.component.html',
  styleUrls: ['./cathedra-table.component.scss']
})
export class CathedraTableComponent {

  isCathedraDataLoading: boolean;

  lengths: number;

  data: CathedraResponseDTO[];

  displayColumns: string[] = ['id', 'cathedra', 'faculty', 'edit', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private cathedraService: CathedraService,
    private toastrService: ToastrService,
    private dialog: MatDialog
  ) { }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page, this.dialog.afterAllClosed)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.cathedraService.getAllCathedras({
            page: this.paginator.pageIndex,
            size: this.paginator.pageSize,
          });
        }),
        map(data => {
          this.isCathedraDataLoading = true;
          this.lengths = data.totalElements;
          return data.content;
        }))
      .subscribe(data => {
        this.isCathedraDataLoading = false;
        this.data = data
      });
  }

  openCreateCathedraDialog(): void {

  }

  openEditCathedraDialog(cathedraId: number, cathedraName: string): void {

  }

  openDeleteCathedraDialog(cathedraId: number, cathedraName: string): void {

  }

}
