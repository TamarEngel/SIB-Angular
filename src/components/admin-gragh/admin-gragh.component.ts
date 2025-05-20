import { Component, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { UserService } from '../../services/user/user.service';
import { ChallengeService } from '../../services/challenge/challenge.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-gragh',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './admin-gragh.component.html',
  styleUrl: './admin-gragh.component.css'
})
export class AdminGraghComponent implements OnInit {
  barChartOptions: any;
  pieChartOptions: any;
  isLoading: boolean = true;

  // צבעים מודרניים וצבעוניים לגרפים
  chartColors = ['#00CED1', '#1E90FF', '#FFA500', '#FF4560', '#775DD0', '#38C172'];

  constructor(
    private userService: UserService,
    private challengeService: ChallengeService
  ) {}

  ngOnInit() {
    this.loadBarChart();
    this.loadPieChart();
  }

  loadBarChart() {
    this.challengeService.getChallenges().subscribe((challenges) => {
      const categories = challenges.map((c: any) => c.title);
      const data = challenges.map((c: any) => c.countCreations);

      this.barChartOptions = {
        series: [{ name: 'תמונות', data }],
        chart: { 
          type: 'bar', 
          height: 450,
          width: '200%', // שימוש ב-100% מהרוחב הזמין
          fontFamily: 'Heebo, Arial, sans-serif',
          toolbar: {
            show: false
          },
          dropShadow: {
            enabled: true,
            opacity: 0.1,
            blur: 3
          }
        },
        colors: this.chartColors,
        title: { 
          text: 'כמות תמונות לכל אתגר', 
          align: 'center',
          style: {
            fontSize: '18px',
            fontWeight: 500
          }
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            columnWidth: '45%', // עמודות מעט יותר דקות לאפשר יותר מרווח
            distributed: true
          }
        },
        xaxis: { 
          categories,
          labels: {
            rotate: 0,
            style: {
              fontSize: '10px',
              fontWeight: 500,
            }
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        yaxis: { 
          title: { 
            text: 'כמות',
            style: {
              fontSize: '14px'
            }
          },
          labels: {
            formatter: (val: number) => {
              return val.toFixed(0);
            }
          }
        },
        dataLabels: { 
          enabled: true,
          formatter: (val: number) => {
            return val.toFixed(0);
          },
          style: {
            fontSize: '14px',
            fontWeight: 600,
            colors: ['#fff']
          },
          offsetY: -20
        },
        grid: {
          borderColor: '#f1f1f1',
          strokeDashArray: 4,
          xaxis: {
            lines: {
              show: false
            }
          },
          yaxis: {
            lines: {
              show: true,
              opacity: 0.3
            }
          },
          padding: {
            top: 0,
            right: 15,
            bottom: 0,
            left: 15
          }
        },
        tooltip: {
          theme: 'light',
          y: {
            formatter: (val: number) => {
              return val + ' תמונות';
            }
          }
        }
      };
      this.isLoading = false;
    });
  }

  loadPieChart() {
    this.userService.getUsers().subscribe((users) => {
      const labels = users.map((u: any) => u.name);
      const series = users.map((u: any) => u.userCreationList.length);

      this.pieChartOptions = {
        series,
        labels,
        colors: this.chartColors,
        chart: {
          type: 'donut',
          height: 450,
          width: '150%', // שימוש ב-100% מהרוחב הזמין
          fontFamily: 'Heebo, Arial, sans-serif',
          dropShadow: {
            enabled: true,
            opacity: 0.1,
            blur: 3
          }
        },
        title: {
          text: 'פילוח לפי כמות יצירות של משתמשים',
          align: 'center',
          style: {
            fontSize: '18px',
            fontWeight: 500
          }
        },
        stroke: {
          width: 0
        },
        plotOptions: {
          pie: {
            donut: {
              size: '50%',
              labels: {
                show: true,
                name: {
                  show: true,
                  fontSize: '16px'
                },
                value: {
                  show: true,
                  fontSize: '18px',
                  formatter: (val: number) => {
                    return val.toString();
                  }
                },
                total: {
                  show: true,
                  label: 'סך הכל',
                  fontSize: '16px',
                  formatter: (w: any) => {
                    return w.globals.seriesTotals.reduce((a: number, b: number) => {
                      return a + b;
                    }, 0).toString();
                  }
                }
              }
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          position: 'bottom',
          horizontalAlign: 'center',
          fontSize: '14px',
          itemMargin: {
            horizontal: 8,
            vertical: 5
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: { height: 360 },
              legend: { position: 'bottom' }
            }
          }
        ]
      };
    });
  }
}