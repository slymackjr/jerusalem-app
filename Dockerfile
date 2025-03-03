# Use Node.js image to build the React app
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code and build the app
COPY . .
RUN npm run build

# Use NGINX to serve the built React app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

#Copy environment variables
COPY .env /usr/share/nginx/html/.env

# Set correct permissions for Nginx to read the files
RUN chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
