import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//Importar HttpClient
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [HttpClient]
})
export class AppComponent {
  title = 'ParadiseEssence';
}
