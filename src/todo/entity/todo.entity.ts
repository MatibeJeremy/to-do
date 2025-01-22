import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'todos' })
export class Todo {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({ nullable: false, type: 'varchar' })
  private _name: string;

  @Column({ nullable: false, type: 'varchar' })
  private _description: string;

  @Column({ nullable: false, type: 'boolean', default: false })
  private _done: boolean;

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  dateModified: Date;

  set Done(value: boolean) {
    this._done = value;
  }

  get Done() {
    return this._done;
  }

  set Name(name: string) {
    this._name = name;
  }

  get Name() {
    return this._name;
  }

  set Description(description: string) {
    this._description = description;
  }

  get Description() {
    return this._description;
  }

  async toggleDone(repository: any): Promise<boolean> {
    this.Done = !this.Done;
    await repository.save(this);
    return this.Done;
  }
}
