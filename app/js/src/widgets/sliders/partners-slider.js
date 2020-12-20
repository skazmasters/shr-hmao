class PartnersSlider extends Widget {
  constructor(node) {
    super(node, 'js-slider-partners');

    this.state = this.$node.classList.contains('js-slider-partners--loop')
    this.navPrev = this.queryElement('.prev');
    this.navNext = this.queryElement('.next');
    this.slider = this.queryElement('.slider');

    this.swiper = null;

    this.events();
  }

  events() {
    this.initSwiper();
    this.onClick();
  }

  onClick() {
    this.navNext.addEventListener('click', () => {
      this.swiper.slideNext();
    })
    this.navPrev.addEventListener('click', () => {
      this.swiper.slidePrev();
    })
  }

  initSwiper() {
    this.swiper = new Swiper(this.slider, {
      loop: this.state,
      slidesPerView: 2,
      spaceBetween: 20,
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      },
    });
  }


  static init(el) {
    el && new PartnersSlider(el);
  }
}

window.PartnersSlider = PartnersSlider;
