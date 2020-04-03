'use strict';

$(function () {
  $('.reviews__slider').slick({
    dots: true,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 3,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1023,
        slidesToShow: 3,
        slidesToScroll: 1
      },
      {
        breakpoint: 767,
        slidesToShow: 2,
        slidesToScroll: 1
      }
    ]
  });
});
