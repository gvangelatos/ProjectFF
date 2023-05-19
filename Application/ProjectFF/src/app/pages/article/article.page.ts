import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AlertController,
  Config,
  IonicModule,
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Article } from 'src/app/models/article/article.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedService } from 'src/app/services/feed/feed.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ArticlePage implements OnInit, OnDestroy {
  article: Article | undefined;
  iconFavorite: 'heart-outline' | 'heart' = 'heart-outline';
  private _subscriptions: Subscription[] = [];
  mode: string = 'ios';

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private feedService: FeedService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private config: Config
  ) {}

  ngOnInit() {
    this.mode = this.config.get('mode');
    this.activatedRoute?.paramMap?.subscribe((paramMap) => {
      if (!paramMap?.has('articleId')) {
        this.navCtrl.navigateBack('/home/tabs/feed');
        return;
      }
      this.loadingCtrl
        .create({ message: 'Loading Article...' })
        .then((loadingEl) => {
          loadingEl.present();
          this._subscriptions.push(
            this.feedService
              .getArticle(<string>paramMap?.get('articleId'))
              .subscribe((article) => {
                if (!article || !article.id) {
                  loadingEl.dismiss();
                  this.presentAlert();
                }
                this.article = article;
                if (this.article.isFavorite) {
                  this.iconFavorite = 'heart';
                } else {
                  this.iconFavorite = 'heart-outline';
                }
                loadingEl.dismiss();
              })
          );
        });
    });
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Oops...!',
      subHeader: 'It seems you encountered a problem!',
      message: "We couldn't load your article!",
      buttons: [
        {
          text: 'Back to Safety',
          role: 'confirm',
          handler: () => {
            this.navCtrl.navigateBack('/home/tabs/feed');
          },
        },
      ],
    });

    await alert.present();
  }

  async presentToast(
    position: 'top' | 'middle' | 'bottom',
    message: string,
    icon?: string,
    color?: string
  ) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: position,
      icon: icon,
      color: color,
    });

    await toast.present();
  }

  askForFavorites() {
    this.alertCtrl
      .create({
        header: this.article?.isFavorite
          ? 'Remove from Favorites?'
          : 'Add to Favorites?',
        subHeader: this.article?.isFavorite
          ? 'Do you want to remove this article to your favorites?'
          : 'Do you want to add this article to your favorites?',
        buttons: [
          {
            text: 'Cancel',
            role: 'Cancel',
          },
          {
            text: this.article?.isFavorite ? 'Remove it!' : 'Add it!',
            role: 'confirm',
            handler: () => {
              this.loadingCtrl
                .create({
                  message: this.article?.isFavorite
                    ? 'Removing from Favorites...'
                    : 'Adding to Favorites...',
                })
                .then((loadingEl) => {
                  loadingEl.present();
                  this.feedService
                    .toggleArticleFavorites(<string>this.article?.id)
                    .subscribe((res) => {
                      if (res) {
                        if (this.article?.isFavorite) {
                          this.iconFavorite = 'heart-outline';
                        } else {
                          this.iconFavorite = 'heart';
                        }
                        loadingEl.dismiss();
                        this.presentToast(
                          'bottom',
                          this.article?.isFavorite
                            ? 'Removed Succesfully!'
                            : 'Added Succesfully!',
                          'checkmark-circle-outline',
                          'success'
                        );
                        if (this.article)
                          this.article.isFavorite = !this.article.isFavorite;
                      } else {
                        loadingEl.dismiss();
                        this.presentToast(
                          'bottom',
                          this.article?.isFavorite
                            ? 'Could not Remove to Favorites'
                            : 'Could not Add to Favorites',
                          'close-circle-outline',
                          'danger'
                        );
                      }
                    });
                });
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  ngOnDestroy() {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
