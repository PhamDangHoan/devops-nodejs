# DevOps Node.js REST API

Ứng dụng REST API quản lý sản phẩm được xây dựng bằng **Node.js, Express
và PostgreSQL**, triển khai theo quy trình **CI/CD với Docker, GitHub
Actions, Docker Hub và Render**.

## 1. Mục tiêu

Project được thực hiện cho bài tập **DevOps cho ứng dụng Web Node.js**,
tập trung vào:

-   Xây dựng REST API CRUD.
-   Sử dụng PostgreSQL làm cơ sở dữ liệu.
-   Quản lý cấu hình bằng biến môi trường `.env`.
-   Đóng gói ứng dụng bằng Docker.
-   Chạy Node.js và PostgreSQL bằng Docker Compose.
-   Tự động kiểm tra code bằng ESLint và Jest.
-   Tự động build và push Docker image lên Docker Hub.
-   Tự động deploy ứng dụng lên Render sau khi CI thành công.
-   Có endpoint `/health` để kiểm tra trạng thái ứng dụng.

## 2. Công nghệ sử dụng

  Công nghệ        Vai trò
  ---------------- --------------------------------
  Node.js 22       Runtime cho backend
  Express 5        Xây dựng REST API
  PostgreSQL 17    Cơ sở dữ liệu
  pg               Kết nối Node.js với PostgreSQL
  Docker           Container hóa ứng dụng
  Docker Compose   Chạy App + PostgreSQL
  GitHub Actions   CI/CD
  ESLint           Kiểm tra chất lượng code
  Jest             Automated testing
  Supertest        Test HTTP API
  Docker Hub       Lưu trữ Docker image
  Render           Deploy production

## 3. Kiến trúc project

``` text
devops-nodejs/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── product.controller.js
│   ├── models/
│   │   └── product.model.js
│   ├── routes/
│   │   └── product.routes.js
│   ├── app.js
│   └── server.js
├── tests/
│   └── product.test.js
├── database/
│   └── init.sql
├── .github/
│   └── workflows/
│       └── ci-cd.yml
├── Dockerfile
├── .dockerignore
├── docker-compose.yml
├── .env
├── .env.example
├── .gitignore
├── eslint.config.js
├── package.json
└── README.md
```

## 4. REST API

Base URL local:

``` text
http://localhost:3000
```

  Method   Endpoint              Chức năng
  -------- --------------------- -------------------------
  GET      `/health`             Kiểm tra trạng thái API
  GET      `/api/products`       Lấy tất cả sản phẩm
  GET      `/api/products/:id`   Lấy sản phẩm theo ID
  POST     `/api/products`       Tạo sản phẩm
  PUT      `/api/products/:id`   Cập nhật sản phẩm
  DELETE   `/api/products/:id`   Xóa sản phẩm

### Ví dụ POST

``` json
{
  "name": "Laptop ASUS",
  "description": "Laptop phục vụ học tập và lập trình",
  "price": 1999.99,
  "quantity": 10
}
```

## 5. Cấu hình môi trường

Tạo `.env`:

``` env
PORT=3000
DB_HOST=localhost
DB_PORT=5433
DB_NAME=devops_nodejs
DB_USER=postgres
DB_PASSWORD=your_password
```

Không commit `.env` lên GitHub.

Khi chạy bằng Docker Compose, app kết nối PostgreSQL bằng:

``` text
DB_HOST=postgres
DB_PORT=5432
```

## 6. Chạy local

``` powershell
npm install
npm run dev
```

Production:

``` powershell
npm start
```

API:

``` text
http://localhost:3000
```

## 7. Docker Compose

Khởi động App + PostgreSQL:

``` powershell
docker compose up --build
```

Kiểm tra:

``` powershell
docker compose ps
```

Xem log:

``` powershell
docker compose logs -f
```

Dừng:

``` powershell
docker compose down
```

Xóa cả database volume:

``` powershell
docker compose down -v
```

> `docker compose down -v` sẽ xóa dữ liệu PostgreSQL trong Docker
> volume.

## 8. Database

File khởi tạo:

``` text
database/init.sql
```

Bảng chính:

