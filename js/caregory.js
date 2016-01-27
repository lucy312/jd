/*
 * @Author: Administrator
 * @Date:   2015-12-19 16:10:55
 * @Last Modified by:   Administrator
 * @Last Modified time: 2015-12-20 06:55:46
 */

'use strict';
window.onload = function() {
  leftScroll();
}

var leftScroll = function() {
  var parent = document.getElementsByClassName("jd-category-left")[0];
  var parentH = parent.offsetHeight;
  var child = parent.getElementsByClassName("jd-category-left-box")[0];
  var childH = child.offsetHeight;
  var lis = child.getElementsByTagName("li");
  var topH = document.getElementsByClassName("jd-topBar")[0].offsetHeight;
  var H = parentH - topH;
  var rightBox= parent.getElementsByClassName("jd_category_right_box")[0];
  var startY = 0,
    endY = 0,
    moveY = 0,
    currentY = 0,
    upH = 150;
  var startTime = 0,
    endTime = 0;
  // 加减过渡
  var addTransition = function() {
    child.style.transition = "all 0.3s ease 0s";
    child.style.webkitTransition = "all 0.3s ease 0s";
  }
  var removeTransition = function() {
      child.style.transition = "none";
      child.style.webkitTransition = "none";
    }
    // 加移动
  var setTransform = function(t) {
    child.style.transform = "translateY(" + t + "px)";
    child.style.webkitTransform = "translateY(" + t + "px)";
  }

  child.addEventListener("touchstart", function(e) {
    startTime = new Date().getTime();
    startY = e.touches[0].clientY;
  }, false)
  child.addEventListener("touchmove", function(e) {
    e.preventDefault();
    endY = e.touches[0].clientY;
    moveY = startY - endY;
    if (currentY - moveY < upH && currentY - moveY > (-(childH - H) - upH)) {
      removeTransition();
      setTransform(currentY - moveY);
    }
  }, false);
  child.addEventListener("touchend", function(e) {
    e.preventDefault();
    // 吸附条件
    if (currentY - moveY >= 0) {
      addTransition();
      setTransform(0);
      currentY = 0;
    } else if (currentY - moveY <= -(childH - H)) {
      addTransition();
      setTransform(-(childH - H));
      currentY = -(childH - H);
    } else {
      currentY = currentY - moveY;
    }
    //
    endTime = new Date().getTime();
    if ((endTime - startTime) < 150 && moveY == 0) {
      for (var i = 0; i < lis.length; i++) {
        lis[i].className = "";
        lis[i].index = i;
      }
    }
    var li = e.target.parentNode
    li.className = "now";
    var translateY = li.index * 50;
    if (translateY < (childH - H)) {
      addTransition();
      setTransform(-translateY);
      currentY = -translateY;
    } else {
      addTransition();
      setTransform(-(childH - H));
      currentY = -(childH - H);
    }

// 右边盒子
rightBox.style.transition="all 0.3s ease 0s";
rightBox.style.webkitTransition="all 0.3s ease 0s";
rightBox.style.opacity=0;
setTimeout(function(){
  rightBox.style.opacity=1;
},1000)

  }, false)

}
