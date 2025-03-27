import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/core/services/general/token.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
 
  institution : any;
  year: number = new Date().getFullYear();

  constructor(private tokenService: TokenService) {
    this.getInstitution();
   }

  getInstitution(){
    this.institution = this.tokenService.getInstitution() ?? '';
  }

  ngOnInit(): void {
  }

}
