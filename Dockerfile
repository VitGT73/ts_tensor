FROM mcr.microsoft.com/playwright:v1.42.1-jammy

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# COPY the needed files to the app folder in Docker image
# COPY package.json /app/
# COPY POM/ /app/POM
# COPY lib/ /app/lib
# COPY tests/ /app/tests/
# COPY tsconfig.json /app/
# COPY config.toml /app/
# COPY .env ./
# COPY playwright.config.ts ./
# Install dependencies
RUN npm ci

# Install Playwright browser binaries with all dependencies.
RUN npx playwright install --with-deps

# Copy the rest of the application files
COPY . .

# Define the default command to run when the container starts.
CMD ["npm", "test"]

# Set the entry point for the container
# CMD ["npx", "playwright", "test"]
