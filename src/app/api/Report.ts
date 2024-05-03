import mongoose, { Schema, model } from 'mongoose';

interface reportType {
  periodOfTime?: string;

  gender?: string;
  age?: string;
  genderFreeField?: string;
  organizationType?: string[];
  numberOfEmployees?: string;
  organizationTypeFreeField?: string;
  happenedOnlineFreeField?: string;
  PeriodOfTimeFreeField?: string;
  locationOnline?: string;
  identity?: string;
  dateRangeState?: any;
  valueDate?: any;

  location?: any;

  happenedOverALongPeriodOfTime?: string;

  manifestationOfDiscrimination?: string;
  manifestationOfDiscriminationFreeField?: string;
  otherFormOfDisc?: string;
  otherFormOfDiscFreeField?: string;
  otherFormOfDiscYes?: string;
  haveYouReported?: string;
  haveYouReportedYes?: string;
  haveYouReportedYesFreeField?: string;
  description?: string;
  agreementForReportingOnBehalf?: string;
  status?: string;
  category?: any[];
}

const ReportSchema = new Schema<reportType>({
  happenedOnlineFreeField: { type: Array<string>, required: false },
  organizationType: { type: Array<string>, required: false },
  organizationTypeFreeField: { type: String, required: false },
  otherFormOfDisc: { type: String, required: false },
  identity: { type: String, required: false },
  description: { type: String, required: false },
  otherFormOfDiscFreeField: { type: String, required: false },
  otherFormOfDiscYes: { type: String, required: false },
  numberOfEmployees: { type: String, required: false },
  valueDate: { type: String, required: false },
  dateRangeState: { type: String, required: false },

  location: { type: String, required: false },
  locationOnline: { type: String, required: false },
  agreementForReportingOnBehalf: { type: String, required: false },

  manifestationOfDiscrimination: { type: String, required: false },
  manifestationOfDiscriminationFreeField: { type: String, required: false },

  happenedOverALongPeriodOfTime: { type: String, required: false },
  haveYouReported: { type: String, required: false },
  haveYouReportedYes: { type: String, required: false },
  haveYouReportedYesFreeField: { type: String, required: false },
  PeriodOfTimeFreeField: { type: String, required: false },
  periodOfTime: { type: String, required: false },

  genderFreeField: { type: String, required: false },
  gender: { type: String, required: false },
  age: { type: String, required: false },
  status: { type: String, required: false, default: 'pending' },
  category: { type: Array<object>, required: false },
});
ReportSchema.set('timestamps', true); 

export const Report =
  mongoose.models.Report || mongoose.model<reportType>('Report', ReportSchema);
// export const User = mongoose.models.User || mongoose.model('User', user)
