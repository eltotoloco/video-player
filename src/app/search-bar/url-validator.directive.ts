import { Directive } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appUrlValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: UrlValidatorDirective,
    multi: true
  }]
})
export class UrlValidatorDirective implements Validator {

 // private pattern =new RegExp("^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$")
  private patternYoutube =new RegExp("^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$")

  validate(control: AbstractControl) : {[key: string]: any} | null {
    if (control.value && !this.patternYoutube.test(control.value) ) {
      return { 'urlInvalid': true };
    }
    return null;
  }

}
