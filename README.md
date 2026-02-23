1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Ans:
Returns: A single element (or null if not found)

Selector: Uses ID only (without # or (dot) symbol)

Performance: Fastest method 

Live Collection: No (returns a static element)




2. 
Ans:

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

</html>