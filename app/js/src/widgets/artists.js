class Artists extends Widget {
  constructor(node) {
    super(node, 'js-artists');

    this.$body = this.queryElement('.body');
    this.$resultsImg = this.queryElement('.results-img');

    this.onArtistHover = this.onArtistHover.bind(this);
    this.img = null;
    this.busy = false;
    this.events();
  }

  init() {
    this.events();
  }

  events() {
    this.setup();
    onResize(this.setup.bind(this));
  }

  setup() {
    if (isLaptopLayout()) {
      document.removeEventListener('mouseover', this.onArtistHover);
      this.removeImage();
    } else {
      this.addImage();
      document.addEventListener('mouseover', this.onArtistHover);
    }
  }

  onArtistHover(e) {
    e.preventDefault();

    let target = e.target;

    if (target.closest('[data-artist-image]')) {
      this.img.src = target.dataset.artistImage;
      this.img.classList.remove('hidden');
    } else {
      this.img.src = '';
      this.img.classList.add('hidden');
    }
  }

  addImage() {
    this.img = document.createElement('img');
    this.img.classList.add('hidden');
    this.img.classList.add('artists-main__portrait-img');
    this.$resultsImg.insertAdjacentElement('beforeend', this.img);
  }

  removeImage() {
    this.$resultsImg.innerHTML = '';
  }

  static init(el) {
    el && new Artists(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-artists').forEach(item => Artists.init(item));
});
