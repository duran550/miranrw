import mongoose, { Schema, model } from 'mongoose';

const UpdateReportSchema = new Schema<any>({
  description: { type: String, required: false },
  status: { type: String, required: false, default: 'pending' },
  category: { type: Array<object>, required: false },
});
UpdateReportSchema.set('timestamps', true);
export const UpdateReport =
  mongoose.models.UpdateReport || mongoose.model<any>('UpdateReport', UpdateReportSchema);