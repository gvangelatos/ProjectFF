import { Paragraph } from '../paragraph/paragraph.model';

export class Article {
  constructor(
    public id: string,
    public isFavorite: boolean,
    public title: string,
    public date: Date,
    public author: string,
    public paragraphs: Paragraph[],
    public imageUrl?: string,
    public imageTitle?: string
  ) {}
}
