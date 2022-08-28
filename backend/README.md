## 채소마켓

### 프로젝트에 대한 설명
누구나 판매와 구매를 할 수 있는 채소 마켓

### 배포 주소
```
https://tthh12.shop
```
### 기술 스택
<div>
<img src="https://techstack-generator.vercel.app/ts-icon.svg" alt="icon" width="72" height="72" />
<img src="https://techstack-generator.vercel.app/js-icon.svg" alt="icon" width="72" height="72" />
<img src="https://user-images.githubusercontent.com/96868951/187032229-605756c5-0f73-4ef7-972a-5e00988411a9.png" alt="icon" width="72" height="72" />
<img alt="NestJS" src="https://user-images.githubusercontent.com/96868951/187032538-a3c2656f-a592-4fab-9579-856bff0fb5cd.png" width="60" height="60"/>
<img src="https://techstack-generator.vercel.app/mysql-icon.svg" alt="icon" width="72" height="72" />
<img src="https://techstack-generator.vercel.app/graphql-icon.svg" alt="icon" width="72" height="72" />
<img src="https://techstack-generator.vercel.app/docker-icon.svg" alt="icon" width="72" height="72" />
<img src="https://user-images.githubusercontent.com/96868951/187036678-55edd632-0600-43f7-8585-d33171943c23.png" width="72" height="72" />
<img width="72" height="72" alt="GKE" src="https://user-images.githubusercontent.com/96868951/187037131-bf7ad8dc-4b51-4585-92f6-bb2a5fe829c8.png">
</div>

### ERD
<img src="https://user-images.githubusercontent.com/96868951/187064280-287989d7-90a2-4b26-8c74-f1b6bd4abd06.png"/>

### 파이프라인

### API 명세서

### 프로젝트 실행
```
1. 레포지토리 포크
2. Git clone
3. docker-compose build
4. docker-compose up
```
### 폴더구조
<div>
<img src="https://user-images.githubusercontent.com/96868951/187064577-8b2611fa-a6d5-4e47-8fc4-68ab31486d49.png"/>
</div>

elk: 엘라스틱 스택 설정파일 폴더

src: 소스코드 폴더

test: 테스트코드 폴더

app.module.ts: module 설정 및 주입을 위한 파일

main.ts: 실핼 및 프로젝트 설정을 위한 파일

apis: 실제 api 로직을 모아놓은 폴더

commons: 공통으로 사용되는 로직을 모아놓은 폴더

### env 설정
```
DATABASE_TYPE=mysql
DATABASE_HOST=데이터베이스 ip 또는 이름
DATABASE_PORT=3306
DATABASE_USERNAME=아이디 ex) root
DATABASE_PASSWORD=비밀번호 ex) root
DATABASE_DATABASE=데이터베이스 이름
GOOGLE_CLIENT_ID=소셜로그인을 위한 클라이언트 ID
GOOGLE_CLIENT_SECRET=소셜로그인을 위한 클라이언트 secret
KAKAKO_CLIENT_ID=카카오 소셜로그인을 위한 클라이언트 ID
KAKAKO_CLIENT_SECRET=카카오 소셜로그인을 위한 클라이언트 secret
NAVER_CLIENT_ID=네이버 소셜로그인을 위한 클라이언트 ID
NAVER_CLIENT_SECRET=네이버 소셜로그인을 위한 클라이언트 secret
IMP_KEY=결제를 위한 아임포트 KEY
IMP_SECRET=결제를 위한 아임포트 secret
```
