import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsString, IsOptional } from 'class-validator';
import { Obra } from 'src/obras/entities/obras.entity';

@Entity()
export class Artista {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  biografia: string;

  @Column({ nullable: true })
  pais: string;

  @Column({ nullable: true })
  fechaNacimiento: string;

  @Column()
  imagenUrl: string;

  @Column()
  descripcion: string;
  
  @OneToMany(() => Obra, (obras) => obras.artista)
  obras: Obra[];
}
