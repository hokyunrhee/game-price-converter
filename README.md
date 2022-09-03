# game price converter

PC 게임 가격을 특정 통화로 제공하는 API입니다. [Serverless framework](https://www.serverless.com/)을 이용하여 만들었습니다.

### Project Architecture

![architecture](https://user-images.githubusercontent.com/51858583/188274489-9ef083b0-e21b-49d5-84a7-329fb14e782f.png)

### Project structure

프로젝트 코드 베이스는 대부분 `src` 폴더 안에 있습니다. 해당 폴더는 다음과 같이 구성되어 있습니다.

- `functions` - 람다 함수
- `libs` - 람다 함수 간에 재사용되는 코드
- `types` - 데이터 타입

```
.
├── serverless
│   └── functions                    # Lambda Serverless configuration
│
├── src
│   ├── functions
│   │   └── convert-game-price.ts    # Lambda source code
│   │
│   └── libs
│       └── api-gateway.ts           # API Gateway specific helpers
│
├── package.json
├── serverless.ts                    # Serverless service file
├── tsconfig.json                    # Typescript compiler configuration
└── tsconfig.paths.json              # Typescript paths
```
