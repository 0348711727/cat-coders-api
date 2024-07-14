import { AbstractDocument } from '@app/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Users extends AbstractDocument {
  @Prop()
  phoneNumber: string;

  @Prop()
  name: string;

  @Prop()
  memberShip: string;

  @Prop()
  memberPoint: number;

  @Prop()
  voucher: string[];

  @Prop()
  email: string;
}
export const UserSchema = SchemaFactory.createForClass(Users);
