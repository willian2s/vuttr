import config from 'config';
import mongoose, { Mongoose } from 'mongoose';

const mongoUrl = config.get('App.database.mongoUrl');

export const connect = async (): Promise<Mongoose> =>
  await mongoose.connect(`${mongoUrl}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

export const close = (): Promise<void> => mongoose.connection.close();
