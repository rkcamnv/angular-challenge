import {Inject, Injectable} from '@angular/core';
import {TuiAlertService, TuiNotification} from '@taiga-ui/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService
  ) {}

  success(label: string) {
    return this.alertService.open('', {
      label: label,
      status: TuiNotification.Success,
    });
  }

  error(label: string){
    return this.alertService.open('', {
      label: label,
      status: TuiNotification.Error,
    });
  }
}
