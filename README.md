# meta-diff

### 사용법

target.js 파일을 아래와 같이 생성 후 

`npm run start` 명령어를 실행하면 `/generates` 폴더에 결과물이 생성됩니다.

```
npm run start:fetch // fetch api를 이용해 html을 가져옵니다. 
npm run start:puppeteer // puppeteer 크롤러를 이용해 html을 가져옵니다. 
```

meta 태그들은 아래와 같은 replace 로직을 거치게 되며, 오름차순으로 자동정렬됩니다.
- '/>' 는 '>' 로 대체
- `id` 속성은 제거

### target.js
```js
const target = [
    {
        url: 'https://www.miricanvas.com/',
        filename: 'homepage',
    },
    {
        url: 'https://www.miricanvas.com/templates',
        filename: 'template-page',
    }
]

exports.target = target

```