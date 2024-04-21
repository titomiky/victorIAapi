import { Schema, Prop, SchemaFactory } from'@nestjs/mongoose';

@Schema()
export class administrator {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

export const administratorSchema = SchemaFactory.createForClass(administrator);