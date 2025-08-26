import { createQueue } from "../utils/queue";

const emailQueue = createQueue("emailQueue");

emailQueue.process(async (job) => {
  console.log(`Sending email to ${job.data.email}...`);
});

export const addEmailJob = async (
  email: string,
  subject: string,
  message: string
) => {
  await emailQueue.add(
    "sendEmail",
    { email, subject, message },
    { attempts: 3 }
  );
};

export default emailQueue;
