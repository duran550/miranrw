import mongoose, { Schema, model } from 'mongoose';

const CategorySchema = new Schema<any>({
    name: { type: String, required: false },
    options: { type: Schema.Types.ObjectId, ref: 'Category', required: false }
    
  },
  {
    timestamps: true,
  });
  
  export const Category =
    mongoose.models.Category || mongoose.model<any>('Category', CategorySchema);