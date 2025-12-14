# Use the official Apify Node.js + Puppeteer + Chrome image
# This comes with all necessary system dependencies pre-installed
FROM apify/actor-node-puppeteer-chrome:18

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Compile TypeScript
RUN npm run build:ts

# Run the actor
# "npm run scrape" is our entry point, but for an Actor we typically use "start"
CMD [ "npm", "start" ]
