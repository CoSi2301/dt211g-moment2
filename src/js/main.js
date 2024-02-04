// ------

window.onload = showCourses;

async function showCourses() {
  try {
    const datasource = await fetch(
      "https://dahlgren.miun.se/ramschema_ht23.php"
    );
    const data = await datasource.json();
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
    ).innerHTML += `Kunde inte ladda data ...`;
  }
}
