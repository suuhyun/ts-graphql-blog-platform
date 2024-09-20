# Node.js 이미지 사용
FROM node:16.13

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY ./package*.json ./

# before copy source code
RUN if [ "$NODE_ENV" = "development" ]; then npm install -g nodemon && npm install; else npm install; fi

# wait-for-it.sh 스크립트 추가 및 실행 권한 부여
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

COPY ./prisma ./prisma

# Prisma Client 생성
RUN npx prisma generate
# copy source code
COPY . .

# typescript to javascript
RUN if [ "$NODE_ENV" != "development" ]; then npm run build; fi

# when container starts
CMD ["/wait-for-it.sh", "db:5432", "--", "sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then npm run dev; else npm run start; fi"]
