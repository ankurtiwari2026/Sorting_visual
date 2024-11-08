const arrayContainer = document.getElementById("array-container");
const description = document.getElementById("description");
const algorithmSelect = document.getElementById("algorithm-select");
const speedRange = document.getElementById("speed-range");
const speedValueDisplay = document.getElementById("speed-value");
let array = [];
let speed = 300;  // Initial speed

// Update speed based on slider
speedRange.addEventListener("input", () => {
    speed = 600 / speedRange.value;
    speedValueDisplay.textContent = `${speedRange.value}x`;
});

// Generate a random array and render it
function generateArray(size) {
    array = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    renderArray(array);
}

// Render the array as bars in the container
function renderArray(arr) {
    arrayContainer.innerHTML = "";
    arr.forEach(value => {
        const bar = document.createElement("div");
        bar.classList.add("bar", "default");
        bar.style.height = `${value * 3}px`;
        arrayContainer.appendChild(bar);
    });
}

// Delay function for visualization
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Start sorting visualization based on selected algorithm
async function startVisualization() {
    const algorithm = algorithmSelect.value;
    if (algorithm === "bubble") {
        description.innerHTML = "Bubble Sort: Repeatedly swapping adjacent elements if they are in the wrong order.";
        await bubbleSort();
    } else if (algorithm === "selection") {
        description.innerHTML = "Selection Sort: Selecting the minimum element from the unsorted portion and placing it in the sorted portion.";
        await selectionSort();
    } else if (algorithm === "insertion") {
        description.innerHTML = "Insertion Sort: Placing each element in its correct position within the sorted portion of the array.";
        await insertionSort();
    }
}

// Bubble Sort visualization
async function bubbleSort() {
    const bars = document.querySelectorAll(".bar");
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].classList.add("comparing");
            bars[j + 1].classList.add("comparing");
            await delay(speed);

            if (array[j] > array[j + 1]) {
                bars[j].classList.remove("default");
                bars[j + 1].classList.remove("default");
                bars[j].classList.add("swapping");
                bars[j + 1].classList.add("swapping");

                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                renderArray(array);
                await delay(speed);
            }

            bars[j].classList.remove("comparing", "swapping");
            bars[j + 1].classList.remove("comparing", "swapping");
        }
        bars[array.length - i - 1].classList.add("sorted");
    }
}

// Selection Sort visualization
async function selectionSort() {
    const bars = document.querySelectorAll(".bar");
    for (let i = 0; i < array.length - 1; i++) {
        let minIdx = i;
        bars[i].classList.add("comparing");

        for (let j = i + 1; j < array.length; j++) {
            bars[j].classList.add("comparing");
            await delay(speed);

            if (array[j] < array[minIdx]) {
                bars[minIdx].classList.remove("comparing");
                minIdx = j;
            }
            bars[j].classList.remove("comparing");
        }

        if (minIdx !== i) {
            [array[i], array[minIdx]] = [array[minIdx], array[i]];
            renderArray(array);
            await delay(speed);
        }
        bars[i].classList.remove("comparing");
        bars[i].classList.add("sorted");
    }
}

// Insertion Sort visualization
async function insertionSort() {
    const bars = document.querySelectorAll(".bar");
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        bars[i].classList.add("comparing");
        await delay(speed);

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            renderArray(array);
            bars[j].classList.add("swapping");
            await delay(speed);
            bars[j].classList.remove("swapping");
            j -= 1;
        }

        array[j + 1] = key;
        renderArray(array);
        bars[i].classList.add("sorted");
    }
}

// Initialize with a random array
generateArray(20);
