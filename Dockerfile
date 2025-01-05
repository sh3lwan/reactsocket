# Stage 1: Build the React app
FROM node:20 as build

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:1.25-alpine

# Copy the built app from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Replace the default Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
