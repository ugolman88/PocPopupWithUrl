import { DialogComponent } from './../dialog/dialog.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  routeQueryParams$: Subscription;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeQueryParams$ = this.route.queryParams.subscribe((params) => {
      if (params['page']!== undefined) {
        this.openDialog(params['page']);
      }
    });
  }

  ngOnDestroy() {
    this.routeQueryParams$.unsubscribe();
  }

  openDialog(pageParam:string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { page: pageParam },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.router.navigate(['.'], { relativeTo: this.route });
    });
  }
}
