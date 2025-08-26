import { createQueue } from "../utils/queue";
import { sendEmail } from "../utils/emailServices";

const orderQueue = createQueue("orderQueue");

orderQueue.process(async (job) => {
  const { orderId, userEmail } = job.data;

  try {
    await sendEmail({
      to: userEmail,
      subject: "تم استلام طلبك - Noon",
      text: `مرحباً ${userEmail}, لقد تم استلام طلبك رقم ${orderId}`,
      html: `<p>مرحباً <strong>${userEmail}</strong>، لقد استلمنا طلبك رقم <strong>${orderId}</strong>.</p>`,
    });
    return Promise.resolve();
  } catch (error) {
    console.error("Error sending email for order:", orderId, error);
    throw error;
  }
});

export default orderQueue;



// import orderQueue from "../utils/queue";
// import { sendEmail } from "../utils/emailServices";

// console.log("✅ Order worker is running...");

// orderQueue.process(async (job) => {
//   const { orderId, userEmail } = job.data;

//   console.log("Processing job:", job.data);

//   try {
//     await sendEmail({
//       to: userEmail,
//       subject: "تم استلام طلبك - Noon",
//       text: `مرحباً ${userEmail}, لقد تم استلام طلبك رقم ${orderId}`,
//       html: `<p>مرحباً <strong>${userEmail}</strong>، لقد استلمنا طلبك رقم <strong>${orderId}</strong>.</p>`,
//     });
//     console.log(`Email sent for order ${orderId}`);
//     return Promise.resolve();
//   } catch (error) {
//     console.error("Error sending email for order:", orderId, error);
//     throw error;
//   }
//   ,{
//     // هذا الخيار يحذف الـ job بعد اكتمال التنفيذ
//   removeOnComplete: true,
//   removeOnFail: true,
//   }
// });
