import { Schema, Prop, SchemaFactory } from'@nestjs/mongoose';

@Schema()
export class jobOffer {
    id: number;
@Prop({required: true})
    name: string;
    @Prop()
    email: string;
    @Prop()
    password: string;
    @Prop()
    createdAt: string;
    updatedAt: string;
}

export const jobOfferSchema = SchemaFactory.createForClass(jobOffer);