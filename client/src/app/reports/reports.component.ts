import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Emoji} from '../emoji';
import {ReportsService} from './reports.service';
import {MatDialog} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {Inject} from '@angular/core';

import * as Chart from 'chart.js';

@Component({
    selector: 'app-reports-component',
    templateUrl: 'reports.component.html',
    styleUrls: ['./reports.component.css'],
})





export class ReportsComponent implements AfterViewInit, OnInit {
    // These are public so that tests can reference them (.spec.ts)
    public emojis: Emoji[];
    public filteredEmojis: Emoji[];
    public userEmail: string = localStorage.getItem('email');

    public prefilteredEmojis: Emoji[];
    public chartEmojis: Emoji[];

    public startDate: any;
    public endDate: any;
    getDate: any;
    canvas: any;
    ctx: any;


    // Inject the EmojiListService into this component.
    constructor(public reportsService: ReportsService) {

    }



//Filters are not include in the shopping, but Song thinks we may need that in the future.
    public filterEmojis(start, end): Emoji[] {

        this.filteredEmojis = this.emojis;


        // Filter by startDate
        if (start != null) {

            this.filteredEmojis = this.filteredEmojis.filter(emoji => {
                this.getDate = new Date(emoji.date);
                return this.getDate >= start;
            });
        }

        // Filter by endDate
        if (end != null) {

            this.filteredEmojis = this.filteredEmojis.filter(emoji => {
                this.getDate = new Date(emoji.date);
                return this.getDate <= end;
            });
        }

        this.prefilteredEmojis = this.filteredEmojis;
        return this.filteredEmojis;
    }

    //get current date
    getdate(): string{
        return Date();
    }

    filterChart(weekday, mood, intensity): number {
        this.chartEmojis = this.prefilteredEmojis;
        if(this.chartEmojis == null){
            this.chartEmojis = [];
        }

        // Filter by mood
        this.chartEmojis = this.chartEmojis.filter(emoji => {
            return !mood.toString() || emoji.mood.toString().indexOf(mood.toString()) !== -1;
        });

        //Filter by intensity
        this.chartEmojis = this.chartEmojis.filter(emoji => {
            return !intensity.toString() || emoji.intensity.toString().indexOf(intensity.toString()) !== -1;
        });


        // Filter by day of the week
        this.chartEmojis = this.chartEmojis.filter(emoji => {
            return !weekday || emoji.date.indexOf(weekday) !== -1;
        });

        // return number of emojis left after filter
        return this.chartEmojis.length;
    }


    /**
     * Starts an asynchronous operation to update the emojis list
     *
     */

