export class SimpleChange {
  public constructor(
    public previousValue: any,
    public currentValue: any,
    public firstChange: boolean
  ) {}

  public isFirstChange(): boolean {
    return this.firstChange;
  }
}

export interface SimpleChanges {
  [key: string]: SimpleChange;
}

export interface OnChanges {
  ngOnChanges(changes: SimpleChanges): void;
}

export interface OnInit {
  ngOnInit(): void;
}
export interface OnDestroy {
  ngOnDestroy(): void;
}
export interface AfterViewInit {
  ngAfterViewInit(): void;
}
export interface AfterViewChecked {
  ngAfterViewChecked(): void;
}
export interface AfterContentInit {
  ngAfterContentInit(): void;
}
export interface AfterContentChecked {
  ngAfterContentChecked(): void;
}

