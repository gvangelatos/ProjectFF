import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, take, tap } from 'rxjs';
import { Article } from 'src/app/models/article/article.model';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private _articles = new BehaviorSubject<Article[]>([
    {
      id: '12345',
      isFavorite: false,
      imageUrl:
        'https://assets.vogue.com/photos/6337587281d9c13084c00ce6/master/w_2560%2Cc_limit/PARIS-STREETSTYLE-PHILOH-DAY3-%252071.jpg',
      title: 'How Jean Paul Gaultier’s Naked Looks Took Over Street Style',
      imageTitle: 'Photographed by Alex Finch',
      author: 'Irene Kim',
      date: new Date('April 22, 2023'),
      paragraphs: [
        {
          imageTitle: '',
          text: 'Jean Paul Gaultier is a pioneer of street casting, with dramatic designs that in turn lend themselves well to stand-out street style moments. As fashion’s “enfant terrible” approaches his 71st birthday we’re taking a look back at his body morph shirt. This ’90s classic, reworked for today, has muscled its way in front of the cameras with celebrities and influencers rocking revamped versions of the look from collaborations with Y/Project and Lotta Volkova.',
          hasImage: false,
          imageUrl: '',
        },
        {
          text: '',
          imageTitle: 'Paris, fall 2023 menswear Photographed by Phil Oh',
          hasImage: true,
          imageUrl:
            'https://assets.vogue.com/photos/63cc88502a9e601f64a0e362/master/w_640,c_limit/PARIS-MENS-STREETSTYLE-PHILOH-DAY2-%207.jpg',
        },
        {
          text: '',
          imageTitle:
            'Paris, spring 2023 menswear  Videographed by Christina Fragkou',
          hasImage: true,
          imageUrl:
            'https://assets.vogue.com/photos/64404fab6fb2cdc74ae5a748/master/w_640,c_limit/ezgif.com-gif-maker%20(26).gif',
        },
        {
          text: '',
          imageTitle:
            'Valentina Ferrer wore a JPG x Y/Project tank top in a neon colorway to match her partner, J.Balvin’s hair at the spring 2023 menswear shows.  Videographed by Christina Fragkou',
          hasImage: true,
          imageUrl:
            'https://assets.vogue.com/photos/6442ea23c1aeb0fdef2050d0/master/w_640,c_limit/ezgif.com-gif-maker%20(25).gif',
        },
        {
          text: '',
          imageTitle:
            'In London, street stylers rocked the JPG x Lotta Volkova’s ‘Naked’ dress weeks after its launch globally. London, spring 2023 menswear Photographed by Acielle / Style Du Monde',
          hasImage: true,
          imageUrl:
            'https://assets.vogue.com/photos/62a64ed9aee01a3fd87ff1d6/master/w_640,c_limit/london-mens-fashion-week-ss23-street-style-acielle-styledumonde-day2-024.jpg',
        },
        {
          text: '',
          imageTitle:
            'The revamped JPG x Y/Project body morph dress was a fan favorite in 1996 after Jean Paul Gaultier’s fall 1995 ready-to-wear show and in 2023 amongst celebrities like Kendall Jenner.  Art Basel, Miami 2022 Photographed by Darrel Hunter',
          hasImage: true,
          imageUrl:
            'https://assets.vogue.com/photos/6388d02f5c1ffc3a5bb7fbec/master/w_640,c_limit/DWH_Art_Basel_2022_Miami__01Dec2022-377.jpg',
        },
        {
          text: '',
          imageTitle:
            'Paris, spring 2023 menswear Videographed by Christina Fragkou',
          hasImage: true,
          imageUrl:
            'https://assets.vogue.com/photos/64404d93252be903ce97612b/master/w_640,c_limit/ezgif.com-video-to-gif%20(11).gif',
        },
      ],
    },
    {
      id: Math.random().toString(),
      isFavorite: false,
      imageUrl:
        'https://assets.vogue.com/photos/633ed3ba68b06938ed4a8d2d/master/w_2560%2Cc_limit/PARIS-STREETSTYLE-PHILOH-DAY8-%252033.jpg',
      title: 'Ahead of the Met Gala, Street Style’s Pearliest Moments',
      imageTitle: 'Photographed by Alex Finch',
      author: 'Irene Kim',
      date: new Date('April 29, 2023'),
      paragraphs: [
        {
          imageTitle: '',
          text: 'Has the pearl ever gone out of fashion? Audrey Hepburn famously wore a three-tiered set in Breakfast at Tiffany’s, and during Karl Lagerfeld’s time at Chanel, he made generous use of Coco’s preferred gem. More recently, Vivienne Westwood’s  pearl choker has been making the rounds, and Simone Rocha’s pearl clutch has become  an ‘It’ bag in London. Scroll through for the best pearl moments in street style below. ',
          hasImage: false,
          imageUrl: '',
        },
        {
          text: '',
          imageTitle: 'London, fall 2022 ready-to-wear Photographed by Phil Oh',
          hasImage: true,
          imageUrl:
            'https://assets.vogue.com/photos/6213a062239123e31063031d/master/w_960,c_limit/LFW-STREETSTYLE-PHILOH-DAY2-%205.jpg',
        },
        {
          text: '',
          imageTitle:
            'London, spring 2023 ready-to-wear Photographed by Phil Oh',
          hasImage: true,
          imageUrl:
            'https://assets.vogue.com/photos/632918c8bee7fa2be1d2213b/master/w_960,c_limit/LFW-STREETSTYLE-PHILOH-DAY2-005.jpg',
        },
        {
          text: '',
          imageTitle: 'Paris, spring 2023 menswear Photographed by Phil Oh',
          hasImage: true,
          imageUrl:
            'https://assets.vogue.com/photos/62b73b3403ab14729d2cd476/master/w_960,c_limit/PARIS-MENS-STREETSTYLE-PHILOH-DAY4%2028.jpg',
        },
        {
          text: '',
          imageTitle:
            'Paris, spring 2017 ready-to-wear Photographed by Phil Oh',
          hasImage: true,
          imageUrl:
            'https://assets.vogue.com/photos/5877003bdb0d9b0b1741e7a8/master/w_960,c_limit/17-pfw-ss17-street-style-day-7-82.jpg',
        },
        {
          text: '',
          imageTitle:
            'London, spring 2023 ready-to-wear Photographed by Phil Oh',
          hasImage: true,
          imageUrl:
            'https://assets.vogue.com/photos/63291581bee7fa2be1d22137/master/w_960,c_limit/LFW-STREETSTYLE-PHILOH-DAY2-047.jpg',
        },
        {
          text: '',
          imageTitle: 'Paris, spring 2023 menswear Photographed by Phil Oh',
          hasImage: true,
          imageUrl:
            'https://assets.vogue.com/photos/62b73b387068ff72e6ce8469/master/w_960,c_limit/PARIS-MENS-STREETSTYLE-PHILOH-DAY4%2031.jpg',
        },
        {
          text: '',
          imageTitle:
            'Paris, spring 2022 menswear Photographed by Acielle / Style du Monde',
          hasImage: true,
          imageUrl:
            'https://assets.vogue.com/photos/60d4f0ea2cb5442a71782e1e/master/w_960,c_limit/Paris%20Mens%20SS22%20day%203%20by%20STYLEDUMONDE%20Street%20Style%20Fashion%20Photography_95A5690FullRes.jpg',
        },
        {
          text: '',
          imageTitle:
            'Paris, spring 2022 menswear Photographed by Acielle / Style du Monde',
          hasImage: true,
          imageUrl:
            'https://assets.vogue.com/photos/60d3d64a43c12d124e30cc35/master/w_960,c_limit/Paris%20Mens%20SS22%20day%202%20by%20STYLEDUMONDE%20Street%20Style%20Fashion%20Photography_95A4547FullRes.jpg',
        },
      ],
    },
    {
      id: Math.random().toString(),
      isFavorite: false,
      imageUrl:
        'https://assets.vogue.com/photos/633459807764ce1485e77fb8/master/w_2560%2Cc_limit/PARIS-STREETSTYLE-PHILOH-DAY1-%252024.jpg',
      title: 'The Streets Go Sheer: Street Style’s Best Almost Naked Looks',
      imageTitle: 'Photographed by Alex Finch',
      author: 'Irene Kim',
      date: new Date('May 6, 2023'),
      paragraphs: [
        {
          text: 'At this year’s Met Gala after-parties, Emily Ratajkowski and Kendall Jenner  opted for sheer, barely there pieces. The former pulled an archival look from Karl Lagerfeld’s Chanel spring 1994 collection, a reminder that body-con dressing predates the “naked” look brands like Nensi Dojaka and Coperni are popularizing today.  You can count on there being more sheer looks to come in street style this spring. Scroll through for the best “naked” looks in street style below. ',
          imageTitle: '',
          hasImage: false,
          imageUrl: '',
        },
        {
          text: '',
          imageTitle:
            'At Miu Miu, show-goers cover up their girlish sheer lace dresses with boyish moto jackets.  Photographed by Phil Oh',
          hasImage: true,
          imageUrl:
            'https://assets.vogue.com/photos/633ed3ab86e1dd093194e2a2/master/w_960,c_limit/PARIS-STREETSTYLE-PHILOH-DAY8-%2039.jpg',
        },
        {
          text: '',
          imageTitle: 'Paris, fall 2020 ready-to-wear Photographed by Phil Oh',
          hasImage: true,
          imageUrl:
            'https://assets.vogue.com/photos/5e594a1b6432e400088ea299/master/w_960,c_limit/PARIS-STREETSTYLE-PHILOH-DAY3%2014.jpg',
        },
        {
          text: '',
          imageTitle:
            'Paris, fall 2021 couture Photographed by Acielle / Style Du Monde',
          hasImage: true,
          imageUrl:
            'https://assets.vogue.com/photos/60e7682f16ecb991790ea160/master/w_960,c_limit/Paris%20Couture%20FW21%20Day%205%20by%20STYLEDUMONDE%20Street%20Style%20Fashion%20Photography_95A4039FullRes.jpg',
        },
        {
          text: '',
          imageTitle:
            'Sheer looks have been making their rounds in street style since 2016.  Photographed by Phil Oh',
          hasImage: true,
          imageUrl:
            'https://assets.vogue.com/photos/58774d7f765c6c7b400f0103/master/w_960,c_limit/phil-oh-pfw-spring-2016-day-7-street-style-08.jpg',
        },
        {
          text: '',
          imageTitle:
            'Paris, spring 2017 ready-to-wear Photographed by Phil Oh',
          hasImage: true,
          imageUrl:
            'https://assets.vogue.com/photos/587700a125f1e49404facf03/master/w_960,c_limit/12-paris-street-style-spring-2017-phil-oh-day-5.jpg',
        },
        {
          text: '',
          imageTitle:
            'Your sheer looks don’t have to show everything; try a-skin toned bodysuit under your naked look.  Photographed by Acielle / Style Du Monde',
          hasImage: true,
          imageUrl:
            'https://assets.vogue.com/photos/60e7682d06f9b3252946f13a/master/w_960,c_limit/Paris%20Couture%20FW21%20Day%205%20by%20STYLEDUMONDE%20Street%20Style%20Fashion%20Photography_95A4198FullRes.jpg',
        },
        {
          text: '',
          imageTitle: 'Paris, fall 2023 ready-to-wear Photographed by Phil Oh',
          hasImage: true,
          imageUrl:
            'https://assets.vogue.com/photos/6408e4bf2d97b176bf8cee06/master/w_960,c_limit/PARIS-STREETSTYLE-PHILOH-DAY8-%2014.jpg',
        },
        {
          text: '',
          imageTitle:
            'Paris, spring 2023 ready-to-wear Photographed by Phil Oh',
          hasImage: true,
          imageUrl:
            'https://assets.vogue.com/photos/633ed3c48b152b9afaa2559c/master/w_960,c_limit/PARIS-STREETSTYLE-PHILOH-DAY8-%2027.jpg',
        },
      ],
    },
    {
      id: Math.random().toString(),
      isFavorite: false,
      imageUrl:
        'https://fashionunited.com/cdn-cgi/image/fit=cover,format=auto,gravity=center,height=926,quality=70,width=1388/https://fashionunited.com/img/upload/2023/05/11/2023-02-22-sweaty-betty-q423-shot-72-030-g1s4rp1e-2023-05-11.jpeg',
      imageTitle: 'Image: Merrell x Sweaty Betty',
      title:
        'Exciting brand-new launch: Limited Edition Merrell Antora 3 x Sweaty Betty in Hot Pink',
      author: 'SponsorXD',
      date: new Date('May 11, 2023'),
      paragraphs: [
        {
          text: 'Between the new Barbie movie, the Eras Tour, and Coachella outfits, pink is sure to be having a moment this spring with “Barbiecore” already trending.',
          imageTitle: '',
          hasImage: false,
          imageUrl: '',
        },
        {
          text: 'In collaboration with London-based Sweaty Betty, Merrell has launched a hot pink limited run of its Antora 3 trail shoe. Through their shared values of empowering women to get outside and move their bodies in the outdoors, the Merrell Antora 3 x Sweaty Betty was born.',
          imageTitle: '',
          hasImage: false,
          imageUrl: '',
        },
        {
          text: 'The Antora 3 is Merrell’s best-selling women’s trail running shoe – and, this collaboration will offer an entirely hot pink version of the shoe and feature the Sweaty Betty logo on the tongue. It’s perfect to take from the trail to brunch, Coachella, the movies, and back.',
          imageTitle: '',
          hasImage: false,
          imageUrl: '',
        },
        {
          text: 'The Antora 3 just got better - key updates include a more durable upper for over foot protection, a softer and more responsive midsole with FloatPro Foam™ pods strategically placed under the heel and forefoot where you need extra cushion the most, and a new grip-enhancing design to the outsole made by our partners at Vibram®. The Antora 3 updates will ensure you’re comfortable and capable when you make your miles wild on trail.',
          imageTitle: '',
          hasImage: false,
          imageUrl: '',
        },
        {
          text: '',
          imageTitle: '',
          hasImage: false,
          imageUrl: '',
          hasList: true,
          listTitle: 'Features',
          listItems: [
            {
              text: 'Breathable mesh and TPU upper ',
            },
            {
              text: '100% recycled laces and webbing ',
            },
            {
              text: 'Padded collar ',
            },
            {
              text: 'External rear sling locks in the heel ',
            },
            {
              text: '100% recycled breathable mesh lining ',
            },
            {
              text: '100% recycled mesh footbed cover',
            },
            {
              text: 'Cleansport NXT™ treated for natural odor control ',
            },
            {
              text: '50% recycled removable EVA foam footbed ',
            },
            {
              text: 'Rock plate for protection ',
            },
            {
              text: 'Forefoot and heel cushioning pods ',
            },
            {
              text: 'Super Rebound Compound midsole provides durable shock absorption to help reduce torque and allow for a smooth transition into the midfoot ',
            },
            {
              text: 'Vibram® TC5+ outsole provides exceptional traction for outdoor multi-sport activities, formulated exclusively for Merrell ',
            },
          ],
        },
        {
          text: "The Merrell Antora 3 x Sweaty Betty is now available on Merrell's website.",
          imageTitle: '',
          hasImage: false,
          imageUrl: '',
        },
        {
          text: '',
          imageTitle: 'Image: Merrell x Sweaty Betty ',
          hasImage: true,
          imageUrl:
            'https://fashionunited.com/cdn-cgi/image/fit=cover,format=auto,gravity=center,quality=70,width=582/https://fashionunited.com/img/upload/2023/05/11/2023-02-22-sweaty-betty-q423-shot-46-001-x20iuzpc-2023-05-11.jpeg',
        },
      ],
    },
    {
      id: '2323',
      isFavorite: true,
      imageUrl:
        'https://fashionunited.com/cdn-cgi/image/fit=cover,format=auto,gravity=center,height=926,quality=70,width=1388/https://fashionunited.com/img/upload/2023/05/11/dsquared2-for-manchester-city-capsule-collection-1-515b9jlp-2023-05-11.jpeg',
      imageTitle: '',
      title: 'Dsquared2 unveils exclusive Manchester City capsule collection',
      author: 'Danielle Wightman-Stone',
      date: new Date('May 11, 2023'),
      paragraphs: [
        {
          text: 'Designer fashion brand Dsquared2, founded by Dean and Dan Caten, is celebrating its long-standing partnership with Manchester City Football Club with a new exclusive capsule collection.',
          imageTitle: '',
          hasImage: false,
          imageUrl: '',
        },
        {
          text: 'Dsquared2 has been behind the pre-match uniforms for the Manchester City players and their manager Pep Guardiola for seven years, and now they are releasing a capsule collection of ready-to-wear and accessories detailed with the team’s name and crest paired with the Dsquared2 logo.',
          imageTitle: '',
          hasImage: false,
          imageUrl: '',
        },
        {
          text: 'The capsule features denim, outerwear, baseball caps and sneakers with two different logo designs, and will be available via Dsquared2 flagship stores, its e-commerce and a selection of wholesalers worldwide from May 11.',
          imageTitle: '',
          hasImage: false,
          imageUrl: '',
        },
        {
          text: '',
          imageTitle:
            'Image: Dsquared2; Dsquared2 x Manchester City capsule collection',
          hasImage: true,
          imageUrl:
            'https://fashionunited.com/cdn-cgi/image/fit=cover,format=auto,gravity=center,quality=70,width=582/https://fashionunited.com/img/upload/2023/05/11/fw23-main-bpm0037-11707008-2124-sn045622-closeup001-psg7sekj-2023-05-11.jpeg',
        },
        {
          text: 'The item are mostly rendered in black and feature ‘Dsquared2 for Manchester City Limited Edit’ in white printed on the back of the black tailored jacket with a split vent, down the front of a blue denim shirt and jeans, on a black crewneck knit and a baseball cap, as well as on the tongue of the black lace-up boots.',
          imageTitle: '',
          hasImage: false,
          imageUrl: '',
        },
        {
          text: 'While the black bomber jacket, black straight-fit jeans, jumper, beanie, baseball cap and backpack are detailed with a ship and diagonal stripes and the Manchester City circular crest printed in white.',
          imageTitle: '',
          hasImage: false,
          imageUrl: '',
        },
        {
          text: 'Rounding up the capsule is a pair of low-top black leather sneakers printed with Manchester City in white on the reverse.',
          imageTitle: '',
          hasImage: false,
          imageUrl: '',
        },
        {
          text: 'The capsule collection also comes with a special hangtag and internal label, and a dedicated campaign featuring key stars from Manchester City, including Erling Haaland.',
          imageTitle: '',
          hasImage: false,
          imageUrl: '',
        },
        {
          text: '',
          imageTitle:
            'Image: Dsquared2; Dsquared2 x Manchester City capsule collection ',
          hasImage: true,
          imageUrl:
            'https://fashionunited.com/cdn-cgi/image/fit=cover,format=auto,gravity=center,quality=70,width=582/https://fashionunited.com/img/upload/2023/05/11/dsquared2-for-manchester-city-capsule-collection-2-0di58ef8-2023-05-11.jpeg',
        },
        {
          text: '',
          imageTitle:
            'Image: Dsquared2; Dsquared2 x Manchester City capsule collection',
          hasImage: true,
          imageUrl:
            'https://fashionunited.com/cdn-cgi/image/fit=cover,format=auto,gravity=center,quality=70,width=582/https://fashionunited.com/img/upload/2023/05/11/fw23-main15834-sjkj2pwa-2023-05-11.jpeg',
        },
        {
          text: '',
          imageTitle:
            'Image: Dsquared2; Dsquared2 x Manchester City capsule collection',
          hasImage: true,
          imageUrl:
            'https://fashionunited.com/cdn-cgi/image/fit=cover,format=auto,gravity=center,quality=70,width=582/https://fashionunited.com/img/upload/2023/05/11/fw23-main15830-hdtm83x9-2023-05-11.jpeg',
        },
        {
          text: '',
          imageTitle:
            'Image: Dsquared2; Dsquared2 x Manchester City capsule collection',
          hasImage: true,
          imageUrl:
            'https://fashionunited.com/cdn-cgi/image/fit=cover,format=auto,gravity=center,quality=70,width=582/https://fashionunited.com/img/upload/2023/05/11/fw23-main-bcm0753-05c07014-2124-sn045847-closeup001-e8aob8w6-2023-05-11.jpeg',
        },
      ],
    },
    {
      id: Math.random().toString(),
      isFavorite: false,
      imageUrl:
        'https://fashionunited.com/cdn-cgi/image/fit=cover,format=auto,gravity=center,height=926,quality=70,width=1388/https://fashionunited.com/img/upload/2023/04/17/fw23-tailoring-fq840yn0-2023-04-17.jpeg',
      imageTitle:
        'Image: McQueen, McCartney, Vuitton FW23/Launchmetrics Spotlight',
      title: 'FW23 runway trends buyers guide: print and patterned tailoring',
      author: 'Jayne Mountford',
      date: new Date('May 10, 2023'),
      paragraphs: [
        {
          text: 'In all four fashion cities, New York, London, Milan and Paris, there was a particular emphasis on the ‘anatomy of tailoring,’ with designers re-discovering the value of beautifully cut separates. Call it an antidote to three years of ‘dopamine’ dressing while working from home. The constant parade of impeccably tailored silhouettes in shades of beige and grey led to murmurings among fashion industry insiders of a new trend they named ‘quiet luxury.’ On the other hand, more than a few designers chose to show a series of two-piece suits with structured jackets rendered in a series of bold prints and patterns. Here are ten of the best. ',
          imageTitle: '',
          hasImage: false,
          imageUrl: '',
        },
        {
          paragraphTitle: 'Chanel (designer Virginie Viard)',
          text: 'Look 27: A jacket and matching Bermuda shorts in a patchwork of black, white, grey and pink tweed squares was topped by a sleeveless vest embellished with the iconic house camellias in pink on a black background; black boots, a silver belt and mismatched earrings completed the ensemble. ',
          imageTitle: 'Chanel fw23/Launchmetrics Spotlight ',
          hasImage: true,
          imageUrl:
            'https://fashionunited.com/cdn-cgi/image/fit=cover,format=auto,gravity=center,quality=70,width=582/https://fashionunited.com/img/upload/2023/04/17/chanel-f23-027-g3a0d5hw-2023-04-17.jpeg',
        },
        {
          paragraphTitle: 'Stella McCartney ',
          text: 'Look 3: A two-piece brown and orange window pane check suit with a double breasted six button blazer and matching knee length skirt with two side slits; brown faux fur pumps and a vegan leather chain handle bag completed the look. ',
          imageTitle: 'Stella McCartney fw23/Launchmetrics Spotlight ',
          hasImage: true,
          imageUrl:
            'https://fashionunited.com/cdn-cgi/image/fit=cover,format=auto,gravity=center,quality=70,width=582/https://fashionunited.com/img/upload/2023/04/17/stella-mccartney-f23-003-26r03gp5-2023-04-17.jpeg',
        },
        {
          paragraphTitle: 'Akris (designer Albert Kriemler) ',
          text: 'Look 21: A straight legged pants suit with a double-breasted jacket: a geometric print incorporating the brand logo rendered in stripes of rust, orange and gold on backgrounds of beige and black. The model carried a matching clutch. ',
          imageTitle: 'Akris fw23/Launchmetrics Spotlight ',
          hasImage: true,
          imageUrl:
            'https://fashionunited.com/cdn-cgi/image/fit=cover,format=auto,gravity=center,quality=70,width=582/https://fashionunited.com/img/upload/2023/04/17/akris-f23-021-de49u4ng-2023-04-17.jpeg',
        },
        {
          paragraphTitle: 'Etro (designer Marco De Vincenzo) ',
          text: 'Look 23: A one button jacket and matching maxi skirt in a black brocade with white dots was overlaid with embroidered paisleys in navy, blue, white and orange. A navy and blue shirt was shown underneath. Accessories included a gold chain charm necklace, a brown leather and plaid satchel and burgundy platform Mary-Janes embellished with blue daisies. ',
          imageTitle: 'Etro fw23/Launchmetrics Spotlight ',
          hasImage: true,
          imageUrl:
            'https://fashionunited.com/cdn-cgi/image/fit=cover,format=auto,gravity=center,quality=70,width=582/https://fashionunited.com/img/upload/2023/04/17/etro-f23-023-3tur0gwg-2023-04-17.jpeg',
        },
        {
          paragraphTitle: 'Thom Browne ',
          text: 'Look 17: A grey and white plaid skirt suit over a striped shirt and tie under a navy and white plaid bouclé three-button coat. Accessories included a boxy handheld bag, striped socks and spectator pointed toe Oxfords. ',
          imageTitle: 'Thom Browne fw23/Launchmetrics Spotlight ',
          hasImage: true,
          imageUrl:
            'https://fashionunited.com/cdn-cgi/image/fit=cover,format=auto,gravity=center,quality=70,width=582/https://fashionunited.com/img/upload/2023/04/17/thom-browne-f23-017-e5hy1y1c-2023-04-17.jpeg',
        },
        {
          paragraphTitle: 'Alberta Ferretti ',
          text: 'Look 34: A mixed print two-piece burgundy and red suit with a check five-button jacket and straight leg striped pants. A crossbody chain handle bag and black boots completed the look. ',
          imageTitle: 'Alberta Ferretti fw23/Launchmetrics Spotlight ',
          hasImage: true,
          imageUrl:
            'https://fashionunited.com/cdn-cgi/image/fit=cover,format=auto,gravity=center,quality=70,width=582/https://fashionunited.com/img/upload/2023/04/17/ferretti-f23-034-cfty7cm0-2023-04-17.jpeg',
        },
        {
          paragraphTitle: 'Louis Vuitton (designer Nicolas Ghesquière) ',
          text: 'Look 17: A burgundy and cream Prince of Wales check two-piece suit: the jacket had a chain fastener instead of a button and the pants were straight. A black deep vee top was shown underneath with a brown cashmere scarf. The model carried a whimsical handbag representing the Louis Vuitton flagship store on the Place Vendôme and wore white patent sandals. ',
          imageTitle: 'Louis Vuitton fw23/Launchmetrics Spotlight ',
          hasImage: true,
          imageUrl:
            'https://fashionunited.com/cdn-cgi/image/fit=cover,format=auto,gravity=center,quality=70,width=582/https://fashionunited.com/img/upload/2023/04/17/louisvuittonaw230017-1e90a65c2a5adf45c29d-copy-oj918mun-2023-04-17.jpeg',
        },
        {
          paragraphTitle: 'Alexander McQueen (designer Sarah Burton) ',
          text: 'Look 10: A double-breasted broad-shouldered blazer and matching overlong pants were rendered in navy and white pinstriped wool. A white shirt and black leather tie were shown underneath. The model wore bold silver earrings and rings. ',
          imageTitle: 'Alexander McQueen fw23/Launchmetrics Spotlight ',
          hasImage: true,
          imageUrl:
            'https://fashionunited.com/cdn-cgi/image/fit=cover,format=auto,gravity=center,quality=70,width=582/https://fashionunited.com/img/upload/2023/04/17/mcqueen-po-f23-010-cpxcvonu-2023-04-17.jpeg',
        },
        {
          paragraphTitle: 'Saint Laurent (designer Anthony Vaccarello) ',
          text: 'Look 32: A brown houndstooth wool two-piece suit consisted of a broad-shouldered two-button jacket with a double flap pocket and a matching above-the-knee split-front skirt. The suit was shown over a deep scoop neck black top; accessories included black sheer hose, metallic brown pointed toe slingbacks, black gloves and black sunglasses. ',
          imageTitle: 'Saint Laurent fw23/Launchmetrics Spotlight ',
          hasImage: true,
          imageUrl:
            'https://fashionunited.com/cdn-cgi/image/fit=cover,format=auto,gravity=center,quality=70,width=582/https://fashionunited.com/img/upload/2023/04/17/saint-laurent-f23-032-wj9gezw9-2023-04-17.jpeg',
        },
        {
          paragraphTitle: 'Antonio Marras ',
          text: 'Look 72: A two-piece suit in Royal Stewart tartan: a broad-shouldered double-breasted six button blazer with a matching mid-length pencil skirt. A white shirt and tartan tie were shown underneath; black hose and black and tartan platform shoes completed the look. ',
          imageTitle: 'Antonio Marras fw23/Launchmetrics Spotlight ',
          hasImage: true,
          imageUrl:
            'https://fashionunited.com/cdn-cgi/image/fit=cover,format=auto,gravity=center,quality=70,width=582/https://fashionunited.com/img/upload/2023/04/17/marras-f23-072-3so1twly-2023-04-17.jpeg',
        },
      ],
    },
  ]);

  private _favoriteArticles = new BehaviorSubject<Article[]>([
    {
      id: '2323',
      isFavorite: true,
      imageUrl:
        'https://fashionunited.com/cdn-cgi/image/fit=cover,format=auto,gravity=center,height=926,quality=70,width=1388/https://fashionunited.com/img/upload/2023/05/11/dsquared2-for-manchester-city-capsule-collection-1-515b9jlp-2023-05-11.jpeg',
      imageTitle: '',
      title: 'Dsquared2 unveils exclusive Manchester City capsule collection',
      author: 'Danielle Wightman-Stone',
      date: new Date('May 11, 2023'),
      paragraphs: [
        {
          text: 'Designer fashion brand Dsquared2, founded by Dean and Dan Caten, is celebrating its long-standing partnership with Manchester City Football Club with a new exclusive capsule collection.',
          imageTitle: '',
          hasImage: false,
          imageUrl: '',
        },
        {
          text: 'Dsquared2 has been behind the pre-match uniforms for the Manchester City players and their manager Pep Guardiola for seven years, and now they are releasing a capsule collection of ready-to-wear and accessories detailed with the team’s name and crest paired with the Dsquared2 logo.',
          imageTitle: '',
          hasImage: false,
          imageUrl: '',
        },
        {
          text: 'The capsule features denim, outerwear, baseball caps and sneakers with two different logo designs, and will be available via Dsquared2 flagship stores, its e-commerce and a selection of wholesalers worldwide from May 11.',
          imageTitle: '',
          hasImage: false,
          imageUrl: '',
        },
        {
          text: '',
          imageTitle:
            'Image: Dsquared2; Dsquared2 x Manchester City capsule collection',
          hasImage: true,
          imageUrl:
            'https://fashionunited.com/cdn-cgi/image/fit=cover,format=auto,gravity=center,quality=70,width=582/https://fashionunited.com/img/upload/2023/05/11/fw23-main-bpm0037-11707008-2124-sn045622-closeup001-psg7sekj-2023-05-11.jpeg',
        },
        {
          text: 'The item are mostly rendered in black and feature ‘Dsquared2 for Manchester City Limited Edit’ in white printed on the back of the black tailored jacket with a split vent, down the front of a blue denim shirt and jeans, on a black crewneck knit and a baseball cap, as well as on the tongue of the black lace-up boots.',
          imageTitle: '',
          hasImage: false,
          imageUrl: '',
        },
        {
          text: 'While the black bomber jacket, black straight-fit jeans, jumper, beanie, baseball cap and backpack are detailed with a ship and diagonal stripes and the Manchester City circular crest printed in white.',
          imageTitle: '',
          hasImage: false,
          imageUrl: '',
        },
        {
          text: 'Rounding up the capsule is a pair of low-top black leather sneakers printed with Manchester City in white on the reverse.',
          imageTitle: '',
          hasImage: false,
          imageUrl: '',
        },
        {
          text: 'The capsule collection also comes with a special hangtag and internal label, and a dedicated campaign featuring key stars from Manchester City, including Erling Haaland.',
          imageTitle: '',
          hasImage: false,
          imageUrl: '',
        },
        {
          text: '',
          imageTitle:
            'Image: Dsquared2; Dsquared2 x Manchester City capsule collection ',
          hasImage: true,
          imageUrl:
            'https://fashionunited.com/cdn-cgi/image/fit=cover,format=auto,gravity=center,quality=70,width=582/https://fashionunited.com/img/upload/2023/05/11/dsquared2-for-manchester-city-capsule-collection-2-0di58ef8-2023-05-11.jpeg',
        },
        {
          text: '',
          imageTitle:
            'Image: Dsquared2; Dsquared2 x Manchester City capsule collection',
          hasImage: true,
          imageUrl:
            'https://fashionunited.com/cdn-cgi/image/fit=cover,format=auto,gravity=center,quality=70,width=582/https://fashionunited.com/img/upload/2023/05/11/fw23-main15834-sjkj2pwa-2023-05-11.jpeg',
        },
        {
          text: '',
          imageTitle:
            'Image: Dsquared2; Dsquared2 x Manchester City capsule collection',
          hasImage: true,
          imageUrl:
            'https://fashionunited.com/cdn-cgi/image/fit=cover,format=auto,gravity=center,quality=70,width=582/https://fashionunited.com/img/upload/2023/05/11/fw23-main15830-hdtm83x9-2023-05-11.jpeg',
        },
        {
          text: '',
          imageTitle:
            'Image: Dsquared2; Dsquared2 x Manchester City capsule collection',
          hasImage: true,
          imageUrl:
            'https://fashionunited.com/cdn-cgi/image/fit=cover,format=auto,gravity=center,quality=70,width=582/https://fashionunited.com/img/upload/2023/05/11/fw23-main-bcm0753-05c07014-2124-sn045847-closeup001-e8aob8w6-2023-05-11.jpeg',
        },
      ],
    },
  ]);

  get articles() {
    return this._articles.pipe(delay(1000));
  }

  get favoriteArticles() {
    return this._favoriteArticles.asObservable();
  }

  getArticle(id: string) {
    return this.articles.pipe(
      take(1),
      delay(1000),
      map((articles) => {
        return <Article>{
          ...articles.find((ar) => {
            return ar.id === id;
          }),
        };
      })
    );
  }

  toggleArticleFavorites(articleId: string) {
    return this.articles.pipe(
      take(1),
      delay(800),
      tap((articles) => {
        const updatedarticleIndex = articles.findIndex(
          (article) => article.id === articleId
        );
        const updatedarticles = [...articles];
        const old = updatedarticles[updatedarticleIndex];
        updatedarticles[updatedarticleIndex] = new Article(
          old.id,
          old.isFavorite ? false : true,
          old.title,
          old.date,
          old.author,
          old.paragraphs,
          old?.imageUrl,
          old?.imageTitle
        );
        const updatefavorites = updatedarticles.filter(
          (article) => article.isFavorite === true
        );
        this._favoriteArticles.next([...updatefavorites]);
        this._articles.next(updatedarticles);
      })
    );
  }

  getFavorites() {
    return this.articles.pipe(
      take(1),
      delay(800),
      map((articles) => {
        return {
          ...articles.map((ar) => {
            return ar.isFavorite === true;
          }),
        };
      })
    );
  }

  constructor() {}
}
