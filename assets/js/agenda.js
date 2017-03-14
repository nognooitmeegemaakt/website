
// Delegate a click to the handler.
$('#print-button').click(handlePrintOrder)

function handlePrintOrder(event) {

  // Create a new JS PDF instance.
  var doc = new jsPDF()

  // Get the page title.
  var title = $('.header h1').text()

  // Get the page's subtitle and footnote
  var subtitle = $('.text p:first-of-type').text()
  var footnote = $('.text p:last-of-type').last().text()

  // Add the title and subtitle to the document.
  doc.setFontSize(30)
  doc.text(15, 20, title)
  doc.setFontSize(12)
  doc.text(15, 30, subtitle)

  // Parse the table's tr contents.
  var table = $('table tr')

  // Set columns and empty rows array.
  var columns = [ "Datum", "Programma" ]
  var rows = []

  // Extract rows from the table and push them into the rows array.
  $(table).each(function (index) {
    var tds = $(table[index]).find('td')
    var date = tds[0]
    var item = tds[1]
    rows.push([ date, item ])
  })

  // Generate a table from the extracted rows and columns.
  var options = {
    startY: 40,
    headerStyles: { fillColor: [255, 139, 0] }
  }
  doc.autoTable(columns, rows, options)

  // Add footnote.
  doc.setFontSize(11)
  doc.text(10, 285, footnote)

  // Save the document.
  var filename = subtitle.replace(/ /g, '_').replace('-', '').replace('__', '_')
  doc.save(filename + '.pdf')

}
