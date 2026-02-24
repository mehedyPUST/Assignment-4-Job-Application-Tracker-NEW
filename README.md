1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

getElementById returns a single element object that matches the specified ID attribute. It is the fastest method because IDs must be unique in a document.

getElementsByClassName returns a live HTMLCollection of all elements that have the specified class name. It is "live" meaning it automatically updates when DOM changes occur.

querySelector returns the first element that matches any CSS selector (like class, ID, tag, or complex selectors). It is more versatile but slower than getElementById.

querySelectorAll returns a static NodeList of all elements matching any CSS selector. It is "static" meaning it does not update when DOM changes occur.




2. 
Ans:
These Lines are commented because it creates something odd in GitHub

<!-- 
<!DOCTYPE html>
<html>

<head>
    <title>DOM Manipulation</title>
</head>

<body>
    <h2>Click The Below Button to Add Another Paragraph</h2>


    <div id="container">
        <p>Hello Programming Hero B-13</p>
    </div>

    <button onclick="addElement()">Click To Add</button>

    <script>
        function addElement() {
            // create a new element p
            let para = document.createElement('p');
            para.innerText = 'This the Answer of the question no 2 of the assignment';
            para.style.color = 'blue';

            // append 
            let container = document.getElementById('container');
            container.appendChild(para);
        }
    </script>
</body>

</html>" -->

3. What is Event Bubbling? And how does it work?

Event Bubbling is a DOM event propagation mechanism where an event triggered on a nested element travels upward through its ancestor elements in the DOM hierarchy.

How it works:
When an event occurs on an element (like a button click), the event first runs on that element itself. Then it "bubbles up" to its parent element, then to the parent's parent, and continues until it reaches the document root (html element).

For example, if I click a button inside a div, the click event will trigger on:

The button first

Then the div containing it

Then any parent elements above it

This happens automatically unless I stop the propagation.

4. What is Event Delegation in JavaScript? Why is it useful?

Event Delegation is a technique where I attach a single event listener to a parent element to handle events for multiple current or future child elements, instead of attaching separate listeners to each child.

Why it is useful:

Performance Improvement: It reduces memory usage by using fewer event listeners, especially when dealing with many elements.

Handles Dynamic Content: It automatically works for elements added to the DOM after the event listener is attached, without needing me to add new listeners.

Cleaner Code: It results in simpler, more maintainable code by centralizing event handling logic.

Example: Instead of adding click handlers to 100 list items individually, I add one handler to the parent <ul> and check which <li> was clicked using event.target.


5. What is the difference between preventDefault() and stopPropagation() methods?

preventDefault() cancels the browser's default behavior for an event but does not stop the event from propagating through the DOM. For example, it prevents:

A form from submitting

A link from navigating to its href

A checkbox from checking/unchecking

stopPropagation() prevents the event from bubbling up to parent elements or capturing down to child elements, but does not prevent any default browser behavior.

Key differences:

preventDefault() stops default browser actions; stopPropagation() stops event flow through DOM

I can use them together or separately depending on my needs

preventDefault() does not affect event propagation; stopPropagation() does not affect default behavior

Example: Using preventDefault() on a link stops navigation; using stopPropagation() on a button inside a div stops the click from reaching the div's click handler