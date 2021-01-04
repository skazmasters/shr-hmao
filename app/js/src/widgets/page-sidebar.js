class PageSidebar extends Widget {
  constructor(node) {
    super(node, 'js-page-sidebar');

    this.sidebar = null;
    this.$inner = this.queryElement('.content');

    this.resizeEvents = this.resizeEvents.bind(this);

    this.events()
  }

  events() {
    this.resizeEvents();
    onResize(this.resizeEvents);
  }

  resizeEvents() {
    !Layout.isTabletLayout() ? this.init() : this.destroy();
  }

  init() {
    this.setup();
  }

  destroy() {
    this.sidebar !== null ? this.sidebar.destroy() : null;
  }

  setup() {
    this.sidebar = new StickySidebar('.js-page-sidebar', {
      // containerSelector: '.js-page-sidebar',
      innerWrapperSelector: '.js-page-sidebar__content',
      topSpacing: 120,
      bottomSpacing: 0,
    });
  }

  static init(el) {
    el && new PageSidebar(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-page-sidebar').forEach(item => PageSidebar.init(item));
});
