import mongoose from 'mongoose';
const transactionSchema = new mongoose.Schema({
     studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'student',
          required: true
     },
     amount: {
          type: Number,
          required: true
     },
     paymentId: {
          type: String,
          required: true
     },
     orderId: {
          type: String,
          required: true
     },
     status: {
          type: String,
          required: true
     },
     date: {
          type: Date,
          default: Date.now
     }
});
export default mongoose.model('Transaction', transactionSchema);
