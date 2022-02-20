import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Article')
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created: Date;
}