class HeaderSearch extends Widget {
  constructor(node) {
    super(node, 'js-header-search');

    this.$openButton = this.queryElement('.open');
    this.$closeButton = this.queryElement('.close');
    this.$input = this.queryElement('.input');
    this.$dropdown = this.queryElement('.dropdown');

    this.onDocumentClick = this.onDocumentClick.bind(this);

    this.events();
  }

  events() {
    this.$openButton.addEventListener('click', this.onOpenClick.bind(this));
    this.$closeButton.addEventListener('click', this.onCloseClick.bind(this));
    this.$input.addEventListener('focus', this.onInputFocus.bind(this));
    this.$input.addEventListener('input', this.onInputInput.bind(this));
    this.$input.addEventListener('keydown', this.onInputKeyDown.bind(this));
  }

  updateResults() {
    const value = this.$input.value.trim();

    value.length === 0
      ? this.$closeButton.classList.remove('visible')
      : this.$closeButton.classList.add('visible');
  }

  onInputFocus() {
    this.$node.classList.add('active');
    this.updateResults();
  }

  onInputInput(e) {
    this.updateResults();
  }

  onInputKeyDown(e) {
    if (e.keyCode === 27) this.close();
  }

  onDocumentClick(e) {
    let target = e.target;
    do {
      if (target === this.$node) return;
      target = target.parentNode;
    } while (target);

    this.close();
  }

  onOpenClick(e) {
    e.stopPropagation();
    e.preventDefault();

    this.open();
  }

  onCloseClick(e) {
    e.stopPropagation();
    e.preventDefault();
    this.close();
  }

  open() {
    this.$input.value = '';
    this.$openButton.classList.add('active');
    this.$dropdown.classList.add('active');
    setTimeout(() => this.$input.focus(), 300)
    document.addEventListener('click', this.onDocumentClick);
    hideScrollbar();
  }

  close() {
    this.$dropdown.classList.remove('active');
    this.$openButton.classList.remove('active');
    document.removeEventListener('click', this.onDocumentClick);
    this.$node.classList.remove('active');
    showScrollbar();
  }

  static init(el) {
    new HeaderSearch(el);
  }
}

window.HeaderSearch = HeaderSearch;
