# crash-mock

代理ajax,返回虚拟数据

## Install
```javascript
npm install crash-mock --sava
```

## Usage
```javascript

const data = {
  url:'',
  res:{}
}

new Mock({
  mode:'ajax',
  response: data
})

