// import admin from "firebase-admin";

// // تحميل ملف service account من Firebase
// admin.initializeApp({
//   credential: admin.credential.cert(require("../config/firebase-service.json")),
// });

// // دالة إرسال إشعار Push Notification
// export async function sendPushNotification(token: string, title: string, body: string) {
//   const message = {
//     notification: { title, body },
//     token,
//   };

//   try {
//     const response = await admin.messaging().send(message);
//     console.log("✅ Notification sent:", response);
//   } catch (error) {
//     console.error("❌ Error sending notification:", error);
//   }
// }
