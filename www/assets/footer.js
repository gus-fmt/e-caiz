class Footer extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
        <footer>
          <p>&copy; 2024 e-caiz. Gustave Famanta, Licence MIT.</p>
        </footer>
      `;
    }
  }
  
  customElements.define('my-footer', Footer);
  