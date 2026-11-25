-- خطة البحث قبل إضافة الفهرس
EXPLAIN ANALYZE
SELECT id, title
FROM books
WHERE title = 'Dune';

-- إنشاء فهرس على عنوان الكتاب
CREATE INDEX books_title_idx ON books (title);

-- خطة البحث بعد إضافة الفهرس
EXPLAIN ANALYZE
SELECT id, title
FROM books
WHERE title = 'Dune';