import mongoose, { Schema, model } from 'mongoose';

const CategoryOptionSchema = new Schema<any>({
    name: { type: String, required: false },
    category: { type: Schema.Types.ObjectId, ref: 'Category' }
    
  },
  {
    timestamps: true,
  });
  export const CategoryOption =
    mongoose.models.CategoryOption || mongoose.model<any>('CategoryOption', CategoryOptionSchema);