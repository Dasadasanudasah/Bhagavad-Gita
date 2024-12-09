document.addEventListener("DOMContentLoaded", function() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;

        const updateCounter = () => {
            const increment = target / 100;
            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count);
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target;
            }
        };

        updateCounter();
    });
});


   // Select the current chapter (chapterIndex) from the list
   const chapterListItem = document.getElementsByTagName("li")[chapterIndex];
    
   // Check if description already exists for this chapter
   const existingDescription = chapterListItem.querySelector('.chapter-description');
   
   if (existingDescription) {
       // If description exists, remove it (toggle effect)
       existingDescription.remove();
   } else {
       // Create a new description div and insert it below the chapter title
       const descriptionDiv = document.createElement("div");
       descriptionDiv.classList.add("chapter-description");
       descriptionDiv.innerHTML = `<p><b>${chapterSummaries[chapterIndex].title}</b></p>${chapterSummaries[chapterIndex].summary}`;
       
       // Append the description inside the same <li> element (below the chapter title)
       chapterListItem.appendChild(descriptionDiv);
       
       // Apply Aksharamukha conversion only to Devanagari text
       convertToDevanagari();
   }

function convertToDevanagari() {
   // Dynamically load the Aksharamukha script
   const aksharamukhaScript = document.createElement('script');
   aksharamukhaScript.src = "https://cdn.jsdelivr.net/gh/virtualvinodh/aksharamukha/aksharamukha-web-plugin/aksharamukha-v3.js?class=inputscript-Devanagari";
   
   // Wait for the script to load before calling Aksharamukha
   aksharamukhaScript.onload = function() {
       // Select the elements that contain Devanagari script
       const devanagariText = document.querySelectorAll('.chapter-description p, .chapter-description b'); // or any other tag containing text
       
       // Add Aksharamukha class for Devanagari
       devanagariText.forEach(element => {
           // Only convert the text that is in Devanagari script
           if (element.innerHTML.match(/[अ-ह]/)) { // Checks if the text has Devanagari characters
               element.classList.add('inputscript-Devanagari'); // Add Aksharamukha class for Devanagari
           }
       });

       // Trigger Aksharamukha conversion for the 'inputscript-Devanagari' class
       Aksharamukha.convert();
   };

   // Append the Aksharamukha script to the document head
   document.head.appendChild(aksharamukhaScript);
}
