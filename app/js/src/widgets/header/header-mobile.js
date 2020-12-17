class HeaderMobile extends Widget {
  constructor(node) {
    super(node, 'js-header',);

    this.opened = false;
    this.mobileInit = false;
    this.$burgerButton = this.queryElement('.burger');
    this.$headerMenu = this.queryElement('.menu');

    this.toggle = this.toggle.bind(this);
    this.resizeEvents = this.resizeEvents.bind(this);
    this.onDocumentClick = this.onDocumentClick.bind(this);

    this.events();
  }

  events() {
    this.resizeEvents();
    onResize(this.resizeEvents);
  }

  resizeEvents() {
    if (!Layout.isLaptopLayout() && !this.mobileInit) return null;
    if (!Layout.isLaptopLayout() && this.mobileInit) {
      this.removeAll();
      this.close();
      return null;
    }

    this.setup();
  }

  setup() {
    this.$burgerButton.addEventListener('click', this.toggle);
    this.mobileInit = true;
  }

  removeAll() {
    this.$burgerButton.removeEventListener('click', this.toggle);
  }

  onDocumentClick(e) {
    let target = e.target;

    do {
      if (target === this.$burgerButton || target === this.$headerMenu) return;
      target = target.parentNode;
    } while (target);

    this.toggle();
  }

  open() {
    this.$burgerButton.classList.add('opened');
    this.$node.classList.add('mobile-opened');
    this.$node.classList.add('header--filled');
    this.$headerMenu.classList.add('mobile-opened');
    document.addEventListener('click', this.onDocumentClick);

    this.opened = true;
    this.$headerMenu.scrollTop = 0;
    hideScrollbar();
  }

  close() {
    this.$burgerButton.classList.remove('opened');
    this.$node.classList.remove('mobile-opened');
    this.$node.classList.remove('header--filled');
    this.$node.classList.remove('dropdown-opened');
    this.$headerMenu.classList.remove('mobile-opened');
    document.removeEventListener('click', this.onDocumentClick);

    this.opened = false;
    showScrollbar();
  }

  toggle() {
    this.opened ? this.close() : this.open();
  }

  static init(el) {
    new HeaderMobile(el);
  }
}

window.HeaderMobile = HeaderMobile;
