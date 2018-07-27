let Vlink = {
  _cacheElements: function() {
    this.links = Array.from(document.getElementsByTagName('a'));
  },

  init: function() {
    Vlink._cacheElements();

    Vlink.links.map(link => {
      console.log(link.href);
    });
  }
}

export default {
  init: Vlink.init
}
