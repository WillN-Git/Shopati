import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsersService } from '@shopati/users';
import { User } from '@types';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-users',
  templateUrl: './users.component.html',
  styles: [],
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];

  endSubs$: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this._getUsers();
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }

  private _getUsers() {
    this.usersService
        .getUsers()
        .pipe(takeUntil(this.endSubs$))
        .subscribe( users => {
      this.users = users;
    })
  }

  deleteUser(id: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete his User?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(id).subscribe(
          () => {
            this._getUsers();
            
            this.messageService.add({
              severity: 'success',
              summary: 'success',
              detail: 'User is deleted!',
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'User is not deleted!',
            });
          }
        );
      }
    });
  }

  updateUser(id: string) {
    this.router.navigateByUrl(`/users/form/${id}`);
  }
}
