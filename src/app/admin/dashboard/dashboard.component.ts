import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { PostsService } from 'src/app/services/posts.service';
import * as Highcharts from 'highcharts';
import { CategoryService } from 'src/app/services/category.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  activeUser!: string;
  postCount!: number;
  totalViews!:number
  posts!: any;
  categoriesData: any[] = [];

  constructor(
    private _adminService: AdminService,
    private _postService: PostsService,
    private _activatedRoute: ActivatedRoute,
    private _categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    const admins = this._adminService.getAdmin();
    this._activatedRoute.params.subscribe(params => {
      this.activeUser = params['name'];
    });

    this._postService.getCount().subscribe(val => {
      this.postCount = val;
    });

    this._postService.getPosts().subscribe(val => {
      const aggregatedData = this.aggregateData(val);
      this.fetchCategoryNames(aggregatedData);
    });

    this._postService.gettotalViews().subscribe(val=>{
      this.totalViews=val as number
    });

    this._postService.getViewsbyCategory().subscribe(val=>{
     this.renderGraphChart(val);
     console.log(val);
     
    })
  }

  aggregateData(posts: any[]): any[] {
    const categoryMap = new Map();

    // Aggregate data based on category
    posts.forEach(post => {
      const categoryId = post.categoryId;

      if (categoryMap.has(categoryId)) {
        categoryMap.set(categoryId, categoryMap.get(categoryId) + 1);
      } else {
        categoryMap.set(categoryId, 1);
      }
    });

    // Convert map to array
    const aggregatedData = Array.from(categoryMap, ([categoryId, count]) => ({ categoryId, count }));
    return aggregatedData;
  }

  fetchCategoryNames(data: any[]) {
    const observables = data.map(item => this._categoryService.getCategoryById(item.categoryId));
    forkJoin(observables).subscribe(
      (responses: any[]) => {
        responses.forEach((response, index) => {
          data[index].categoryName = response.categoryName;
        });
        this.renderChart(data);
      },
      error => {
        console.error('Error fetching category names:', error);
        // If fetching category names fails, render chart with categoryId as categoryName
        this.renderChart(data);
      }
    );
  }

  renderChart(data: any[]) {
    const totalPosts = data.reduce((acc, curr) => acc + curr.count, 0);
  
    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Number of Posts by Category',
        style: {
          fontSize: '24px',
          fontWeight: 'semi-bold',
          color: '#333333'
        }
      },
      tooltip: {
        pointFormat: '{point.name}: <b>{point.y} ({point.percentage:.1f}%)</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '{point.name}: {point.percentage:.1f} %',
            style: {
              fontSize: '14px',
              fontWeight: 'normal',
              color: '#333333'
            },
            formatter: function() {
              return this.point?.percentage?.toFixed(1) + '%';
            }
          },
          colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1']
        }
      },
      credits:{
        enabled: false
      },
      series: [{
        type: 'pie',
        name: 'Number of Posts',
        data: data.map(item => ({
          name: item.categoryName,
          y: item.count
        })),
        dataLabels: {
          style: {
            fontSize: '14px',
            fontWeight: 'normal',
            color: '#333333'
          }
        }
      }]
    };
  
    Highcharts.chart('pie-chart', chartOptions);
  }
  
  chartOptions: Highcharts.Options = {};

  renderGraphChart(data: any[]): void {
    const categories = data.map(item => item.categoryName);
    const views = data.map(item => item.totalViews);
  
    this.chartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Category Views'
      },
      xAxis: {
        categories: categories,
        crosshair: true,
        accessibility: {
          description: 'Categories'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Views'
        }
      },
      tooltip: {
        valueSuffix: ' views'
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      credits:{
        enabled: false
      },
      series: [{
        type: 'column',
        name: 'Views',
        data: views
      }]
    };
  
    Highcharts.chart('chart-container', this.chartOptions);
  }

  
}
