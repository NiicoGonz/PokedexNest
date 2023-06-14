import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Pokemon extends Document {
  @Prop({
    required: true,
    index: true,
    unique: true,
  })
  name: string;

  @Prop({
    required: true,
    index: true,
  })
  type: string;

  @Prop({
    required: true,
    index: true,
  })
  pokedex: string;

  @Prop({
    required: true,
    index: true,
  })
  region: string;

  @Prop({
    required: true,
    index: true,
    unique: true,
  })
  no: number;
}
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
