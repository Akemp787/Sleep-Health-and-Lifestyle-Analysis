const genderDropdown = document.getElementById('genderDropdown');
const plotDiv = document.getElementById('plotDiv');

// Function to fetch CSV data
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.text();
    return data;
}

// Load CSV data and create plot
async function createPlot(selectedGender) {
    // Fetch CSV data based on selected gender
    const ageData = await fetchData(`Resources/Database_CSVs/person${selectedGender}.csv`);
    const occupationData = await fetchData(`Resources/Database_CSVs/occupation_${selectedGender}.csv`);
    const sleepDurationData = await fetchData(`Resources/Database_CSVs/sleep_duration_${selectedGender}.csv`);
    const sleepQualityData = await fetchData(`Resources/Database_CSVs/sleep_quality_${selectedGender}.csv`);
    const stressLevelData = await fetchData(`Resources/Database_CSVs/stress_level_${selectedGender}.csv`);

    // Convert CSV data to arrays // Skip header row
    const ages = ageData.split('\n').slice(1).map(Number); 
    const occupations = occupationData.split('\n').slice(1).map(Number);
    const sleepDurations = sleepDurationData.split('\n').slice(1).map(Number);
    const sleepQualities = sleepQualityData.split('\n').slice(1).map(Number);
    const stressLevels = stressLevelData.split('\n').slice(1).map(Number);

    // Update or create the plot
    Plotly.newPlot(plotDiv, [{
        x: ages,
        y: sleepDurations,
        mode: 'markers',
        type: 'scatter',
        marker: {
            size: sleepQualities,
            color: stressLevels,
            colorscale: 'Viridis',
            opacity: 0.5
        }
    }]);
}

// Initial plot creation
createPlot('male'); 

// Dropdown event handler
genderDropdown.addEventListener('change', function() {
    const selectedGender = this.value;
    createPlot(selectedGender);
});
