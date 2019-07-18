var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host : 'localhost',
  user : 'nodejs',
  password : 'nodejs',
  port : 3306,
  database : 'project'
});

/* mysql 접속 및 이용할 데이터베이스 설정 */
connection.connect();
connection.query('USE project', function(err,rows,fields){
  if(!err)
    console.log('Select DB : ', rows);
  else
    consile.log('ERR_', err);
});

/* GET home page */
router.get('/', function(req, res) {
  res.render('main_search', { title: 'Express' });
});

/* GET auth pages */
router.get('/login', function(req, res) {
  if(req.session.user){
    //이미 로그인되어 있을 경우
    res.redirect('/contents');
  }
  else{
    res.render('login', { title: 'Express', ecode: 0 });
  }
});
router.get('/register', function(req, res) {
  if(req.session.user){
    //이미 로그인되어 있을 경우
    res.redirect('/contents');
  }
  else{
    res.render('register', { title: 'Express', ecode: 0 });
  }
});
router.get('/finder', function(req, res) {
  if(req.session.user){
    //이미 로그인되어 있을 경우
    res.redirect('/contents');
  }
  else{
    res.render('finder', { title: 'Express' });
  }
});

/* GET contents pages */
router.get('/contents', function(req, res) {
  if(req.session.user){
    res.render('contents', { title: 'Express' });
  }
  else{
    //로그인하지 않은 경우
    res.redirect('/login');
  }
});
router.get('/profile', function(req, res) {
  if(req.session.user){
    res.render('profile', { title: 'Express' });
  }
  else{
    //로그인하지 않은 경우
    res.redirect('/login');
  }
});
router.get('/search', function(req, res) {
  if(req.session.user){
    res.render('sub_search', { title: 'Express' });
  }
  else{
    //로그인하지 않은 경우
    res.redirect('/login');
  }
});


/* 로그인, 로그아웃, 회원가입, 회원탈퇴 처리 */

//로그인 처리 알고리즘
router.post('/login', function(req, res){
  /* 변수 선언 */
  var auth = {
    "id": req.body.id,
    "pw": req.body.pw
  } //양식을 임시 저장할 객체
  var sql = 'SELECT * FROM member'; //Mysql 쿼리 양식

  /* 알고리즘 */

  //DB에서 회원정보 읽어와서 사용자가 입력한 내용과 대조
  connection.query(sql, function(err, rows, fields){
	  if(err){
      console.log(err);
    }
    else {
      for(var i=0; i<rows.length; i++){
        if(rows[i].member_id == auth.id && rows[i].member_pw == auth.pw){
          //세션 생성
          req.session.user = {
            "id" : rows[i].member_id,
            "nick" : rows[i].member_nick,
            "name" : rows[i].member_name
          }
          console.log('로그인 처리 - 세션 저장');
          res.redirect('/contents');
        }
      }
      //일치하는 id,pw가 없음
      //추후 로그인 에러 페이지로 리다이렉트하는 것으로 변경을 검토
      res.render ('login', { title: 'Express', ecode: 1 });
	  }
  });
  //디버깅용 로그
  console.log(auth);
});

//로그아웃 처리 알고리즘
router.get('/logout', function(req, res){
  req.session.destroy();
  console.log('로그아웃 처리 - 세션 삭제');
  res.redirect('/');
});

//회원가입 처리 알고리즘
router.post('/register', function(req, res){
  /* 변수 선언 */
  //양식을 임시 저장할 객체
  var info = {
    "id": req.body.id,
    "pw": req.body.pw,
    "pwck": req.body.pwck,
    "name": req.body.name,
    "nick": req.body.nick,
    "mail": req.body.mail,
    "phone": req.body.phone
  }
  //양식 검증용 정규식
  var RegExp1 = /^[0-9]*$/;
  var RegExp2 = /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/;
  //Mysql 쿼리 양식
  var sql = 'INSERT INTO member (member_id, member_pw, member_name, member_nick, member_email, member_phone) VALUES(?, ?, ?, ?, ?, ?)';
  var params = [info.id,info.pw,info.name,info.nick,info.mail,info.phone];

  /* 알고리즘 */
  //사용자가 입력한 회원가입 양식 검증
  if(info.id==""||info.pw==""||info.pwck==""||info.name==""||info.nick==""||info.mail==""||info.phone==""){
    res.render('register', { title: 'Express', ecode: 1 });
  }
  if(info.pw!=info.pwck){
    res.render('register', { title: 'Express', ecode: 2 });
  }
  if(!RegExp1.test(info.phone)){
    res.render('register', { title: 'Express', ecode: 3 });
  }
  if(!RegExp2.test(info.mail)){
    res.render('register', { title: 'Express', ecode: 4 });
  }

  //양식에 문제 없으면 DB에 저장
  else{
    connection.query(sql, params, function(err, rows, fields){
	    if(err){
        console.log(err);
        res.redirect('/register');
      }
      else {
        console.log(rows.insertId);
        res.redirect('/login');
	    }
    });
  }
  //디버깅용 로그
  console.log(info);
});

//회원탈퇴 처리 알고리즘
router.get('/resign', function(req, res){
  /* 변수 선언 */
  //양식을 임시 저장할 객체
  var auth = {
    "id": req.body.id,
    "pw": req.body.pw
  }
  //Mysql 쿼리 양식
  var sql = 'SELECT * FROM member';

  /* 알고리즘 */

  //DB에서 회원정보 읽어와서 사용자가 입력한 내용과 대조 (회원탈퇴 전 한번 더 검증)
  connection.query(sql, function(err, rows, fields){
	  if(err){
      console.log(err);
    }
    else {
      for(var i=0; i<rows.length; i++){
        if(rows[i].member_id == auth.id && rows[i].member_pw == auth.pw){
          console.log('회원탈퇴 처리 시작');

          //회원탈퇴 쿼리
          sql = 'DELETE FROM member WHERE id=?';
          params = [auth.id];
          connection.query(sql, params, function(error, rows, fields){
            if(err){
              console.log('회원탈퇴 처리 실패 - ', err);
              res.redirect('/contents');
            }
            else{
              console.log('회원탈퇴 처리 완료');
              res.redirect('/');
            }
          });
        }
      }
      //일치하는 id,pw가 없음
      res.redirect('/profile');
	  }
  });
  //디버깅용 로그
  console.log(auth);
});


module.exports = router;
