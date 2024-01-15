import { Schema, model } from "mongoose";

interface ITechnology {
  name: string;
}

export const technologySchema = new Schema<ITechnology>({
  name: { type: String, required: true },
});

export const TechnologyModel = model<ITechnology>(
  "Technology",
  technologySchema
);
