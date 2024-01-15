import { Schema, model } from "mongoose";

interface ICompany {
  name: string;
}

export const CompanySchema = new Schema<ICompany>({
  name: { type: String, required: true },
});

export const CompanyModel = model<ICompany>("Company", CompanySchema);
