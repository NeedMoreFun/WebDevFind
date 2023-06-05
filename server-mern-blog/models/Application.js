import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
        message: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    }
)

export default mongoose.model('Application', applicationSchema)