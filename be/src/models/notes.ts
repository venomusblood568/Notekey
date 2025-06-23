import mongoose, { Schema, Document } from "mongoose";

export interface INote extends Document {
  title: string;
  user?: mongoose.Types.ObjectId;
}

const NoteSchema = new Schema<INote>(
  {
    title: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: false },
  },
  { timestamps: true }
);

export default mongoose.model<INote>("Note", NoteSchema);
