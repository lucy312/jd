/*
 * @Author: Administrator
 * @Date:   2015-12-20 07:20:11
 * @Last Modified by:   Administrator
 * @Last Modified time: 2015-12-20 08:19:40
 */

'use strict';
window.onload = function() {
  mask();
}
var mask = function() {
  var maskBox = document.getElementsByClassName("mask")[0];
  var loginBox = document.getElementsByClassName("login")[0];
  var deleteBox = document.getElementsByClassName("delete");
  var deleteTop;

  for (var i = 0; i < deleteBox.length; i++) {
    deleteBox[i].addEventListener("click", function() {
      maskBox.style.display = "block";
      loginBox.className = "login jumpOut";
      deleteTop = this.getElementsByClassName("delete-top")[0];
      deleteTop.style.transition = "all .5s ease 0s";
      deleteTop.style.wetkitTransition = "all .5s ease 0s";
      // deleteTop.style.transform="translate(-2px -4px) rotate(45deg)";
      // deleteTop.style.webkitTransform="translate(-2px -4px) rotate(45deg)";
      deleteTop .style.transform = 'translateY(-5px) translateX(-3px) rotate(-45deg)';
      deleteTop .style.webkitTransform = 'translateY(-5px) translateX(-3px) rotate(-45deg)';
    })
  }
 var cancel=document.getElementsByClassName("no")[0];
  cancel.addEventListener("click",function(){
    maskBox.style.display = "none";
    loginBox.className = "login";
      deleteTop.style.transition = "all .5s ease 0s";
      deleteTop.style.wetkitTransition = "all .5s ease 0s";
      deleteTop .style.transform = 'translateY(0) translateX(0) rotate(0)';
      deleteTop .style.webkitTransform = 'translateY(0) translateX(0) rotate(0)';
  })

}
