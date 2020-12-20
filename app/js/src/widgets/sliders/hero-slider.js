class HeroSlider extends Widget {
  constructor(node) {
    super(node, 'js-slider-hero');

    this.state = this.$node.classList.contains('js-slider-hero--loop')
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
      slidesPerView: 1,
      spaceBetween: 0,
    });
  }


  static init(el) {
    el && new HeroSlider(el);
  }
}

window.HeroSlider = HeroSlider;
