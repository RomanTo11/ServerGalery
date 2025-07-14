import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Artista } from 'src/artistas/entities/artistas.entity';
import { Category } from 'src/categories/entities/categories.entity';
import { IsDate, IsDateString } from 'class-validator';

@Entity()
export class Obra {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;
  
  @Column()
  tecnica: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column()
  imagenUrl: string;

  @Column({nullable: true})
  dimensiones: string;

  @IsDateString()
  fechaCreacion: Date;

  @ManyToOne(() => Category, (categoria) => categoria.obras, { nullable: true, eager: true })
  categoria: Category;

  @ManyToOne(() => Artista, (artistas) => artistas.obras, { eager: false })
  artista: Artista;


}

