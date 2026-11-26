function doPost(e) {
  var formData = parseFormData(e);
  console.log("Données extraites : " + JSON.stringify(formData));

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetName = 'Reseau_Vente_RENAISSANCE';
  var sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    var headers = [
      "ID", "Date", "Agence", "Responsable",
      "Téléphone", "WhatsApp", "E-mail", "Commune", "Agrément",
      "Disponibilité", "Source", "Statut"
    ];
    sheet.appendRow(headers);
    sheet.getRange("A1:L1").setFontWeight("bold").setBackground("#E3000F").setFontColor("#FFFFFF");
    sheet.setFrozenRows(1);
    sheet.setColumnWidths(1, 12, 150);
  }

  var id = Utilities.getUuid();
  var date = new Date();
  var source = formData.utm_source || "Direct";
  if (formData.utm_campaign) {
    source = source + " (" + formData.utm_campaign + ")";
  }

  sheet.appendRow([
    id,
    date,
    formData.agence || "",
    formData.responsable || "",
    formData.telephone || "",
    formData.whatsapp || "",
    formData.email || "",
    formData.commune || "",
    formData.agrement || "",
    formData.disponibilite || "",
    source,
    "NOUVEAU"
  ]);

  return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function parseFormData(e) {
  if (!e) return {};
  if (e.parameter && Object.keys(e.parameter).length > 0) {
    return e.parameter;
  }
  if (e.postData && e.postData.contents) {
    var raw = e.postData.contents;
    try {
      return JSON.parse(raw);
    } catch (err) {
      var result = {};
      var pairs = raw.split('&');
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        if (pair.length >= 1) {
          var key = decodeURIComponent(pair[0].replace(/\+/g, ' '));
          var val = pair.length > 1 ? decodeURIComponent(pair.slice(1).join('=').replace(/\+/g, ' ')) : '';
          result[key] = val;
        }
      }
      return result;
    }
  }
  return {};
}
