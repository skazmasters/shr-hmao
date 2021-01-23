class Artists extends Widget {
  constructor(node) {
    super(node, 'js-artists');

    this.$body = this.queryElement('.body');
    this.$resultsImg = this.queryElement('.results-img');
    this.$artistsLinks = this.queryElements('.link');

    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.visibleImg = null;

    this.currentElem = null;

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
    !isLaptopLayout() ? this.build() : this.destroy();
  }

  build() {
    this.$artistsLinks.forEach((img, i) => {
      img.setAttribute('data-idx', i);
      this.addImage(img.dataset.artistImage, i, img.alt);
    });

    this.$node.addEventListener('mouseover', this.onMouseOver);
    this.$node.addEventListener('mouseout', this.onMouseOut);
  }

  destroy() {
    this.$node.removeEventListener('mouseover', this.onMouseOver);
    this.$node.removeEventListener('mouseout', this.onMouseOut);
    this.removeImage();
  }

  onMouseOver(e) {
    let target = e.target.closest('[data-artist-image]');
    if (!target) return;

    if (target.closest('[data-artist-image]')) {
      this.currentElem = target;

      this.visibleImg = this.$resultsImg.querySelector(`[data-idx="${target.dataset.idx}"]`);
      this.visibleImg.classList.remove('hover-reveal--hide');
    }
  }

  onMouseOut(e) {
    if (!this.currentElem) return;

    let relatedTarget = e.relatedTarget;

    while (relatedTarget) {
      if (relatedTarget === this.currentElem) return;

      relatedTarget = relatedTarget.parentNode;
    }

    this.visibleImg = this.$resultsImg.querySelector(`[data-idx="${this.currentElem.dataset.idx}"]`);
    this.visibleImg.classList.add('hover-reveal--hide');

    this.currentElem = null;
  }

  addImage(source, idx, alt) {
    this.$resultsImg.insertAdjacentHTML('beforeend', `
      <div class="hover-reveal hover-reveal--hide" data-idx="${idx}">
        <div class="hover-reveal__inner">
          <img src="${source}" alt="${alt}" class="hover-reveal__img">
        </div>
      </div>
    `);
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
