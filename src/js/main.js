// Skapar tabellraderna
function tableRows(data) {
  return data
    .map(
      (item) =>
        `<tr>
              <td data-title="Kurskod">${item.code}</td>
              <td data-title="Kursnamn">${item.coursename}</td>
              <td data-title="Progression">${item.progression}</td>
            </tr>`
    )
    .join("");
}

// Fyller 'data' och skriver ut tabellen vid start
window.onload = loadCourses;

let data = "";

// ------------------------------------------------------------------------------------------------
// TABELLSTART ------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------ TABELLSTART
async function loadCourses() {
  try {
    const datasource = await fetch(
      "https://dahlgren.miun.se/ramschema_ht23.php"
    );
    data = await datasource.json();
    // Skriver ut tabellen
    document.getElementById("table-data").innerHTML = tableRows(data);
  } catch {
    document.getElementById(
      "table-data"
    ).innerHTML = `<tr><td colspan="3">Kunde inte ladda data ...</td></tr>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------------------------------------------------------------------------
  // SÖKUNKTIONEN -----------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------- SÖKFUNKTIONEN
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
    // Tömmer tabellen
    resultTable.innerHTML = "";
    // Finns det ingen träff så meddelar vi det
    if (filterData.length === 0) {
      document.getElementById(
        "table-data"
      ).innerHTML = `<tr><td colspan="3">Ingen träff på sökordet ...</td></tr>`;
    } else {
      // ANNARS skriver vi ut det
      document.getElementById("table-data").innerHTML = tableRows(filterData);
    }
  }
  // ------------------------------------------------------------------------------------------------
  // SORTERA ----------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------- SORTERA

  // Första sorteringsordning
  const sortOrder = { 0: "asc", 1: "asc", 2: "asc" };

  // Klick på rubriker
  document.querySelectorAll(".sort-header").forEach((header) => {
    header.addEventListener("click", function (e) {
      e.preventDefault();
      const column = this.getAttribute("data-column");
      dataSort(column, sortOrder[column]);
      // Växlar sorteringsordningen
      sortOrder[column] = sortOrder[column] === "asc" ? "desc" : "asc";
    });
  });

  // I mobilt läge - select med options (asc och desc)
  document.querySelectorAll(".sort-select").forEach((select) => {
    select.addEventListener("change", function () {
      const column = this.getAttribute("data-column");
      const order = this.value;
      dataSort(column, order);
    });
  });

  // Sorterar data
  function dataSort(column, order) {
    const sortedData = data.sort((a, b) => {
      const firstVal = Object.values(a)[column].toLowerCase();
      const secondVal = Object.values(b)[column].toLowerCase();
      return order === "asc"
        ? firstVal.localeCompare(secondVal)
        : secondVal.localeCompare(firstVal);
    });

    // Skriver ut sorterad data till tabellen
    document.getElementById("table-data").innerHTML = tableRows(sortedData);
  }
});
