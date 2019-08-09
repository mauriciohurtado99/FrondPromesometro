import { Component, OnInit } from '@angular/core';
import { CandidatoService } from 'src/app/service/candidato.service';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Label } from 'ng2-charts';
import { ChartOptions } from 'chart.js';


@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {
  public data: Number[] = [];
  hola = [];
  public pieChartLabels: Label[] = ['Contra','Favor'];
  public pieChartLegend = true;
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];
  constructor(public rest: CandidatoService, public activated: ActivatedRoute) {
    this.rest.GetResults(this.activated.snapshot.params.id).subscribe(res =>{ 
      this.data[0] = res.contra;
      this.data[1] = res.favor;
      this.hola = res;
    })
   }

  ngOnInit() {

  }

}
