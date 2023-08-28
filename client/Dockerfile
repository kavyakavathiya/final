# Base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app-frontend

# Copy package.json and package-lock.json
COPY package.json .
# Install dependencies
RUN npm i --only=production

# Copy application code
COPY . .

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm","start"]

