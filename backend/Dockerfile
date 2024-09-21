FROM node:16.13

WORKDIR /app

# wait-for-it.sh 스크립트 추가
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

COPY ./package*.json ./

RUN if [ "$NODE_ENV" = "development" ]; then \
        npm install -g nodemon && npm install; \
    else \
        npm install; \
    fi

COPY . .

# RUN npx prisma generate

# RUN if [ "$NODE_ENV" != "development" ]; then \
#         npm run build; \
#     fi

# CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then npm run dev; else npm run start; fi"]
