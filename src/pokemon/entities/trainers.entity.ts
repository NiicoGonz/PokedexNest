import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Trainers extends Document{
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
    region: string;
    @Prop({
        required: true,
        index: true,
    })
    status: string;
}

export const TrainersSchema = SchemaFactory.createForClass(Trainers);