    buildChart(): void {

        this.canvas = document.getElementById("myChart");
        this.ctx = this.canvas;

        let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

        let frustrated_daily_totals = {"label":"Frustrated",
            "data":[
                this.filterChart('Sun', '1','1'),
                this.filterChart('Mon', '1','1'),
                this.filterChart('Tue', '1','1'),
                this.filterChart('Wed', '1','1'),
                this.filterChart('Thu', '1','1'),
                this.filterChart('Fri', '1','1'),
                this.filterChart('Sat', '1','1')
            ],
            hidden: true,
            "fill":false,
            "borderColor":"rgb(0, 0, 100)",
            "lineTension":0.1};

        let angry_daily_totals = {"label":"Angry",
            "data":[
                this.filterChart('Sun', '1','2'),
                this.filterChart('Mon', '1','2'),
                this.filterChart('Tue', '1','2'),
                this.filterChart('Wed', '1','2'),
                this.filterChart('Thu', '1','2'),
                this.filterChart('Fri', '1','2'),
                this.filterChart('Sat', '1','2')
            ],
            hidden: true,
            "fill":false,
            "borderColor":"rgb(0, 0, 200)",
            "lineTension":0.1};

        let anxious_daily_totals = {"label":"Anxious",
            "data":[
                this.filterChart('Sun', '2','1'),
                this.filterChart('Mon', '2','1'),
                this.filterChart('Tue', '2','1'),
                this.filterChart('Wed', '2','1'),
                this.filterChart('Thu', '2','1'),
                this.filterChart('Fri', '2','1'),
                this.filterChart('Sat', '2','1')
            ],
            "fill":false,
            "borderColor":"rgb(0, 100, 100)",
            "lineTension":0.1};

        let worried_daily_totals = {"label":"Worried",
            "data":[
                this.filterChart('Sun', '2','2'),
                this.filterChart('Mon', '2','2'),
                this.filterChart('Tue', '2','2'),
                this.filterChart('Wed', '2','2'),
                this.filterChart('Thu', '2','2'),
                this.filterChart('Fri', '2','2'),
                this.filterChart('Sat', '2','2')
            ],
            hidden: true,
            "fill":false,
            "borderColor":"rgb(0, 100, 200)",
            "lineTension":0.1};

        let happy_daily_totals = {"label":"Happy",
            "data":[
                this.filterChart('Sun', '3','1'),
                this.filterChart('Mon', '3','1'),
                this.filterChart('Tue', '3','1'),
                this.filterChart('Wed', '3','1'),
                this.filterChart('Thu', '3','1'),
                this.filterChart('Fri', '3','1'),
                this.filterChart('Sat', '3','1')
            ],
            hidden: true,
            "fill":false,
            "borderColor":"rgb(0, 100, 0)",
            "lineTension":0.1};

        let content_daily_totals = {"label":"Content",
            "data":[
                this.filterChart('Sun', '3','2'),
                this.filterChart('Mon', '3','2'),
                this.filterChart('Tue', '3','2'),
                this.filterChart('Wed', '3','2'),
                this.filterChart('Thu', '3','2'),
                this.filterChart('Fri', '3','2'),
                this.filterChart('Sat', '3','2')
            ],
            hidden: true,
            "fill":false,
            "borderColor":"rgb(0, 200, 0)",
            "lineTension":0.1};

        let ecstatic_daily_totals = {"label":"Ecstatic",
            "data":[
                this.filterChart('Sun', '3','3'),
                this.filterChart('Mon', '3','3'),
                this.filterChart('Tue', '3','3'),
                this.filterChart('Wed', '3','3'),
                this.filterChart('Thu', '3','3'),
                this.filterChart('Fri', '3','3'),
                this.filterChart('Sat', '3','3')
            ],
            hidden: true,
            "fill":false,
            "borderColor":"rgb(0, 200, 100)",
            "lineTension":0.1};

        let meh_daily_totals = {"label":"Meh",
            "data":[
                this.filterChart('Sun', '4','1'),
                this.filterChart('Mon', '4','1'),
                this.filterChart('Tue', '4','1'),
                this.filterChart('Wed', '4','1'),
                this.filterChart('Thu', '4','1'),
                this.filterChart('Fri', '4','1'),
                this.filterChart('Sat', '4','1')
            ],
            hidden: true,
            "fill":false,
            "borderColor":"rgb(0, 200, 200)",
            "lineTension":0.1};

        let bleh_daily_totals = {"label":"Bleh",
            "data":[
                this.filterChart('Sun', '4','2'),
                this.filterChart('Mon', '4','2'),
                this.filterChart('Tue', '4','2'),
                this.filterChart('Wed', '4','2'),
                this.filterChart('Thu', '4','2'),
                this.filterChart('Fri', '4','2'),
                this.filterChart('Sat', '4','2')
            ],
            hidden: true,
            "fill":false,
            "borderColor":"rgb(100, 0, 0)",
            "lineTension":0.1};

        let unhappy_daily_totals = {"label":"Unhappy",
            "data":[
                this.filterChart('Sun', '5','1'),
                this.filterChart('Mon', '5','1'),
                this.filterChart('Tue', '5','1'),
                this.filterChart('Wed', '5','1'),
                this.filterChart('Thu', '5','1'),
                this.filterChart('Fri', '5','1'),
                this.filterChart('Sat', '5','1')
            ],
            hidden: true,
            "fill":false,
            "borderColor":"rgb(200, 100, 0)",
            "lineTension":0.1};

        let sad_daily_totals = {"label":"Sad",
            "data":[
                this.filterChart('Sun', '5','2'),
                this.filterChart('Mon', '5','2'),
                this.filterChart('Tue', '5','2'),
                this.filterChart('Wed', '5','2'),
                this.filterChart('Thu', '5','2'),
                this.filterChart('Fri', '5','2'),
                this.filterChart('Sat', '5','2')
            ],
            hidden: true,
            "fill":false,
            "borderColor":"rgb(200, 200, 0)",
            "lineTension":0.1};

        let miserable_daily_totals = {"label":"Miserable",
            "data":[
                this.filterChart('Sun', '5','3'),
                this.filterChart('Mon', '5','3'),
                this.filterChart('Tue', '5','3'),
                this.filterChart('Wed', '5','3'),
                this.filterChart('Thu', '5','3'),
                this.filterChart('Fri', '5','3'),
                this.filterChart('Sat', '5','3')
            ],
            hidden: true,
            "fill":false,
            "borderColor":"rgb(200, 200, 200)",
            "lineTension":0.1};



        let myChart = new Chart(this.ctx, {
            type: 'line',
            data: {
                labels: days,
                datasets: [

                    frustrated_daily_totals,
                    angry_daily_totals,
                    anxious_daily_totals,
                    worried_daily_totals,
                    happy_daily_totals,
                    content_daily_totals,
                    ecstatic_daily_totals,
                    meh_daily_totals,
                    bleh_daily_totals,
                    unhappy_daily_totals,
                    sad_daily_totals,
                    miserable_daily_totals,
                    ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    }


    ngAfterViewInit(): void {
        this.buildChart();
    }

    refreshEmojis(): Observable<Emoji[]> {
        // Get Emojis returns an Observable, basically a "promise" that
        // we will get the data from the server.
        //
        // Subscribe waits until the data is fully downloaded, then
        // performs an action on it (the first lambda)
        const emojiListObservable: Observable<Emoji[]> = this.reportsService.getEmojis();
        emojiListObservable.subscribe(
            emojis => {
                this.emojis = emojis;
                this.filterEmojis(this.startDate, this.endDate);
            },
            err => {
                console.log(err);
            });
        return emojiListObservable;
    }


    ngOnInit(): void {
        this.refreshEmojis();
    }
    isUserLoggedIN(): boolean {
        var email = localStorage.getItem('email');
        return ((email != '') && (typeof email != 'undefined'));
    }
}
