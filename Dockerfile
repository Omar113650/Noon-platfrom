# 1- نجيب صورة Node.js رسمية
FROM node:20-alpine

# 2- نحدد مجلد العمل داخل الكونتينر
WORKDIR /usr/src/app

# 3- ننسخ package.json و package-lock.json (لو موجود)
COPY package*.json ./

# 4- نثبت الباكدجات
RUN npm install

# 5- ننسخ باقي ملفات المشروع
COPY . .

# 6- نعمل build للـ TypeScript تثبيت الباكادج كلها 
RUN npm run build

# 7- نعرّض البورت اللي السيرفر بيستخدمه
EXPOSE 8000

# 8- نحدد أمر التشغيل
CMD ["npm", "run","dev"]
