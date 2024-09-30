import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  notes: { type: String, required: false },
});

export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
