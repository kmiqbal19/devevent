import { Schema, model, models, Document, Types } from 'mongoose';

export interface IMessage extends Document {
  email: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
    message: {
      type: String,
      required: [true, 'Message content is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = models.Message || model<IMessage>('Message', MessageSchema);

export default Message;
