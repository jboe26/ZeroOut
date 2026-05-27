import mongoose from "mongoose";

const DebtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  interestRate: {
    type: Number,
    required: true,
  },
  minimumPayment: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.models.Debt || mongoose.model("Debt", DebtSchema);