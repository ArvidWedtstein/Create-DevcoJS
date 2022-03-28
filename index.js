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
      

      // Listen DOM element update to set the controller property
      Object.keys(bryter).forEach(function (bryterValue) {
        var bryt = bryter[bryterValue];

        bryt.elements.forEach(function (element) {
          value = proxy[element.getAttribute('bryter')];

          console.log(value)
          for (var i = 0; i < element.children.length; i++) {
            
            // proxy[bryt.bryterValue] = element.children[i].getAttribute('sak');

            console.log("Proxybryter", proxy[bryt.bryterValue], element.children[i].getAttribute('sak'))
            if (proxy[bryt.bryterValue] == element.children[i].getAttribute('sak')) {
              element.children[i].style.display = 'block';
            } else {
              element.children[i].style.display = 'none';
            }
          }
        })  
      });
  
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
    
  