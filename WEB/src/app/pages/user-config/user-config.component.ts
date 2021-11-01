import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Usuario} from 'src/app/models';
import {UserService} from 'src/app/services';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.css'],
})
export class UserConfigComponent implements OnInit {
  user!: Usuario;
  userUpdateForm!: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userService.obtenerMiData().subscribe((response:any) => {
      this.user = response.me;

      console.log(this.user);
      this.userUpdateForm = this.fb.group({
        name: new FormControl(this.user.name, [Validators.required]),
        email: new FormControl(this.user.email, [Validators.required]),
        password: new FormControl(''),
      });
    });
  }
}
