import { Directive, Input, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import tippy, { Instance } from 'tippy.js';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective implements AfterViewInit {
  private instance!: Instance;
  private _content!: string;

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
    this.zone.runOutsideAngular(() => {
      this.instance = tippy(this.host.nativeElement, {
        content: this.content,
        placement: 'auto-end'
      });
    });
  }

}
