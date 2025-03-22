# Outdoor Activities Feed

## 🚀 Overview

This is a React-based web application that displays a **feed of outdoor activities** with **infinite scrolling**. The app is optimized for performance using **react-virtual** and styled with **Tailwind CSS**. Users can browse activities, view image galleries using **Swiper**.

## 🛠️ Tech Stack

- **Frontend:** React (Vite) + TypeScript
- **Infinite Scrolling & Virtualization:** react-virtual
- **Styling:** Tailwind CSS
- **Image Gallery:** Swiper.js
- **Testing:** Vitest + React Testing Library
- **Infrastructure:** Terraform (AWS S3 + CloudFront)

## 📦 Installation & Setup

1. **Install dependencies**

   ```sh
   npm install
   # or
   yarn install
   ```

2. **Start the development server**

   ```sh
   npm run dev
   ```

   The app will be available at `http://localhost:5173/`

## 🏗️ Infrastructure Setup (Terraform)

If deploying the infrastructure using Terraform:

```sh
cd aws-deploy
terraform init
terraform apply
```

## 🧪 Running Tests

The app is tested with **Vitest** and **React Testing Library**. Run the tests using:

```sh
npm run test
```

