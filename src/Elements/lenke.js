class Lenke extends HTMLElement {
    constructor() {
      // Always call super first in constructor
      super();
    }
  }
  customElements.define('n-lenke', Lenke, {extends: 'a'});
  