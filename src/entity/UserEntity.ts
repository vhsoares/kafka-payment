import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
	Unique,
	BaseEntity,
	JoinColumn,
} from 'typeorm';

import {Wallet} from './WalletEntity';

@Entity()
@Unique(['cpf', 'name'])
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column('text')
	email: string;

	@Column()
	cpf: string

	@Column()
	secret: string

	@OneToOne(() => Wallet, wallet => wallet.user, {
		cascade: true,
	})
	@JoinColumn()
	wallet: Wallet

	@Column('boolean')
	active: boolean
}
