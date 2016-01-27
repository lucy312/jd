/*
 * @Author: Administrator
 * @Date:   2015-12-18 17:07:27
 * @Last Modified by:   Administrator
 * @Last Modified time: 2015-12-19 16:07:15
 */

'use strict';
window.onload = function() {
    search();
  }
  // 搜索框颜色渐变
var search = function() {
    var search = document.getElementsByClassName("jd-header-box")[0];
    var banner = document.getElementsByClassName("jd-banner")[0];
    var height = banner.offsetHeight;
    window.addEventListener("scroll", function() {
      var top = document.body.scrollTop;
      if (top < height) {
        var ol = top / height * 0.85;
        search.style.background = "rgba(201,21,35," + ol + ")";
      } else {
        search.style.background = "rgba(201,21,35,0.85)";
      }
    })
  }
  // 倒计时
var skTime = document.getElementsByClassName("sk-time")[0];
var spanLists = skTime.getElementsByClassName("num");
var time = 4 * 60 * 60;
var timer = null;
timer = setInterval(function() {
  time--;
  var h = Math.floor(time / (60 * 60) % 24);
  var m = Math.floor(time / 60 % 60);
  var s = time % 60;
  spanLists[0].innerHTML = h < 10 ? 0 : Math.floor(h / 10);
  spanLists[1].innerHTML = h % 10;
  spanLists[2].innerHTML = m < 10 ? 0 : Math.floor(m / 10);
  spanLists[3].innerHTML = m % 10;
  spanLists[4].innerHTML = s < 10 ? 0 : Math.floor(s / 10);
  spanLists[5].innerHTML = s % 10;
  if (time <= 0) {
    clearInterval(timer);
  }
}, 1000)

// 轮播图
var banner = document.getElementsByClassName("jd-banner")[0];
var width = banner.offsetWidth;
var imgBox = banner.getElementsByTagName("ul")[0];
var pointBox = banner.getElementsByTagName("ul")[1];
var points = pointBox.getElementsByTagName("li");
var index = 1;
var timer = null;
var addTransition = function() {
  imgBox.style.transition = "all 0.3s ease 0s";
  imgBox.style.webkitTransition = "all 0.3s ease 0s";
}
var removeTransition = function() {
  imgBox.style.transition = "none";
  imgBox.style.webkitTransition = "none";
}
var setTransform = function(t) {
    imgBox.style.transform = "translateX(" + t + "px)";
    imgBox.style.webkitTransform = "translateX(" + t + "px)";
  }
  // 定时器自动轮播
timer = setInterval(function() {
    index++;
    addTransition();
    setTransform(-index * width);
  }, 1000)
  // 过渡结束时判断index
imgBox.addEventListener("transitionEnd", function() {
  if (index >= 9) {
    index = 1;
  } else if (index <= 0) {
    index = 8;
  }
  removeTransition();
  setTransform(-index * width);
  pointScroll();
}, false)
imgBox.addEventListener("webkitTransitionEnd", function() {
  if (index >= 9) {
    index = 1;
  } else if (index <= 0) {
    index = 8;
  }
  removeTransition();
  setTransform(-index * width);
  pointScroll();
}, false)

// 小圆点
var pointScroll = function() {
  var currentIndex = index;
  if (currentIndex >= 9) {
    currentIndex = 1;
  } else if (currentIndex <= 0) {
    currentIndex = 8;
  }
  for (var i = 0; i < points.length; i++) {
    points[i].className = "";
  }
  points[currentIndex - 1].className = "now";
}

//手指滑动
var startX = 0,
  endX = 0,
  moveX = 0;
imgBox.addEventListener("touchstart", function(e) {
  clearInterval(timer);
  startX = e.touches[0].clientX;
})
imgBox.addEventListener("touchmove", function(e) {
  endX = e.touches[0].clientX;
  moveX = startX - endX;
  e.preventDefault();
  clearInterval(timer);
  removeTransition();
  setTransform(-(index * width + moveX));
})
imgBox.addEventListener("touchend", function(e) {
    clearInterval(timer);
  if (Math.abs(moveX) > (1 / 3 * width) && moveX != 0) {
    if (moveX > 0) {
      index++;
    } else {
      index--;
    }
    setTransform(-index * width);
  }
  addTransition();
  setTransform(-index * width);
  startX = 0;
  endX = 0;
  moveX = 0;
  timer = setInterval(function() {
    index++;
    addTransition();
    setTransform(-index * width);
  }, 3000);
})
