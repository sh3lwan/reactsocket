# Frontend Project (Vite + React)

This is the frontend for the application, built using [Vite](https://vitejs.dev/) for fast development and optimized builds.

## 🚀 Features
- ⚡ Lightning-fast development with Vite
- 🎨 Styled with Tailwind CSS
- 🌍 API integration with a Go backend
- 🔥 Hot module replacement (HMR)

## 📦 Installation

Make sure you have **Node.js** (>=16) installed.

```sh
# Clone the repository
git clone https://github.com/your-username/your-project.git
cd your-project/frontend

# Install dependencies
yarn install # or npm install
```

## 🛠️ Development

To start the development server:
```sh
yarn dev # or npm run dev
```
The app will be available at [http://localhost:5173](http://localhost:5173).

## 🏗️ Build for Production

To create an optimized production build:
```sh
yarn build # or npm run build
```
The output will be in the `dist/` folder.

## 🐳 Docker Setup

To run the frontend inside a Docker container:
```sh
docker build -t my-frontend .
docker run -p 80:80 my-frontend
```

Or using **Docker Compose**:
```sh
docker-compose up -d
```

## 🔧 Configuration
Environment variables can be stored in a `.env` file at the project root:
```env
APP_PORT=80
VITE_API_URL=https://chat.sh3lwan.dev/v1/api
VITE_BASE_URL=https://chat.sh3lwan.dev/v1
VITE_WEBSOCKET_URL=wss://chat.sh3lwan.dev/ws
```

## 🔍 Linting & Formatting
Ensure code consistency with:
```sh
yarn lint   # Run ESLint
yarn format # Format with Prettier
```

## 🚀 Deployment
For production, deploy the `dist/` folder to a static host like **Vercel, Netlify, or DigitalOcean Spaces**.

Alternatively, using Docker Compose:
```sh
docker-compose up -d
```

## 🤝 Contributing
Feel free to open issues and pull requests.

## 📜 License
This project is licensed under the MIT License.
