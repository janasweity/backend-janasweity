# Library Book API

واجب Session 4: API لإدارة كتب مكتبة باستخدام **Express 5** و**TypeScript** (ESM + NodeNext + strict)، مع تحقق من المدخلات بـ **Zod** وتخزين في الذاكرة.

## المتطلبات
- Node.js 20 أو أحدث

## التشغيل
```bash
cd library-book-api
npm install
npm run dev        # تشغيل للتطوير مع إعادة تحميل تلقائي (tsx watch)
```
السيرفر يعمل على `http://localhost:3000` (يمكن تغييره بمتغير `PORT`).

| الأمر | الوظيفة |
|---|---|
| `npm run dev` | تشغيل من `src/` مباشرة مع watch |
| `npm run typecheck` | فحص الأنواع بدون إخراج ملفات |
| `npm run build` | ترجمة TypeScript إلى `dist/` |
| `npm start` | تشغيل النسخة المترجمة من `dist/` (بعد build) |

## هيكل المشروع
```
src/
├── server.ts                    # تشغيل السيرفر على PORT
├── app.ts                       # إعداد Express وربط الـ routes ومعالج الأخطاء
├── models/book.ts               # واجهة Book
├── schemas/book.schema.ts       # مخططات Zod لـ POST وPATCH
├── routes/books.routes.ts       # تعريف المسارات تحت /api/books
├── controllers/books.controller.ts  # قراءة الطلب، التحقق، وإرسال الرد
├── services/books.service.ts    # منطق العمل والتخزين في الذاكرة
├── errors/http-error.ts         # خطأ مخصص يحمل status code
└── middleware/error-handler.ts  # معالج 404 ومعالج أخطاء مركزي
```

**تدفق الطلب:** Route → Controller (يتحقق بـ Zod) → Service (يعدّل البيانات) → الرد.
أي خطأ يُرمى في أي طبقة يصل تلقائيًا إلى `errorHandler`، لأن Express 5 يمرّر الأخطاء إليه.

## نموذج Book
```ts
{ id: number; title: string; author: string; genre: string; available: boolean }
```
يبدأ التطبيق بكتابين: `id: 1` (Clean Code) و`id: 2` (Dune).

## العمليات

| Method | Path | الوصف | نجاح |
|---|---|---|---|
| GET | `/api/books` | عرض كل الكتب | 200 |
| GET | `/api/books/:id` | عرض كتاب واحد | 200 |
| POST | `/api/books` | إضافة كتاب | 201 |
| PATCH | `/api/books/:id` | تعديل جزئي | 200 |
| DELETE | `/api/books/:id` | حذف كتاب | 204 |

### قواعد التحقق
- **POST**: يجب إرسال `title` و`author` و`genre` كنصوص غير فارغة. الحقل `available` اختياري (قيمته الافتراضية `true`).
- **PATCH**: كل الحقول اختيارية، لكن يجب إرسال حقل واحد على الأقل.
- في الطلبين تُرفض أي حقول غير معروفة، ولا يمكن إرسال `id` أو تعديله.

### الأخطاء
| الحالة | Status | مثال الرد |
|---|---|---|
| فشل التحقق | 400 | `{"error":"Validation failed","details":[{"field":"title","message":"title cannot be empty"}]}` |
| id غير رقمي | 400 | `{"error":"id must be a positive integer"}` |
| JSON غير صالح | 400 | `{"error":"Invalid JSON body"}` |
| كتاب غير موجود | 404 | `{"error":"Book with id 9 not found"}` |
| مسار غير موجود | 404 | `{"error":"Route GET /nope not found"}` |
| خطأ غير متوقع | 500 | `{"error":"Internal server error"}` |

## أمثلة Postman
في طلبات POST وPATCH: اختر **Body → raw → JSON** (وهذا يضيف `Content-Type: application/json` تلقائيًا).

**1. عرض كل الكتب**
```
GET http://localhost:3000/api/books
```

**2. عرض كتاب بالـ id**
```
GET http://localhost:3000/api/books/1
```

**3. إضافة كتاب**
```
POST http://localhost:3000/api/books
```
```json
{ "title": "The Hobbit", "author": "J.R.R. Tolkien", "genre": "Fantasy" }
```
الرد `201`:
```json
{ "id": 3, "title": "The Hobbit", "author": "J.R.R. Tolkien", "genre": "Fantasy", "available": true }
```

**4. تعديل جزئي**
```
PATCH http://localhost:3000/api/books/3
```
```json
{ "available": false }
```

**5. حذف كتاب**
```
DELETE http://localhost:3000/api/books/3
```
الرد `204` بدون body.

**أمثلة على حالات الرفض**
- `POST /api/books` مع `{ "title": "", "author": 123 }` يعيد `400` مع تفاصيل لكل حقل.
- `PATCH /api/books/1` مع `{}` يعيد `400` (`Provide at least one field to update`).
- `GET /api/books/999` يعيد `404`.
- `GET /api/books/abc` يعيد `400`.

> البيانات محفوظة في الذاكرة، لذلك تعود إلى الكتابين الأوليين عند كل إعادة تشغيل.

## استخدام AI

استخدمت Claude Code لإنشاء المشروع وإعداد TypeScript، وكتابة المسارات ومعالجات الطلبات والخدمات، والتحقق من المدخلات باستخدام Zod، ومعالجة الأخطاء. ساعدني أيضًا في كتابة README، وشغّل فحص الأنواع والبناء واختبر الطلبات بسكربت مؤقت.

شغّلت المشروع بنفسي واختبرت العمليات الخمس في Postman: عرض كل الكتب، عرض كتاب واحد، إضافة كتاب، تعديله، وحذفه. تأكدت أن طلب الإضافة بعنوان فارغ وطلب التعديل بدون حقول يرجعان `400 Bad Request`، وأن طلب الكتاب بعد حذفه يرجع `404 Not Found`.