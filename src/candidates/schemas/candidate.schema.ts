import { Schema, Prop, SchemaFactory } from'@nestjs/mongoose';

@Schema()
export class candidate {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

export const candidateSchema = SchemaFactory.createForClass(candidate);