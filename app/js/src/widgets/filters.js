const filterInstances = new Map();

class Filters extends Widget {
  constructor(item, options = {}) {
    super(item, 'js-filters');

    this.$toggle = options.toggleElement ? options.toggleElement : this.queryElement('.toggle');
    this.$body = options.bodyElement ? options.bodyElement : this.queryElement('.body');

    this.opened = this.$node.classList.contains('opened');
    this.busy = false;
    this.togglePrevText = this.$toggle.textContent;

    this.eventHandlers = {};

    this.onToggleClick = this.onToggleClick.bind(this);
  }

  build() {
    this.$node.classList.contains('opened') ? this.changeButtonText() : null;
    this.$toggle.addEventListener('click', this.onToggleClick);
  }

  destroy() {
    this.$toggle.removeEventListener('click', this.onToggleClick);
  }

  on(event, handler) {
    if (!(event in this.eventHandlers)) {
      this.eventHandlers[event] = [];
    }
    this.eventHandlers[event].push(handler);
  }

  trigger(event) {
    if (event in this.eventHandlers) {
      this.eventHandlers[event].forEach(eventHandler => eventHandler());
    }
  }

  scrollToView() {
    startScrollTo(this.$node);
  }

  open() {
    this.$node.classList.add('opened');
    this.expand();
    this.trigger('opening');

    setTimeout(() => this.scrollToView(), 300);
  }

  close() {
    this.collapse();
    this.$node.classList.remove('opened');
  }

  onToggleClick(e) {
    e.preventDefault();
    if (this.busy) return;
    this.busy = true;

    this.changeButtonText();

    !this.$node.classList.contains('opened') ? this.open() : this.close();
  }

  changeButtonText() {
    const prevText = this.$toggle.textContent;
    this.$toggle.textContent = this.$toggle.dataset.toggleText;
    this.$toggle.dataset.toggleText = prevText;
  }

  collapse() {
    this.animate({
      from: this.$body.scrollHeight,
      to: 0,
    });
  }

  expand() {
    this.animate({
      from: 0,
      to: this.$body.scrollHeight,
    });
  }

  animate(height) {
    const elem = this.$body;

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

  static destroy(elem) {
    filterInstances.get(elem).destroy();
  }

  static get(elem) {
    return filterInstances.get(elem);
  }

  static init(elem, options = {}) {
    if (filterInstances.has(elem) === false) {
      filterInstances.set(elem, new Filters(elem, options));
    }

    filterInstances.get(elem).build();

    return filterInstances.get(elem);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-filters').forEach((element) => {
    Filters.init(element);
  });
});

window.Filters = Filters;
