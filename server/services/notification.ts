import Notification from "../model/notification";

import nodeMailer from "nodemailer";

export const createNotification = async (
  title: string,
  content: Array<string>
) => {
  try {
    let newNotification = new Notification();
    let inputedNotification = {
      title: title,
      content: content,
    };
    newNotification.notifications.push(inputedNotification);

    newNotification.save();

    return newNotification;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const checkNotification = async () => {
  try {
    const notification = await Notification.find();
    return notification;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
