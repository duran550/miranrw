import { boolean } from 'joi';
import mongoose, { Schema, model } from 'mongoose';

export interface categoryType {
  _id?: string;
  name?: string;
  level?: string;
  parent?: string | null;
  children?: string[];
  status?:boolean
}

const categorySchema = new Schema<categoryType>({
  name: { type: String, required: false },
  level: { type: String, required: false },
  parent: { type: Schema.Types.ObjectId, ref: 'Category' },
  children: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  status: {
    type:Boolean, required:false, default:true
  }
});
categorySchema.set('timestamps', true);
export const Category =
  mongoose.models.Category ||
  mongoose.model<categoryType>('Category', categorySchema);
