
// We create several modules in order to protect our functions and variables from public , 
// all variables and functions are included in IIFE , that's means that all 
// inside the IIFE will
// not be public ( except the part callled public test)

// Modules are for data privacy : it is very important 
// IIFE is allows us to have data privacy, its create a new scope , not visible 
// from outside scope
// var and functions cannot be accessed from outside scope

// What is nice with modules is that we can also return an object containing all the functions
// that we want to be public (public test in our example)

// So to create our module , we just need to create a var and assign a IIFE to this variable 
// all the code inside will be private and secure
// only our publictest part will be public :  

// After all, the budgetController variable is simply an object containing the method 
// called public test , because that what we returned from the function

// Its work thanks to the power of closures : BECAUSE OF CLOSURES , ANY OTHER
// FUNCTIONS HAS ALWAYS ACCESS TO THE VARIABLES AND PARAMETERS OF ITS OUTER FUNCTIONS
// EVEN AFTER THE OUTTER FUNCTION HAS RETURNED

// That is why publictest method is public , because it was returned and now we can use it , 
// But the x and add variables are private because
// they are in the closure and therefore only
// the publicTest method can access them.

// So again, all of this works because of closures
// to these functions and this x variable are in the closure.
// Even after this IIFE here has returned.



/* BASIC EXAMPLE 

  function doSomething() {
    var firstName = 'Jared';
    var lastName = 'Devguy';
    var age = 22;
    var country = 'South Arfica';
 
 // Fails because we can only have 1 return per function, so after
    firstname the function will stop 
    execution
   
    return firstName;
    return lastName;    // wont run
    return age;         // wont run
    return country;     // wont run
 
// Fails because return can only return 1 value!! NB
    
    return firstName, lastName, age, country  
 
// This works because even though the object has many properties its still just 1 object.
    
    return {    
        fname: firstName,
        lname: lastName,
        age: age,
        country: country
    }
}
 
doSomething().fname;
doSomething().lname;
doSomething().age;
doSomething().country;
*/

// BUDGET CONTROLLER

var budgetController = (function () {

  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

// It is better in order to store data, to create objects inside a bigger object ( data object )

  var data = {
    
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }    
  }

  return {
    addItem: function(type, des, val) {

      var newItem, ID;

      // Create new ID

      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      }

      else {
        ID = 0;
      }
      
      
      // Create new Item based on 'inc' or 'exp' type
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }
      
      // Then push it into our data structure
      data.allItems[type].push(newItem);

      // return the new element
      return newItem;
    
    }
  
  };

})();




// UI CONTROLLER
var UIController = (function () {

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'

  } 

  return {
    
    getinput: function() {

      return {
        type: document.querySelector(DOMstrings.inputType).value, // Will be either 'inc' or 'exp'
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    addListItem: function(obj, type) {
      var html, newHtml, element, expense;
      // 1 Create HTML string with placeholder text

      if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // 2 Replace placeholder text with some actual data

      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);


      // 3 Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    clearFields: function (){ 
      
      var fields, fieldsArr; 
      
      fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
      
      // this returns a list , not an array. So in order to transform the list into array 
      // (and then loop through this array)
      // we need to define a new var called fieldsArr and build a prototype with the slice method ,
      // and then call method
      // slice return a copy of the array , so it will return a copy of the array - 
      // then we pass the list (called fields variable) to the call method.
      // we cannot use only slice method , and pass fields variable with the slice method , cause
      // fields is not an array it is just a list. We have to use the Array

      /* Where is the slice method actually stored
         that we can use it? Let's think about that. So where do you think it is stored?
         And the solution is, that it's in the array prototype.
         So we can write something like this. This array is the function constructor
         for all arrays, right? And we know that all the methods
         that the arrays inherit from the array function constructors
         are in the array's prototype property, right? And therefore, we know the slice method must also be there.
         So we can write "array dot prototype" and then "dot slice".
         And since this is a function,
         we can then use the call method on it, right?
         So, "call". And then in here, we setted this variable to the fields.
         And this will trick the slice method into thinking
         that we give it an array, and so it will return an array.
         So if we now store this into a variable and call it fields array
         then this will be an array. So, fields array.
         This is now an array. This is a nice little trick that we can use.
         This means that we can now loop over this array
         and clear all the fields that were selected */

        fieldsArr = Array.prototype.slice.call(fields);

        fieldsArr.forEach(function(current, index, array) {
          current.value = "";

        });
    
        fieldsArr[0].focus();

    },

    getDOMstrings: function() {
      return DOMstrings;
    } 
  };

})();



// These 2 modules are completely independant , they never interfere between them !
// if we want to add some features in budgetController , we can do this without thinking
// about uicontroller ! This is called SEPARATION OF CONCERNS : Thats means each
// part of the application should only be interested in doing one thing independently
// So again, these two controllers don't know about each other.
// They are stand alone, they don't even know that
// the other one exists.
// Now we need some way to have these two connected, right?
// For example, we need a way to read data
// from the User Interface and then add
// that data as a new expanse in the budgetController.
// And that's why we create a third module
// which is the app controller, and we also
// saw that one in the last lecture.



// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

  var setupEventListeners = function() {
    
    var DOM = UICtrl.getDOMstrings();
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function(event){
  
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
        event.preventDefault();
      }
    });
  };


  var ctrlAddItem = function () {
    
    var input, newItem;

    // 1 Get the field input data

    input = UICtrl.getinput();

    // 2 Add the item to the budget controller

    newItem = budgetCtrl.addItem(input.type, input.description, input.value);


    // 3 Add the item to the UI
    
    UICtrl.addListItem(newItem, input.type);

    // 4 Clear the fields
    
    UICtrl.clearFields();

    // 5 Calculate the budget


    // 6 Display the budget on the UI

  };

  return {
    init: function () {
      console.log('The application has started !');
      setupEventListeners();
    }
  }


})(budgetController, UIController);


// Now of course, modules can also receive arguments
// because, remember, they are just function expressions.
// And so we can pass arguments into them.
// And that's what we're gonna do with this module.
// We'll pass the other two modules as arguments
// to the controller so that this controller knows
// about the other two and can connect them.

controller.init();

