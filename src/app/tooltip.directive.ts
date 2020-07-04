import { Directive, Input, ElementRef, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import tippy, { Instance } from 'tippy.js';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { inView } from './intersectionObserver';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective implements AfterViewInit, OnDestroy {
  private instance!: Instance | null;
  private _content!: string;

  private destroy = new Subject();
  private destroy$ = this.destroy.asObservable();

  get content(): string {
    return this._content;
  }

  @Input('tooltip') set content(content: string) {
    this._content = content;
    if (this.instance) {
      this.instance.setContent(content);
    }
  }

  constructor(
    private host: ElementRef<Element>,
    private zone: NgZone
  ) { }

  ngAfterViewInit(): void {
    inView(this.host.nativeElement)
      .pipe(takeUntil(this.destroy$))
      .subscribe((isInView) => {
        if (isInView && !this.instance) {
          this.zone.runOutsideAngular(() => {
            this.instance = tippy(this.host.nativeElement, {
              content: this.content,
              placement: 'auto-end'
            });
          });
        } else if (this.instance) {
          this.instance.destroy();
          this.instance = null;
        }
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

}
