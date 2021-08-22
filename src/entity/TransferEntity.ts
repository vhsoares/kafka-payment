import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, BaseEntity} from 'typeorm';
import {Wallet} from './WalletEntity';

@Entity()
export class Transfer extends BaseEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string

   @ManyToOne(() => Wallet, wallet => wallet.transfer)
   payerWallet: Wallet

   @ManyToOne(() => Wallet, wallet => wallet.transfer)
   receiverWallet: Wallet

   @Column('decimal')
   value: number

   @Column('uuid')
   receiverId: string

   @Column() // Requested, accepted, denied , reverted
   status: string
}
