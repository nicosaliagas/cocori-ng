import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cocori-library';

  constructor() {

    ///// https://stackoverflow.com/questions/5484673/javascript-how-to-dynamically-create-nested-objects-using-object-names-given-by

    var obj = {};

    this.createNestedObject(obj, "shapes.rectangle.height".split('.'), 300)

    console.log(obj)

    var settings = {};
    this.assign(settings, "shapes.rectangle.height".split('.'), 300);

    console.log(settings)
  }

  createNestedObject(base, names, value) {
    // If a value is given, remove the last name and keep it for later:
    var lastName = arguments.length === 3 ? names.pop() : false;

    // Walk the hierarchy, creating new objects where needed.
    // If the lastName was removed, then the last object is not set yet:
    for (var i = 0; i < names.length; i++) {
      base = base[names[i]] = base[names[i]] || {};
    }

    // If a value was given, set it to the last name:
    if (lastName) base = base[lastName] = value;

    // Return the last object in the hierarchy:
    return base;
  };

  assign(obj, keyPath, value) {
    let key
    let lastKeyIndex = keyPath.length - 1;
    for (var i = 0; i < lastKeyIndex; ++i) {
      key = keyPath[i];
      if (!(key in obj)) {
        obj[key] = {}
      }
      obj = obj[key];
    }
    obj[keyPath[lastKeyIndex]] = value;
  }



}
