const saveBtn = document.querySelector('#save-plant');

createPlant = async (event) => {
    event.preventDefault();
  
    const plant = document.querySelector('#plant-name').value.trim();

  
    if (plant) {
      const response = await fetch(`/api/myplants`, {
        method: 'POST',
        body: JSON.stringify({ content: plant }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/myplants`);
      } else {
        alert('Failed to create plant.');
      }
    }
  };

  saveBtn.addEventListener("click", createPlant)