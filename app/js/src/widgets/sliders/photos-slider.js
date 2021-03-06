class PhotosSlider extends Widget {
  constructor(node) {
    super(node, 'js-slider-photos');

    this.state = this.$node.classList.contains('js-slider-photos--loop');

    this.navPrev = this.queryElement('.prev');
    this.navNext = this.queryElement('.next');
    this.slider = this.queryElement('.slider');
    this.counter = this.queryElement('.counter');
    this.counterText = this.queryElement('.counter-text');
    this.swiper = null;

    this.events();
  }

  events() {
    this.swiperSetup();
    this.setCounterNubmer();
  }

  swiperSetup() {
    this.initSwiper();
    this.onClick();
    this.counter.classList.add('active');
  }

  onClick() {
    this.navPrev = this.queryElement('.prev');
    this.navNext = this.queryElement('.next');

    this.navNext.addEventListener('click', () => {
      this.swiper.slideNext();
    });

    this.navPrev.addEventListener('click', () => {
      this.swiper.slidePrev();
    });

    const node = this.$node;
    const slider = this.swiper;
    const counter = this.counter;

    this.swiper.on('slideChange', function () {
      if (slider.isBeginning) {
        counter.classList.add('active')
        node.classList.add('with-link')
      }
      else {
        counter.classList.remove('active')
        node.classList.remove('with-link')
      }
    });
  }

  setCounterNubmer() {
    this.counterText.textContent = `${this.$node.querySelectorAll('.swiper-slide').length}`;
  }

  initSwiper() {
    this.swiper = new Swiper(this.slider, this.sliderOptions);
  }

  get sliderOptions () {
    return {
      slidesPerView: 'auto',
      spaceBetween: 10,
    }
  }

  static init(el) {
    new PhotosSlider(el);
  }
}

window.PhotosSlider = PhotosSlider;
