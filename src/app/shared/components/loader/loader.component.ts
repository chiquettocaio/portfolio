import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-loader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {}
