$(document).ready(function() {
  $('.sidebar .nav li a').click(function(e) {
    $('.sidebar .nav li').removeClass('active');
    var $this = $(this).closest('li');
    if (!$this.hasClass('active')) {
      $this.addClass('active');
    }
  });
});

function delete_player(_id) {
  $.ajax({
    method: "DELETE",
    url: "/player/" + _id,
    success: function(msg) {
      location.href = "/player/";
    },
    error: function(msg) {
      alert("Error - " + msg.msgText);
    }
  });
}

function edit_player(_id) {
  $.ajax({
    method: "GET",
    url: "/player/" + _id,
    success: function(msg) {
      location.href = "/player/";
    },
    error: function(msg) {
      alert("Error - " + msg.msgText);
    }
  });
}

function randomWord(length) {
  const arr = [];

  for (let i = 1; i <= length; i++) {
    let isUpper = parseInt(Math.random() * 2) === 1;
    let char = String.fromCharCode(parseInt(Math.random() * 26) + 97);

    arr.push(isUpper ? char.toUpperCase() : char);
  }

  return arr.join('');
}

function randomSentence(wordCount) {
  let sentence = randomWord(Math.random().toString().substr(2, 1));

  for (let i = 2; i <= wordCount; i++) {
    sentence = sentence + ' ' + randomWord(parseInt(Math.random() * 7) + 1);
  }

  return sentence;
}