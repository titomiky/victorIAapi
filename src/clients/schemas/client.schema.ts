import { Schema, Prop, SchemaFactory } from'@nestjs/mongoose';

@Schema()
export class client {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

export const clientSchema = SchemaFactory.createForClass(client);