import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema({ timestamps: true })
export class Skill {
  @Prop({ required: true, unique: true, trim: true })
  name: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);