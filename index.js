(function () {
    var controllers = {};
    var addController = function (name, constructor) {
      // Store controller constructor
      controllers[name] = {
        factory: constructor,
        instances: []
      };
  
      // Look for elements using the controller 
      var element = document.querySelector('[kontainer=' + name + ']');
      if (!element) {   
        return;
      }
  
      // Create a new instance and save it
      var ctrl = new controllers[name].factory();
      controllers[name].instances.push(ctrl);
  
      // Get elements bound to properties
      var bindings = {};
      Array.prototype.slice.call(element.querySelectorAll('[bind]'))
        .map(function (element) {
        var boundValue = element.getAttribute('bind');
  
        if (!bindings[boundValue]) {
          bindings[boundValue] = {
            boundValue: boundValue,
            elements: []
          }
        }
  
        bindings[boundValue].elements.push(element);
      });   

      // Data
      var data = {};
      Array.prototype.slice.call(element.querySelectorAll('[data]'))
        .map(function (element) {
        var dataValue = element.getAttribute('data');
          
        if (!data[dataValue]) {
          data[dataValue] = {
            dataValue: dataValue,
            elements: []
          }
        }
  
        data[dataValue].elements.push(element);
        console.log(data[dataValue].dataValue)
        const obj = JSON.parse(data[dataValue].dataValue)
        console.log(obj)
      });


      


      // on
      var ved = {};
      Array.prototype.slice.call(element.querySelectorAll('[ved]'))
        .map(function (element) {
        var dataValue = element.getAttribute('ved');
          
        if (!data[dataValue]) {
          data[dataValue] = {
            dataValue: dataValue,
            elements: []
          }
        }
  
        data[dataValue].elements.push(element);
        console.log(data[dataValue].dataValue)
        const obj = JSON.parse(data[dataValue].dataValue)
        console.log(obj)
      });
      
      // bryter
      var bryter = {};
      Array.prototype.slice.call(element.querySelectorAll('[bryter]'))
        .map(function (element) {
        var bryterValue = element.getAttribute('bryter');
            
        if (!bryter[bryterValue]) {
          bryter[bryterValue] = {
            bryterValue: bryterValue,
            elements: []
          }
        }
        bryter[bryterValue].elements.push(element);

      });  
  
      // Update DOM element bound when controller property is set
      var proxy = new Proxy (ctrl, {
        set: function (target, prop, value) {    
          var bind = bindings[prop];
          var bryt = bryter[prop];
          
          if (bind) {  
            bind.elements.forEach(function (element) {
              element.value = value;
              element.setAttribute('value', value);
            });
          }
          if (bryt) {
            bryt.elements.forEach(function (element) {
              for (var i = 0; i < element.children.length; i++) {
                if (value == element.children[i].getAttribute('sak')) {
                  element.children[i].style.display = 'block';
                } else {
                  element.children[i].style.display = 'none';
                }
              }
            });
          }
          return Reflect.set(target, prop, value);
        }
      });
  
      // Listen DOM element update to set the controller property
      Object.keys(bindings).forEach(function (boundValue) {
        var bind = bindings[boundValue];
        bind.elements.forEach(function (element) {
          element.addEventListener('input', function (event) {
            proxy[bind.boundValue] = event.target.value;
          });
        })  
      });
      
      // document.getElementsByTagName("norsk")
  
      // Fill proxy with ctrl properties
      // and return proxy, not the ctrl !
      Object.assign(proxy, ctrl);
      return proxy;
    }
  
    // Export framework in window
    this.norsk = {
        controller: addController
    }
  })();
    
/* User code */
function InputController () {
  this.message = '2';
}

var myInputController = norsk.controller('InputController', InputController);

function onButtonClick () {
  myInputController.message = '2';   
}
class Devcologo extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    var shadow = this.attachShadow({mode: 'open'});

    // Create spans
    var wrapper = document.createElement('span');
    wrapper.setAttribute('class','wrapper');
    var icon = document.createElement('span');
    icon.setAttribute('class','icon');
    icon.setAttribute('tabindex', 0);
    var info = document.createElement('span');
    info.setAttribute('class','info');

    // Take attribute content and put it inside the info span
    var text = this.getAttribute('text');
    info.textContent = text;

    // Insert icon
    var imgUrl;
    if(this.hasAttribute('img')) {
      imgUrl = this.getAttribute('img');
    } else {
      imgUrl = 'devco-logo.png';
    }
    var img = document.createElement('img');
    img.src = imgUrl;
    icon.appendChild(img);

    // Create some CSS to apply to the shadow dom
    var style = document.createElement('style');

    style.textContent = '.wrapper {' +
                           'position: relative;' +
                        '}' +

                         '.info {' +
                            'font-size: 0.8rem;' +
                            'width: 200px;' +
                            'display: inline-block;' +
                            'border: 1px solid black;' +
                            'padding: 10px;' +
                            'background: white;' +
                            'border-radius: 10px;' +
                            'opacity: 0;' +
                            'transition: 0.6s all;' +
                            'position: absolute;' +
                            'bottom: 20px;' +
                            'left: 10px;' +
                            'z-index: 3;' +
                          '}' +

                          'img {' +
                            'width: 1.2rem' +
                          '}' +

                          '.icon:hover + .info, .icon:focus + .info {' +
                            'opacity: 1;' +
                          '}';

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(icon);
    wrapper.appendChild(info);
  }
}

// Define the new element
customElements.define('devco-logo', Devcologo);



class NorskBoks extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
  }
}

// Define the new element
customElements.define('n-boks', NorskBoks, {extends: 'div'});



