import { Schema, model } from "mongoose";

export interface IProject {
  name: string;
  description: string;
  imageUrl?: string;
  length: number;
  shortDescription: string;
  slug: string;
  companyId: string;
  technologiesIds: Array<string>;
}

export const projectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  companyId: { type: String, required: true },
  technologiesIds: { type: [String], required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  length: { type: Number, required: true },
  shortDescription: { type: String, required: true },
  slug: { type: String, required: true },
});

export const ProjectModel = model<IProject>("Project", projectSchema);
