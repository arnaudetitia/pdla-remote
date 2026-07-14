import { Component, EventEmitter, forwardRef, Input, Output, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Marge } from '../../../model/marge.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'marge-form-control',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MargeFormControlComponent),
    },
  ],
  imports: [CommonModule],
  templateUrl: './marge-form-control.component.html',
  styleUrl: './marge-form-control.component.scss',
})
export class MargeFormControlComponent implements ControlValueAccessor {
  @Input() reponseSent: boolean = false;

  @Output() onMargeChanged = new EventEmitter<Marge | null>();

  margesList: Marge[] = [
    {
      anneesMarge: 3,
      points: 1,
    },
    {
      anneesMarge: 2,
      points: 2,
    },
    {
      anneesMarge: 1,
      points: 4,
    },
    {
      anneesMarge: 0,
      points: 8,
    },
  ];
  value = signal<Marge | null>(null);
  disabled = signal<boolean>(false);
  onChange = (val: Marge | null) => {};
  onTouched = () => {};

  writeValue(marge: Marge | null): void {
    this.value.set(marge);
  }

  selectMarge(marge: Marge): void {
    if (this.reponseSent || this.disabled()) {
      return;
    }

    this.value.set(marge);
    this.onChange(marge);
    this.onTouched();
    this.onMargeChanged.emit(marge);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