``` sql
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(12, 2) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 9. Testing

ESLint:

``` powershell
npm run lint
```

Tự động sửa:

``` powershell
npm run lint:fix
```

Jest:

``` powershell
npm test
```

Test hiện có kiểm tra:

-   `GET /health`
-   `GET /api/products`

## 10. Docker

Dockerfile sử dụng multi-stage build với Node.js Alpine.

Build:

``` powershell
docker build -t devops-nodejs .
```

Run:

``` powershell
docker run --rm -p 3000:3000 --env-file .env devops-nodejs
```

## 11. CI/CD với GitHub Actions

Workflow:

``` text
.github/workflows/ci-cd.yml
```

Pipeline:

``` text
Push / Pull Request
        ↓
CI - Lint and Test
        ↓
npm ci
        ↓
PostgreSQL service
        ↓
Database initialization
        ↓
ESLint
        ↓
Jest
        ↓
CI PASS
        ↓
Docker Build
        ↓
Docker Hub
        ↓
Render Deploy Hook
        ↓
Render
```

CI chạy khi:

-   Push vào `main`.
-   Pull Request vào `main`.

CD chỉ chạy sau khi CI thành công và workflow được kích hoạt bởi push
vào `main`.

## 12. GitHub Actions Secrets

Vào:

``` text
GitHub
→ Repository
→ Settings
→ Secrets and variables
→ Actions
```

Tạo:

``` text
DOCKERHUB_USERNAME
DOCKERHUB_TOKEN
RENDER_DEPLOY_HOOK_URL
```

Không đưa token, password hoặc Render Deploy Hook vào source code.

## 13. Docker Hub

Docker image được push với:

``` text
pdhoandev/devops-nodejs:latest
```

và:

``` text
pdhoandev/devops-nodejs:<commit-sha>
```

Tag theo commit SHA giúp xác định image được tạo từ commit nào.

## 14. Deploy Render

Production gồm:

``` text
Render Web Service
+
Render PostgreSQL
```

Quy trình:

``` text
GitHub
  ↓
GitHub Actions
  ↓
CI
  ↓
Docker Build
  ↓
Docker Hub
  ↓
Render Deploy Hook
  ↓
Render Web Service
```

Trong Render, cấu hình các biến môi trường database theo PostgreSQL
production. App trong Render sử dụng hostname nội bộ của database và
port `5432`.

## 15. Kiểm tra production

Health:

``` text
https://<render-service-url>/health
```

Expected:

``` json
{
  "success": true,
  "status": "OK",
  "timestamp": "..."
}
```

Products:

``` text
https://<render-service-url>/api/products
```

Expected:

``` json
{
  "success": true,
  "data": []
}
```

hoặc danh sách sản phẩm nếu database có dữ liệu.

## 16. Git workflow

``` powershell
git status
git add .
git commit -m "feat: update product API"
git push origin main
```

Sau khi push:

``` text
GitHub
  ↓
GitHub Actions
  ↓
CI
  ↓
Docker Build
  ↓
Docker Hub
  ↓
Render
```

## 17. Troubleshooting

### PostgreSQL port

Node.js chạy trực tiếp trên Windows:

``` env
DB_HOST=localhost
DB_PORT=5433
```

Node.js chạy trong Docker Compose:

``` text
DB_HOST=postgres
DB_PORT=5432
```

### Docker

``` powershell
docker version
docker compose version
docker compose ps
docker compose logs app
docker compose logs postgres
```

### GitHub Actions

Vào:

``` text
GitHub → Actions → CI/CD
```

Kiểm tra:

``` text
CI - Lint and Test
Build, Push and Deploy
```

Nếu CI fail thì CD không được triển khai.

## 18. Kết quả

Hệ thống đã hoàn thành quy trình:

``` text
Developer
   ↓ git push
GitHub
   ↓
GitHub Actions
   ├── ESLint
   ├── Jest
   └── PostgreSQL test service
   ↓
Docker Build
   ↓
Docker Hub
   ↓
Render
   ├── Node.js API
   └── PostgreSQL
```

Các endpoint production đã kiểm tra:

``` text
GET /health              ✓
GET /api/products        ✓
POST /api/products       ✓
PUT /api/products/:id    ✓
DELETE /api/products/:id ✓
```

## 19. Tác giả

**Phạm Đăng Hoàn**
**MSS:134010124044**
**Lớp:WD1306**

Project: **DevOps cho ứng dụng Web Node.js**

Stack:

``` text
Node.js + Express
PostgreSQL
Docker
GitHub Actions
Docker Hub
Render
```
