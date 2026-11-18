# Task Management Starter

مشروع بسيط لإدارة المهام باستخدام **Node.js** و**JavaScript (ESM)**، والبيانات محفوظة في الذاكرة فقط.

## المتطلبات
- Node.js 18 أو أحدث (لا توجد حزم إضافية، لا داعي لـ `npm install`).

## التشغيل
```bash
cd task-management-starter
npm start
```

## الملفات
```
task-management-starter/
├── package.json                      # "type": "module" + سكربت npm start
├── .gitignore
├── README.md
└── src/
    ├── index.js                      # نقطة البداية: يشغّل التجارب ويطبع النتائج
    └── modules/
        ├── users/users.service.js    # المستخدمون: تخزين في الذاكرة + البحث بالـ id
        └── tasks/tasks.service.js    # المهام: الإضافة مع التحقق + العرض
```

- **Users module**: يحتوي مستخدمَين جاهزَين (`id: 1` و`id: 2`) ويوفّر `listUsers()` و`findUserById(id)`.
- **Tasks module**: يوفّر `addTask({ title, userId })` و`listTasks()`، ويستخدم `findUserById` من Users للتحقق من وجود المستخدم.

## قواعد التحقق
- العنوان مطلوب؛ العنوان الفارغ أو المكوّن من مسافات فقط يُرفض.
- يجب أن يكون `userId` لمستخدم موجود، وإلا تُرفض المهمة.

## التجارب ونتيجتها
عند تشغيل `npm start` ينفّذ `src/index.js` أربع تجارب:

| التجربة | المدخلات | النتيجة |
|---|---|---|
| إضافة صحيحة | `"Write README"`, `userId: 1` | ✔ تمت الإضافة |
| إضافة صحيحة | `"Review code"`, `userId: 2` | ✔ تمت الإضافة |
| عنوان فارغ | `"   "`, `userId: 1` | ✘ `Task title is required.` |
| مستخدم غير موجود | `"Ghost task"`, `userId: 99` | ✘ `User with id 99 does not exist.` |

ثم يعرض قائمة المهام، وفيها المهمتان الصحيحتان فقط.

## ملاحظات
- البيانات تُحذف عند انتهاء التشغيل لأنها في الذاكرة.
- لا يوجد HTTP server ولا قاعدة بيانات، عن قصد، لإبقاء المشروع بسيطًا.

## استخدام AI
استُخدم Claude Code (مساعد AI) لإنشاء هيكل المشروع وكتابة الكود وهذا الملف، ثم تشغيل المشروع للتأكد من نجاح الإضافة والعرض ورفض الحالتين الخاطئتين. تمت مراجعة الناتج وفهمه قبل التسليم.
