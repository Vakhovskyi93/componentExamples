import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { ExchangeCountriesCodes, MomentDateTimeFormats, UserSettings, round } from '@const';
import { convertToEasternTime } from '@u/utils';
import { EarningsService } from '@s/earnings.service';
import { ExpectedMoveService } from '@s/expected-move.service';
import { ExpectedMove, IExpectedMoveSymbol } from '@mod/data/expected-move.model';
import { StreamingService } from '@s/streaming.service';
import { ObservableService } from '@s/observable.service';
import { UserDataService } from '@s/user-data.service';

interface IStockSubscription {
  subscriptionId: string;
  symbol: {
    symbol: string;
    country_code: ExchangeCountriesCodes;
  };
}

const HiddenClassName = 'hidden';

@Component({
  selector: 'app-expected-move',
  templateUrl: './expected-move.component.html',
  styleUrls: ['./expected-move.component.scss']
})
export class ExpectedMoveComponent implements OnInit, AfterViewInit, OnDestroy {
  private expectedMoveContainerDefaultHeight = 34;

  @Input() modelView: 'short' | 'single' | 'default' = 'default';
  @Input() symbol: BehaviorSubject<IExpectedMoveSymbol>;
  @Input() checkNextEarning: boolean = false;
  @Input() showWheelChartSettings: boolean = false;
  @Input() liveDataIntervalSeconds: number | null = null;
  @ViewChild('expected') expected: ElementRef;

  private subscriptions = new Subscription();
  private resizeObserver: any;
  private currentSymbol: IExpectedMoveSymbol = null;
  private subscribedStock: IStockSubscription = null;
  private nextRunTimestamp: number = null;

  public wrapperClass: string = HiddenClassName;
  public expectedMoves: ExpectedMove[];
  public showExpectedMoveOne: boolean;
  public showExpectedMoveTwo: boolean;

  constructor(
    private earningsService: EarningsService,
    private expectedMoveService: ExpectedMoveService,
    private streamingService: StreamingService,
    private observableService: ObservableService,
    private userDataService: UserDataService,
  ) { }

  ngOnInit(): void {
    if (!this.symbol) {
      return;
    }

    this.nextRunTimestamp = moment().unix();
    this.showExpectedMoveOne = this.observableService.showExpectedMoveOneOnWheel.getValue() > 0;
    this.showExpectedMoveTwo = this.observableService.showExpectedMoveTwoOnWheel.getValue() > 0;

    this.subscriptions.add(
      this.symbol.subscribe(async (symbol: IExpectedMoveSymbol) => await this.initialize(symbol))
    );

    this.subscriptions.add(
      this.observableService.showExpectedMoveOneOnWheel.subscribe((value) => this.showExpectedMoveOne = value > 0)
    );

    this.subscriptions.add(
      this.observableService.showExpectedMoveTwoOnWheel.subscribe((value) => this.showExpectedMoveTwo = value > 0)
    );

    this.initialize(this.symbol.getValue());
  }

  ngAfterViewInit() {
    this.resizeObserver = new (window as any).ResizeObserver(entries => {
      if (entries[0].contentRect.height > this.expectedMoveContainerDefaultHeight) {
        this.expected.nativeElement.classList.add('wrap');
      } else {
        this.expected.nativeElement.classList.remove('wrap');
      }
    });
    this.resizeObserver.observe(this.expected.nativeElement);
  }

  ngOnDestroy() {
    if (this.subscribedStock) {
      this.streamingService.unsubscribe(
        this.subscribedStock.subscriptionId,
        this.subscribedStock.symbol,
      );
    }

    this.subscriptions.unsubscribe();
    this.resizeObserver?.disconnect();
  }

  public getWrapperClass() {
    if (!this.expectedMoves.length) {
      return "hidden";
    }

    return this.modelView;
  }

  public async onExpectedMoveClick(index: number) {
    if (!this.showWheelChartSettings) {
      return;
    }

    const value = index === 0
      ? this.showExpectedMoveOne ? 0 : 1
      : this.showExpectedMoveTwo ? 0 : 1;

    const setting = index === 0
      ? UserSettings.ShowExpectedMoveOneOnWheel
      : UserSettings.ShowExpectedMoveTwoOnWheel;

    await this.userDataService.set(setting, value);
  }

  async initialize(symbol: IExpectedMoveSymbol) {
    if (this.currentSymbol
      && this.currentSymbol.security_id === symbol.security_id) {
      return;
    }

    this.currentSymbol = symbol;
    this.expectedMoves = [];
    this.nextRunTimestamp = moment().unix();
    this.observableService.expectedMoveHasData.next(false);

    if (this.subscribedStock) {
      this.streamingService.unsubscribe(
        this.subscribedStock.subscriptionId,
        this.subscribedStock.symbol,
      );
    }

    if (symbol) {
      this.expectedMoves = await this.expectedMoveService.get(symbol.security_id);

      if (this.checkNextEarning) {
        const nextEarning = await this.earningsService.getNext(symbol.security_id, false);

        if (nextEarning) {
          const minDate = convertToEasternTime(nextEarning.report_date).format(MomentDateTimeFormats.ServerDate);
          const specificExpectedMove = this.expectedMoves.find((d) => d.expirationDate >= minDate);
          this.expectedMoves = specificExpectedMove
            ? [specificExpectedMove]
            : [];
        }
      }

      this.observableService.expectedMoveHasData.next(this.expectedMoves.length > 0);

      this.subscribedStock = {
        subscriptionId: uuidv4(),
        symbol: {
          symbol: symbol.symbol,
          country_code: ExchangeCountriesCodes.US,
        }
      };

      this.streamingService.subscribe(
        this.subscribedStock.subscriptionId,
        this.subscribedStock.symbol,
        {},
        this.handleLiveDataCallback.bind(this),
      );
    }

    this.wrapperClass = this.expectedMoves.length
      ? this.modelView
      : HiddenClassName;
  }

  private handleLiveDataCallback(data): void {
    if (data && !data.pre
      && this.expectedMoves?.length
      && this.expectedMoves[0].symbol === data.symbol) {

      if (moment().unix() < this.nextRunTimestamp) {
        return;
      }

      this.nextRunTimestamp = moment().add(this.liveDataIntervalSeconds || 0, 'seconds').unix();
      this.observableService.expectedMoveLiveData.next(data);

      this.expectedMoves.forEach((move) => {
        move.priceUp = round(data.close + move.expectedMove, 2);
        move.priceDown = round(data.close - move.expectedMove, 2);
      });
    }
  }
}
