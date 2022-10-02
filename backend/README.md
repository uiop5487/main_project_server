## 채소마켓

### 프로젝트에 대한 설명
누구나 판매와 구매를 할 수 있는 채소 마켓

### 배포 주소
```
https://tthh12.shop/graphql
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
<img src="https://user-images.githubusercontent.com/96868951/193450061-08d6866a-113f-4dbd-afd7-ed3ff7e550d6.png"/>

### 파이프라인

<img src="https://user-images.githubusercontent.com/96868951/193450021-c7f2cbab-5078-46ba-8080-81b8fd43cd2f.png"/>

### API 명세서
<img src="https://user-images.githubusercontent.com/96868951/193449968-2e9be0d8-e7ad-4c24-9ed9-d1fc7a172983.png"/>

### 프로젝트 실행
```
1. 레포지토리 포크
2. Git clone
3. docker-compose build
4. docker-compose up
```
### 폴더구조
```
main-project
├── Dockerfile
├── Dockerfile.dev
├── README.md
├── docker-compose.dev.yaml
├── docker-compose.prod.yaml
├── docker-compose.yaml
├── elk
│   └── logstash
│       ├── logstash.conf
│       ├── logstash.dev.conf
│       ├── mysql-connector-java-8.0.28.jar
│       └── template.json
├── gcp-bucket-keyfile.json
├── nest-cli.json
├── package-lock.json
├── package.json
├── src
│   ├── api
│   │   ├── auths
│   │   │   ├── auths.controller.ts
│   │   │   ├── auths.module.ts
│   │   │   ├── auths.resolver.ts
│   │   │   └── auths.service.ts
│   │   ├── buyProduct
│   │   │   ├── buyProducts.service.ts
│   │   │   └── entities
│   │   │       └──  buyProduct.entity.ts
│   │   ├── files
│   │   │   ├── files.module.ts
│   │   │   ├── files.resolver.ts
│   │   │   └── files.service.ts
│   │   │
│   │   ├── iamport
│   │   │   └── iamport.service
│   │   │
│   │   ├── payments
│   │   │   └── entities
│   │   │       └── payments.entity.ts
│   │   │
│   │   ├── paymentDetails
│   │   │   └── entities
│   │   │       └── paymentDetails.entity.ts
│   │   ├── pickedProducts
│   │   │   ├── entities
│   │   │   │   └── pickedProduct.entity.ts
│   │   │   └── pickedProducts.service.ts
│   │   ├── pointCharge
│   │   │   ├── entities
│   │   │   │   └── pointCharge.entity.ts
│   │   │   ├── pointCharge.module.ts
│   │   │   ├── pointCharge.resolver.ts
│   │   │   └── pointCharge.service.ts
│   │   ├── products
│   │   │   ├── dto
│   │   │   │   ├── updateProduct.input.ts
│   │   │   │   └── createProduct.input.ts
│   │   │   ├── entities
│   │   │   │   └── product.entity.ts
│   │   │   ├── products.module.ts
│   │   │   ├── products.resolver.ts
│   │   │   └── products.service.ts
│   │   ├── productImage
│   │   │   ├── entities
│   │   │   │   └── productImage.entity.ts
│   │   │   └── productImage.service.ts
│   │   ├── productInquiry
│   │   │   ├── entities
│   │   │   │   └── productInquiry.entity.ts
│   │   │   ├── productInquiry.module.ts
│   │   │   ├── productInquiry.resolver.ts
│   │   │   └── productInquiry.service.ts
│   │   ├── productInquiryAnswers
│   │   │   ├── entities
│   │   │   │   └── productInquiryAnswer.entity.ts
│   │   │   ├── productInquiryAnswers.module.ts
│   │   │   ├── productInquiryAnswers.resolver.ts
│   │   │   └── productInquiryAnswers.service.ts
│   │   ├── productMainCategory
│   │   │   └── entities
│   │   │       └── productMainCategory.entity.ts
│   │   ├── productMainType
│   │   │   └── entities
│   │   │       └── productMainType.entity.ts
│   │   ├── productsReview
│   │   │   ├── dto
│   │   │   │   ├── updateReview.input.ts
│   │   │   │   └── createReview.input.ts
│   │   │   ├── entities
│   │   │   │   └── productsReview.entity.ts
│   │   │   ├── productsReview.module.ts
│   │   │   ├── productsReview.resolver.ts
│   │   │   └── productsReview.service.ts
│   │   ├── productReviewImage
│   │   │   └── entities
│   │   │       └── productReviewImage.entity.ts
│   │   ├── productSubCategory
│   │   │   └── entities
│   │   │       └── productSubCategory.entity.ts
│   │   ├── productSubType
│   │   │   └── entities
│   │   │       └── productSubType.entity.ts
│   │   ├── productTags
│   │   │   └── entities
│   │   │       └── productTags.entity.ts
│   │   ├── sellers
│   │   │   ├── dto
│   │   │   │   ├── updateSeller.input.ts
│   │   │   │   └── createSeller.input.ts
│   │   │   ├── entities
│   │   │   │   └── seller.entity.ts
│   │   │   ├── sellers.module.ts
│   │   │   ├── sellers.resolver.ts
│   │   │   └── sellers.service.ts
│   │   ├── users
│   │   │   ├── dto
│   │   │   │   ├── updateUser.input.ts
│   │   │   │   └── createUser.input.ts
│   │   │   ├── entities
│   │   │   │   └── user.entity.ts
│   │   │   ├── users.module.ts
│   │   │   ├── users.resolver.ts
│   │   │   └── users.service.ts
│   ├── app.module.ts
│   ├── commons
│   │   ├── auth
│   │   │   ├── gql-auth.guard.ts
│   │   │   ├── jwt-access.strategy.ts
│   │   │   ├── jwt-refresh.strategy.ts
│   │   │   ├── jwt-social-google.strategy.ts
│   │   │   ├── jwt-social-kakao.strategy.ts
│   │   │   └── jwt-social-naver.strategy.ts
│   │   ├── graphql
│   │   │   └── schema.gql
│   │   └── types
│   │       └── type.ts
│   └── main.ts
├── tsconfig.build.json
├── tsconfig.json
└── yarn.lock
```

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
