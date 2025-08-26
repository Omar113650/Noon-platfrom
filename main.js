import { Clerk } from "@clerk/clerk-js";

// تهيئة التطبيق
const initApp = async () => {
  try {
    const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
    
    if (!clerkPubKey) {
      console.error('VITE_CLERK_PUBLISHABLE_KEY is not defined');
      document.getElementById("app").innerHTML = `
        <div style="text-align: center; padding: 20px;">
          <h2>خطأ في الإعداد</h2>
          <p>يرجى التأكد من إعداد متغير البيئة VITE_CLERK_PUBLISHABLE_KEY</p>
        </div>
      `;
      return;
    }

    const clerk = new Clerk(clerkPubKey);
    await clerk.load();

    if (clerk.isSignedIn) {
      document.getElementById("app").innerHTML = `
        <div style="text-align: center; padding: 20px;">
          <h2>مرحباً بك في منصة Noon</h2>
          <div id="user-button"></div>
        </div>
      `;
      clerk.mountUserButton(document.getElementById("user-button"));
    } else {
      document.getElementById("app").innerHTML = `
        <div style="text-align: center; padding: 20px;">
          <h2>مرحباً بك في منصة Noon</h2>
          <p>يرجى تسجيل الدخول للمتابعة</p>
          <div id="sign-in"></div>
        </div>
      `;
      clerk.mountSignIn(document.getElementById("sign-in"));
    }
  } catch (error) {
    console.error('Error initializing app:', error);
    document.getElementById("app").innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <h2>خطأ في التطبيق</h2>
        <p>حدث خطأ أثناء تحميل التطبيق</p>
      </div>
    `;
  }
};

// تشغيل التطبيق
initApp(); 


