import mongoose, { Schema, model } from 'mongoose';

interface reportType {
  identity?: string;
  description?: string;
  organizationType?: string[];
  organizationTypeFreeField?: string;
  numberOfEmployees?: string;
  valueDate?: string;
  dateRangeState?: string;
  datePeriod?: string;
  location?: string;
  locationOnline?: string;
  stadtteil?: string;
  formOfQueerphobia?: string[];
  otherformOfQueerphobiaFreeField?: string;
  typeOfDiscriminationFreeField?: string;
  typeOfDiscrimination?: string[];
  formOfDisc?: string;
  formOfDiscYes?: string[];
  formOfDiscYesFreeField?: string;
  haveYouReported?: string;
  haveYouReportedYes?: string[];
  haveYouReportedYesFreeField1?: string;
  haveYouReportedYesFreeField2?: string;
  gender?: string[];
  genderFreeField?: string;
  age?: string;
  sexualOrientation?: string[];
  sexualOrientationFreeField?: string;
  status?: string
  category?: any[]
  updatereport?: string
  
}

const ReportSchema = new Schema<reportType>({
  identity: { type: String, required: false },
  description: { type: String, required: false },
  organizationType: { type: Array<string>, required: false },
  organizationTypeFreeField: { type: String, required: false },
  numberOfEmployees: { type: String, required: false },
  valueDate: { type: String, required: false },
  dateRangeState: { type: String, required: false },
  datePeriod: { type: String, required: false },
  location: { type: String, required: false },
  locationOnline: { type: String, required: false },
  stadtteil: { type: String, required: false },
  formOfQueerphobia: { type: Array<string>, required: false },
  otherformOfQueerphobiaFreeField: { type: String, required: false },
  typeOfDiscriminationFreeField: { type: String, required: false },
  typeOfDiscrimination: { type: Array<string>, required: false },
  formOfDisc: { type: String, required: false },
  formOfDiscYes: { type: Array<string>, required: false },
  formOfDiscYesFreeField: { type: String, required: false },
  haveYouReported: { type: String, required: false },
  haveYouReportedYes: { type: Array<string>, required: false },
  haveYouReportedYesFreeField1: { type: String, required: false },
  haveYouReportedYesFreeField2: { type: String, required: false },
  genderFreeField: { type: String, required: false },
  gender: { type: Array<string>, required: false },
  age: { type: String, required: false },
  sexualOrientation: { type: Array<string>, required: false },
  sexualOrientationFreeField: { type: String, required: false },
  status: { type: String, required: false, default: 'pending' },
  category: { type: Array<object>, required: false },
  updatereport: { type: Schema.Types.ObjectId, ref: 'UpdateReport', required: false }
  // category: [
  //   { type: Object, required: false }
  // ],
});
ReportSchema.set('timestamps', true);
export const Report =
  mongoose.models.Report || mongoose.model<reportType>('Report', ReportSchema);
// export const User = mongoose.models.User || mongoose.model('User', user)
