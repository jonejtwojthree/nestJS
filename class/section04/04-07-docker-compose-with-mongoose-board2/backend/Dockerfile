FROM node:14

COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/

WORKDIR /myfolder/
RUN yarn install

COPY . /myfolder/

# 도커 안에서 index.js 실행
CMD yarn start:dev