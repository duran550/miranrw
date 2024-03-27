import mongoose, { Schema, model } from 'mongoose';

const CategorySchema = new Schema<any>({
    name: { type: String, required: false },
    
  },
  {
    timestamps: true,
  });
  
  export const Category =
    mongoose.models.Category || mongoose.model<any>('Category', CategorySchema);