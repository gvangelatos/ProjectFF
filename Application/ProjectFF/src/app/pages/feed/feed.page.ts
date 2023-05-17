import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { FeedService } from 'src/app/services/feed/feed.service';
import { RouterModule } from '@angular/router';
import { Article } from 'src/app/models/article/article.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, FormsModule],
})
export class FeedPage implements OnInit, OnDestroy {
  articles: Article[] = [];
  favoriteArticles: Article[] = [];
  displayAll: boolean = true;
  private _subscriptions: Subscription[] = [];

  constructor(
    private feedService: FeedService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this._subscriptions.push(
      this.feedService.articles.subscribe((articles) => {
        this.articles = articles;
        // console.log('all');
        // console.log(this.articles);
      })
    );
    this._subscriptions.push(
      this.feedService.favoriteArticles.subscribe((articles) => {
        this.favoriteArticles = articles;
        // console.log('favorites');
        // console.log(this.favoriteArticles);
      })
    );
  }

  onFilterUpdate(event: any) {
    // console.log(event.detail.value);
    if (event.detail.value === 'all') {
      this.displayAll = true;
    } else {
      this.displayAll = false;
    }
  }

  handleRefresh(event: any) {
    // Array.from(
    //   document.getElementsByClassName(
    //     'refresher-active'
    //   ) as HTMLCollectionOf<HTMLElement>
    // ).forEach((element) => {
    //   element.style.zIndex = '1';
    // });

    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);

    // Array.from(
    //   document.getElementsByClassName(
    //     'refresher-active'
    //   ) as HTMLCollectionOf<HTMLElement>
    // ).forEach((element) => {
    //   element.style.zIndex = '0';
    // });
  }

  ngOnDestroy() {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
