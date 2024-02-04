// Fyller 'data' och skriver ut tabellen vid start
window.onload = loadCourses;

let data = "";

async function loadCourses() {
  try {
    const datasource = await fetch(
      "https://dahlgren.miun.se/ramschema_ht23.php"
    );
    data = await datasource.json();
    data.forEach((item) => {
      document.getElementById("table-data").innerHTML += `
          <tr>
          <td data-title="Kurskod">${item.code}</td>
          <td data-title="Kursnamn">${item.coursename}</td>
          <td data-title="Progression">${item.progression}</td>
          </tr>`;
    });
  } catch {
    document.getElementById(
      "table-data"
    ).innerHTML += `<tr><td colspan="3">Kunde inte ladda data ...</td></tr>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const resultTable = document.getElementById("table-data");

  // Hämtar ut vad som skrivs in i sökrutan och omvandlar till lower case
  searchInput.addEventListener("input", () => {
    let searchTerm = searchInput.value.toLowerCase();
    // Söker igenom data baserat på vad osm skrivits in och fyller 'filterData'
    let filterData = data.filter(
      (item) =>
        // OM kurskoden
        item.code.toLowerCase().includes(searchTerm) ||
        // ELLER kursnamnet
        item.coursename.toLowerCase().includes(searchTerm) ||
        // ELLER progression
        item.progression.toLowerCase().includes(searchTerm)
    );
    // Uppdaterar tabellen
    updateTable(filterData);
  });

  function updateTable(filterData) {
    resultTable.innerHTML = "";

    // Finns det ingen träff så meddelar vi det
    if (filterData.length === 0) {
      document.getElementById(
        "table-data"
      ).innerHTML += `<tr><td colspan="3">Ingen träff på sökordet ...</td></tr>`;
    } else {
      filterData.forEach((item) => {
        document.getElementById("table-data").innerHTML += `
            <tr>
            <td data-title="Kurskod">${item.code}</td>
            <td data-title="Kursnamn">${item.coursename}</td>
            <td data-title="Progression">${item.progression}</td>
            </tr>`;
      });
    }
  }
});
