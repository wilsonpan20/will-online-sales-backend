import { ProductEntity } from "src/product/entities/product.entity";
import { PrimaryGeneratedColumn, CreateDateColumn, Column, UpdateDateColumn, Entity, OneToMany } from "typeorm";

@Entity({ name: 'category' })
export class CategoryEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;


  @Column({ name: 'name', nullable: false })
  name: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => ProductEntity, (product: ProductEntity) => product.category)
  products?: ProductEntity



}