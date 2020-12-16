class Header extends Widget {
  constructor(node) {
    super(node, 'js-header');

    this.$originNode = node;
    this.$node = node.cloneNode(true);
    this.$node.classList.add('fixed-prepare');
    document.body.append(this.$node);

    // HeaderDropdown.init(this.$originNode);
    // HeaderMobile.init(this.$originNode);

    // HeaderDropdown.init(this.$node);
    // HeaderMobile.init(this.$node);
    HeaderScroll.init(this.$node);

    HeaderSearch.init(this.$originNode.querySelector('.js-header-search'));
    HeaderSearch.init(this.$node.querySelector('.js-header-search'));
  }

  static init(el) {
    new Header(el);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  Header.init(document.querySelector('.js-header'));
});
