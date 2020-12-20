class PageSidebar extends Widget {
  constructor(node) {
    super(node, 'js-page-sidebar');

    this.sidebar = null;
    this.$inner = this.queryElement('.content');

    this.events();
  }

  events() {
    this.setup();
  }

  setup() {
    this.sidebar = new StickySidebar('.js-page-sidebar', {
      // containerSelector: '.js-page-sidebar',
      // innerWrapperSelector: '.js-page-sidebar__content',
      topSpacing: 120,
      bottomSpacing: 20
    });
  }

  static init(el) {
    el && new PageSidebar(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-page-sidebar').forEach(item => PageSidebar.init(item));
});
