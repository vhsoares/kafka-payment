import {Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, BaseEntity} from 'typeorm';
import {User} from './UserEntity';
import {Transfer} from './TransferEntity';

@Entity()
export class Wallet extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('decimal')
  balance: number

  @OneToOne(() => User, user => user.wallet)
  user: User

  @OneToMany(() => Transfer, transfer => transfer.payerWallet)
  sendedTransfers: Transfer

  @OneToMany(() => Transfer, transfer => transfer.receiverWallet)
  receivedTransfers: Transfer
}
