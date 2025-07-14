import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany} from 'typeorm';
import { Obra } from 'src/obras/entities/obras.entity';


@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  imagenUrl: string;

  @CreateDateColumn()
  fechaCreacion: Date;

  @OneToMany(() => Obra, (obra) => obra.categoria)
  obras: Obra[];
}

