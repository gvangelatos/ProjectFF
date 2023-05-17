import { List } from '../list/list.model';

export class Paragraph {
  constructor(
    public imageTitle?: string,
    public text?: string,
    public hasImage?: boolean,
    public imageUrl?: string,
    public paragraphTitle?: string,
    public hasList?: boolean,
    public listTitle?: string,
    public listItems?: List[]
  ) {}
}

// paragraphs: [
//     {
//       imageTitle: '',
//       text: 'Jean Paul Gaultier is a pioneer of street casting, with dramatic designs that in turn lend themselves well to stand-out street style moments. As fashion’s “enfant terrible” approaches his 71st birthday we’re taking a look back at his body morph shirt. This ’90s classic, reworked for today, has muscled its way in front of the cameras with celebrities and influencers rocking revamped versions of the look from collaborations with Y/Project and Lotta Volkova.',
//       hasImage: false,
//       imageUrl: '',
//     },
//   ],
