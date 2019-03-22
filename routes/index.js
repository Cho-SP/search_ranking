const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const request = require('request');

/* GET home page. */

const naverUrl = 'https://www.naver.com/';
// const naverUrl = 'https://www.melon.com/chart/';
const daumUrl = 'https://www.daum.net/';
const naverRanking = new Array();
const daumRanking = new Array();

const naverArray = new Array();
const daumArray = new Array();

router.get('/', function(req, res, next) {

  request(naverUrl, function(err, res, html){
  const $ = cheerio.load(html);

    for(var i=0; i<10; i++){
      $('.section_navbar > div > div > div > ul > .ah_item > .ah_a > .ah_k').each(function(){
        const naver_info = $(this);
        const naver_info_text = naver_info.text();
        naverRanking[i] = naver_info_text;
        i++;
      })
    }
    for(var k = 0; k<10; k++){
      naverArray[k] = naverRanking[k];
    }
    console.log("네이버 실검 순위");
    for(var j = 0; j<10; j++){
      console.log(naverArray[j]);
    }
  });

  request(daumUrl, function(err, res, html){
  const $ = cheerio.load(html);

    for(var i=0; i<20; i++){
      $('li > div > div.rank_cont > span.txt_issue > a.link_issue').each(function(){
        const daum_info = $(this);
        const daum_info_text = daum_info.text();
        if(i%2==0){
        daumRanking[i] = daum_info_text;
        }
        i++;
      })
    }
    var a=0;
    for(var k=0; k<20; k++){
      if(k%2 ==0){
        daumArray[a] = daumRanking[k];
        a++;
      }
    }
    console.log("다음 실검 순위");
    for(var j = 0; j<10; j++){
      console.log(daumArray[j]);
    }
  });
  const nFirst = naverArray[0];
  const nSecond = naverArray[1];
  const nThird = naverArray[2];
  const nFourth = naverArray[3];
  const nFifth = naverArray[4];
  const nSixth = naverArray[5];
  const nSeventh = naverArray[6];
  const nEighth =naverArray[7];
  const nNineth = naverArray[8];
  const nTenth = naverArray[9];

  const dFirst = daumArray[0];
  const dSecond = daumArray[1];
  const dThird = daumArray[2];
  const dFourth = daumArray[3];
  const dFifth = daumArray[4];
  const dSixth = daumArray[5];
  const dSeventh = daumArray[6];
  const dEighth = daumArray[7];
  const dNineth = daumArray[8];
  const dTenth = daumArray[9];
  res.render('index', { n1:nFirst, n2:nSecond, n3:nThird, n4:nFourth, n5:nFifth,
  n6:nSixth, n7:nSeventh, n8:nEighth, n9:nNineth, n10:nTenth,
d1:dFirst, d2:dSecond, d3:dThird, d4:dFourth, d5:dFifth, d6:dSixth, d7:dSeventh,
d8:dEighth, d9:dNineth, d10:dTenth});
});



/*
router.get('/search', function(req,res,next){
  var url = 'http://www.melon.com/chart/';
var title = new Array(),
    artist = new Array(),
    up_date,
    up_time;
var rank = 10;  //10위까지 확인
 
 
request(url, function(error, response, html){
  if (!error) {
    var $ = cheerio.load(html);
 
   // 곡명 파싱
    for (var i = 0; i < rank; i++) {
      $('.ellipsis.rank01 > span > a').each(function(){
        var title_info = $(this);
        var title_info_text = title_info.text();
        title[i] = title_info_text;
        i++;
      })
    }
 
    // 아티스트명 파싱
    for (var i = 0; i < rank; i++) {
      $('.checkEllipsis').each(function(){
        var artist_info = $(this);
        var artist_info_text = artist_info.text();
        artist[i] = artist_info_text;
        i++;
      })
    }
 
    // 업데이트 날짜
    $('.year').each(function(){
      var date_info = $(this);
      var date_info_text = date_info.text();
      up_date = date_info_text;
    })
 
    // 업데이트 시간
    $('.hhmm > span').each(function(){
      var time_info = $(this);
      var time_info_text = time_info.text();
      up_time = time_info_text;
    })
 
    //xxxx년 xx월 xx일 오후/오전 xx시 format
    var up_date_arr = new Array();
    var up_date_arr = up_date.split('.');
    var up_time_arr = new Array();
    var up_time_arr = up_time.split(':');
    var newtime;
 
    // 오후 오전 삽입
    if (up_time_arr[0] >12) {
      up_time_arr[0] = up_time_arr[0] - 12
      newtime = "오후 "+up_time_arr[0];
    } else {
      newtime = "오전 " +up_time_arr[0];
    }
 
    // 콘솔창 출력
    console.log("< 멜론 차트 1 ~ "+rank+"위 >");
 
    // 순위 제목 - 아티스트명
    for (var i = 1; i < rank+1; i++) {
      console.log(i+ "위" + " " + title[i-1] + " - " + artist[i-1]);
    }
    // 업데이트 시간
    console.log("("+up_date_arr[0]+"년 "+up_date_arr[1]+"월 "+up_date_arr[2]+"일 "+newtime+"시에 업데이트됨)");
res.render('search');
}}
)});
*/
module.exports = router;
