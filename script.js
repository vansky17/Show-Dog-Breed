'use strict';
//Fetch the image from server with the given input as the breed. Make a check whether entry is valid or not by checking the response status
function getDogImage(input) {
  fetch(`https://dog.ceo/api/breed/${input}/images/random`)
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(responseJson => {
      if (responseJson.status == "error") {
        showRandomBreed();
      }else if (responseJson.status == "success") {
        displayResult(responseJson);
      } 
  })
    .catch(error => alert('Something went wrong. Try again later.'));
}
// Remove previously displayed image
function emptyDipslay(){
    $('.results').empty();
    $('.results').hide();
}
//Display the results
function displayResult(responseJson) {
  console.log(responseJson);
  emptyDipslay();
    $('.results').append(`<img src="${responseJson.message}">`);
    $('.result-message').text(`Showing breed ${$('#dog-breed').val()}. Enjoy!`);
    $('.results').fadeIn();
}
//Show random breed if entry is empty or invalid
function showRandomBreed() {
  emptyDipslay(); 
  fetch(`https://dog.ceo/api/breeds/image/random/1`)
    .then(response => response.json())
    .then(responseJson => {
      $('.result-message').text(`The breed ${$('#dog-breed').val()} does not exist. A random breed is shown!`);
      $('.results').append(`<img src="${responseJson.message}">`);
      $('.results').fadeIn();
      })
    .catch(error => alert("Something went wrong. Try again later."));
}
 //Event handler on submit 
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let input = $('#dog-breed').val();
    getDogImage(input);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  $('.results').hide();
  watchForm();
});