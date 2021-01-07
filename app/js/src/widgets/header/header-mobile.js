class HeaderMobile extends Widget {
  constructor(node) {
    super(node, 'js-header',);

    this.opened = false;
    this.mobileInit = false;
    this.$burgerButton = this.queryElement('.burger');
    this.$headerMenu = this.queryElement('.menu');
    this.$headerOpenBtn = this.queryElements('.mobile-open');

    this.busy = false;

    this.toggle = this.toggle.bind(this);
    this.resizeEvents = this.resizeEvents.bind(this);
    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.onBtnClick = this.onBtnClick.bind(this);

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
    this.$headerOpenBtn.forEach(btn => btn.addEventListener('click', this.onBtnClick));
    this.mobileInit = true;
  }

  removeAll() {
    this.$headerOpenBtn.forEach(btn => btn.removeEventListener('click', this.onBtnClick))
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

  onBtnClick(e) {
    e.preventDefault();
    if (this.busy) return;

    let target = e.target;
    this.busy = true;

    const parentEl = target.closest('.js-header__mobile');
    const bodyEl = parentEl.querySelector('.js-header__mobile-menu');

    if (!parentEl.classList.contains('opened')) {
      parentEl.classList.add('opened');
      this.expand(bodyEl);
    } else {
      const nestedMenus = parentEl.querySelectorAll('.js-header__mobile');

      nestedMenus.forEach(menu => {
        const nestedContainerMenus = parentEl.querySelector('.js-header__mobile-menu');
        this.collapse(nestedContainerMenus);

        menu.classList.remove('opened');
      });

      setTimeout(() => {
        this.collapse(bodyEl);
        parentEl.classList.remove('opened');
      }, 320)
    }
  }

  collapse(el) {
    this.animate({
      from: el.scrollHeight,
      to: 0,
    }, el);
  }

  expand(el) {
    this.animate({
      from: 0,
      to: el.scrollHeight,
    }, el);
  }

  animate(height, target) {
    const elem = target;

    const handler = e => {
      if (e.target !== e.currentTarget) return false;
      elem.removeEventListener(endEvents.transition, handler);
      elem.classList.remove('animate');
      elem.style.height = '';
      this.busy = false;
    };
    elem.addEventListener(endEvents.transition, handler);

    elem.classList.add('animate');
    elem.style.height = `${height.from}px`;
    raf2x(() => {
      elem.style.height = `${height.to}px`;
    });
  }

  static init(el) {
    new HeaderMobile(el);
  }
}

window.HeaderMobile = HeaderMobile;
