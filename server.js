// 익스프레스로 서버개체 생성
const express = require("express");
const app = express();

//mongodb 생성
const MongoClient = require('mongodb').MongoClient;

// post로 자료 전송을 위한 body-parser (Middleware) 설정
app.use(express.json());
app.use(express.urlencoded({extended:true}));

let activeDB;

// 데이터베이스 접속
// MongoClient.connect(경로,콜백(에러,db접속)=>{})
MongoClient.connect(
    'mongodb+srv://admin:qwer1234@cluster0.3uwxb.mongodb.net/list?retryWrites=true&w=majority',
    (error,client)=>{
        if(error) {return console.log('데이터베이스 오류')};

        // 내 db에 list 데이터 저장
        activeDB = client.db('list');

        // 서버오픈
        // app.listen(포트번호,콜백)
        app.listen(3000,()=>{
            console.log('3000 포트 오픈');
        })
    }
)
// write페이지 로드
app.get('/write',(req,res)=>{
    res.sendFile(__dirname + '/write.html');
})
// add페이지의 정보 가져와서 list.list에 저장
app.post('/add',(req,res)=>{
    activeDB.collection('list').insertOne(req.body,(error,result)=>{
        if(error) {return console.log('저장실패')};
        console.log('저장완료');
    });
    res.send('전송완료');
});
