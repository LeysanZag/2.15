import { getPromise, postPromise } from "./api.js"
import { renderComments } from "./render.js"
import { initEventListeners, initEventAndCommentListener, answerComment } from "./listeners.js"
import { normalizeComments } from "./helpers.js";


"use strict";
export let comments = [];

export function setComments(newComments) {
  comments = newComments;
}

// API 
const fetchPromiseGet = () => {

  const containerPreloader = document.getElementById('container-preloader');
  const containerPreloaderPost = document.getElementById('container-preloader-post');
  containerPreloader.textContent = 'Пожалуйста подождите, идет загрузка комментариев...';
  containerPreloaderPost.style.display = 'none';

  getPromise().then((responseData) => {
    const appComments = normalizeComments(responseData.comments)
    comments = appComments;
    containerPreloader.textContent = '';
    containerPreloaderPost.style.display = 'block';
    renderComments({ comments, initEventListeners, answerComment });

  })
};
fetchPromiseGet();
initEventAndCommentListener();

console.log("It works!");