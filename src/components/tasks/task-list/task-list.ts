import { ChangeDetectionStrategy, Component, Input } from 'angular2/core';
import { RouterLink, RouteParams } from 'angular2/router';
import { Observable } from 'rxjs/Observable';
import { Task } from 'modules/task';
import { TaskItem } from '../task-item/task-item';
import { TaskListFilterPipe } from './task-list-filter-pipe';

const styles: string = require('./task-list.scss');


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [
    RouterLink,
    TaskItem
  ],
  pipes: [
    TaskListFilterPipe
  ],
  selector: 'task-list',
  styles: [styles],

  template: `
    <ul class="task-filters">
      <li><a [class.active]="!filter" [routerLink]="['/Tasks']">View All</a></li>
      <li><a [class.active]="filter == 'active'" [routerLink]="['/Tasks', {filter: 'active'}]">Active</a></li>
      <li><a [class.active]="filter == 'completed'" [routerLink]="['/Tasks', {filter: 'completed'}]">Completed</a></li>
    </ul>

    <div class="task-list">
      <task-item [model]="task" *ngFor="#task of tasks | async | filterTasks:filter"></task-item>
    </div>
  `
})

export class TaskList {
  @Input() tasks: Observable<Task[]>;
  filter: string;

  constructor(params: RouteParams) {
    this.filter = params.get('filter');
  }
}
