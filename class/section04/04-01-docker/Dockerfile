# 하나하나 입력하는 방식
# FROM ubuntu:22.04

# RUN sudo apt install nodejs
# RUN sudo npm instll -g yarn

# 리눅스, nodejs, npm, yarn이 모두 깔려잇음

FROM node:14

# 도커 컴퓨터 안으로 복사하기
COPY ./index.js /index.js

# 도커 안에서 index.js 실행
CMD node index.js