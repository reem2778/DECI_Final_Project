# 📸 Image API Server

A Node.js + TypeScript server that provides a REST API for uploading, resizing, and generating placeholder images. Built with Express, Sharp, Multer, and fully configured with ESLint, Prettier, and unit tests.

---

## 🚀 Features

- ✅ Upload images (`/api/upload`)
- 📐 Resize existing images (`/api/resize`)
- 🖼️ Generate placeholder images (`/api/placeholder`)
- 📂 List all uploaded images (`/api/images`)
- 🔧 TypeScript for type safety
- 🧹 Linting with ESLint and formatting with Prettier
- 🧪 Unit testing with Jasmine and Supertest

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Language:** TypeScript
- **Image Processing:** Sharp
- **File Uploads:** Multer
- **Testing:** Jasmine, Supertest
- **Linting/Formatting:** ESLint, Prettier

---

## ▶️ Start Server

- **npm run build**    # Compile TypeScript
- **npm run start**   # Start server

---

## 📡 API Endpoints

- **🔼 Upload an Image**
- POST /api/upload

- **🖼️ Resize an Image**
- GET /api/resize?image=<filename>&width=200&height=200

- **🏞️ Generate Placeholder**
- GET /api/placeholder?width=100&height=100

- **📁 List Uploaded Images**
-GET /api/images

---

## ✅ How to Run

# 1. Install dependencies
- npm install

# 2. Run lint 
- npm run lint

# 3. Format code
- npm run format

# 4. Run tests
- npx jasmine --config=jasmine.json --verbose (run in explicit way)

# 5. Build the project
- npm run build

# 6. Start the server
- npm start


## 🔒 Notes

- Uploaded images go to: public/images.

- Resized/placeholder images go to: public/generated.

- The dist/ folder is compiled JS output and is ignored by ESLint and Prettier.

---

## 📌 License
- MIT – feel free to use and modify.

---

- Let me know if you want it tailored further (e.g., client-side info, deployment, environment variables).