import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { ForecastService } from './forecast.service';
import { Color, Label } from 'ng2-charts';
import * as moment from 'moment';


@Component({
  selector: 'app-home',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Forecast' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: any = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins: any = [];

  constructor(private forecastService: ForecastService) {}

  ngOnInit() {
    this.isLoading = false;
    // this.quoteService
    //   .getRandomQuote({ category: 'dev' })
    //   .pipe(
    //     finalize(() => {
    //       this.isLoading = false;
    //     })
    //   )
    //   .subscribe((quote: string) => {
    //     this.quote = quote;
    //   });
      this.subscribechartData();
  }

  pushChartData( data: any ) {
      if( !this.lineChartLabels.includes(data.lable) ){
        this.lineChartData[0].data.push(data.value);
        this.lineChartLabels.push(data.lable);
      }
  }

  manupulateChartsData( data:any ) {
    if( data.current ) {
      this.pushChartData({ value: data.current.temp_f, lable: 'Current' });
    }

    if( data.forecast && data.forecast.length > 0 ) {
      data.forecast.forEach( (elm: any) => {
        let time: any = moment(elm.time).format("hh:mm");
        this.pushChartData({ value: elm.temp_f, lable: time });
      } );
    }
  }

  subscribechartData(){
    debugger
    let myMoment: moment.Moment = moment();

    this.forecastService.getForecastdata().subscribe( (data) => {
      this.manupulateChartsData(data);
    } );
  }
}
