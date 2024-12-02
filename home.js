const sheetID = 
'16HGYgOq1L1edij5ePeCEU2Hvliv8vP7mTjs1q3LpJpg';
const base = 'https://docs.google.com/spreadsheets/d/'+
sheetID+
'/gviz/tq?';
const sheetName = 'Dashboard';
let qu = 'Select *';
const query = encodeURIComponent(qu);
const url = base+'&sheet='+sheetName+'&tq='+query;
const data = [];
init();
const output = document.querySelector('.output');

function init(){
  // console.log('ready');
  fetch(url)
  .then(res => res.text())
  .then(rep => {
    const jsData = JSON.parse (rep.substr(47).slice(0,-2));
    // console.log(jsData);
    const colz = [];
    jsData.table.cols.forEach((heading) => {
      if (heading.label) {
        colz.push(heading.label.toLowerCase().replace(/\s/g, ''));
      }
    })
    jsData.table.rows.forEach((main) => {
      const row = {};
      colz.forEach((ele, ind) => {
        row[ele] = (main.c[ind] !=null) ? main.c[ind].v : '';
      })
      data.push(row);
      
    })

    var capaian_total ="";
    var jumlah_kegiatan ="";
    var jumlahuraiankegiatan ="";
    var tim_terbanyak1 ="";
    var tim_terbanyak2 ="";
    var tim_terbanyak3 ="";
    var tim_tersedikit1 ="";
    var tim_tersedikit2 ="";
    var tim_tersedikit3 ="";
    var cap100 ="";
    var cap60_99 ="";
    var cap30_60 ="";
    var cap30 ="";
    var order1_1 ="";
    var order1_2 ="";
    var order1_3 ="";
    var order2_1 ="";
    var order2_2 ="";
    var order2_3 ="";
    var order3_1 ="";
    var order3_2 ="";
    var order3_3 ="";
    var order4_1 ="";
    var order4_2 ="";
    var order4_3 ="";
    var cap_tertinggi1 ="";
    var cap_tertinggi2 ="";
    var cap_tertinggi3 ="";
    var cap_terendah1 ="";
    var cap_terendah2 ="";
    var cap_terendah3 ="";
    
    // console.log(data);
    // console.log(data[0]["capaian_total"]);
    
    capaian_total = Math.round(data[0]["capaian_total"] * 100)/100 +  "%";
    // console.log("Total Capaian "+capaian_total);
    jumlah_kegiatan = data[0]["jumlahkegiatan"];
    jumlahuraiankegiatan = data[0]["jumlahuraiankegiatan"];
    rata_ratauraiankegiatanperkegiatan = Math.round(data[0]["rata_ratauraiankegiatanperkegiatan"] * 100)/100;
    tim_terbanyak1 = data[0]["timkegiatanterbanyak"];
    tim_terbanyak2 = data[1]["timkegiatanterbanyak"];
    tim_terbanyak3 = data[2]["timkegiatanterbanyak"];
    order1_1 = data[0]["order1"];
    order1_2 = data[1]["order1"];
    order1_3 = data[2]["order1"];

    tim_tersedikit1 = data[0]["timkegiatantersedikit"];
    tim_tersedikit2 = data[1]["timkegiatantersedikit"];
    tim_tersedikit3 = data[2]["timkegiatantersedikit"];
    order2_1 = data[0]["order2"];
    order2_2 = data[1]["order2"];
    order2_3 = data[2]["order2"];

    cap100 = data[0]["tim100persen"];
    cap60_99 = data[0]["tim60_99persen"];
    cap30_60 = data[0]["tim30_60persen"];
    cap30 = data[0]["tim_30persen"];

    cap_tertinggi1 = data[0]["timcapaiantertinggi"];
    cap_tertinggi2 = data[1]["timcapaiantertinggi"];
    cap_tertinggi3 = data[2]["timcapaiantertinggi"];
    order3_1 = Math.round(data[0]["order3"]*100)/100;
    order3_2 = Math.round(data[1]["order3"]*100)/100;
    order3_3 = Math.round(data[2]["order3"]*100)/100;

    cap_terendah1 = data[0]["timcapaianterendah"];
    cap_terendah2 = data[1]["timcapaianterendah"];
    cap_terendah3 = data[2]["timcapaianterendah"];
    order4_1 = Math.round(data[0]["order4"]*100)/100;
    order4_2 = Math.round(data[1]["order4"]*100)/100;
    order4_3 = Math.round(data[2]["order4"]*100)/100;

    var terbanyak = "<table class='table table-hover'><tr><td>1.</td><td><p style='font-size:12pt;'>"+tim_terbanyak1+"<br><span style='font-size:8pt; background-color: #0E022A; color: white; border-radius: 5px; padding: 5px;'>("+order1_1+" Kegiatan)</span></p></td></tr><tr><td> 2.</td><td> <p style='font-size:12pt;'>"+tim_terbanyak2+"<br><span style='font-size:8pt; background-color: #0E022A; color: white; border-radius: 5px; padding: 5px;'>("+order1_2+" Kegiatan)</span></p></td></tr><tr><td> 3.</td><td><p style='font-size:12pt;'>"+tim_terbanyak3+"<br><span style='font-size:8pt; background-color: #0E022A; color: white; border-radius: 5px; padding: 5px;'>("+order1_3+" Kegiatan)</span></p></td></tr></table>";
    var tersedikit = "<table class='table table-hover'><tr><td>1.</td><td><p style='font-size:12pt;'>"+tim_tersedikit1+"<br><span style='font-size:8pt; background-color: #0E022A; color: white; border-radius: 5px; padding: 5px;'>("+order2_1+" Kegiatan)</span></p></td></tr><tr><td> 2.</td><td> <p style='font-size:12pt;'>"+tim_tersedikit2+"<br><span style='font-size:8pt; background-color: #0E022A; color: white; border-radius: 5px; padding: 5px;'>("+order2_2+" Kegiatan)</span></p></td></tr><tr><td> 3.</td><td><p style='font-size:12pt;'>"+tim_tersedikit3+"<br><span style='font-size:8pt; background-color: #0E022A; color: white; border-radius: 5px; padding: 5px;'>("+order2_3+" Kegiatan)</span></p></td></tr></table>";

    var tertinggi = "<table class='table table-hover'><tr><td>1.</td><td><p style='font-size:12pt;'>"+cap_tertinggi1+"<br><span style='font-size:8pt; background-color: green; color: white; border-radius: 5px; padding: 5px;'>("+order3_1+" Persen)</span></p></td></tr><tr><td> 2.</td><td> <p style='font-size:12pt;'>"+cap_tertinggi2+"<br><span style='font-size:8pt; background-color: green; color: white; border-radius: 5px; padding: 5px;'>("+order3_2+" Persen)</span></p></td></tr><tr><td> 3.</td><td><p style='font-size:12pt;'>"+cap_tertinggi3+"<br><span style='font-size:8pt; background-color: green; color: white; border-radius: 5px; padding: 5px;'>("+order3_3+" Persen)</span></p></td></tr></table>";
    var terendah = "<table class='table table-hover'><tr><td>1.</td><td><p style='font-size:12pt;'>"+cap_terendah1+"<br><span style='font-size:8pt; background-color: red; color: white; border-radius: 5px; padding: 5px;'>("+order4_1+" Persen)</span></p></td></tr><tr><td> 2.</td><td> <p style='font-size:12pt;'>"+cap_terendah2+"<br><span style='font-size:8pt; background-color: red; color: white; border-radius: 5px; padding: 5px;'>("+order4_2+" Persen)</span></p></td></tr><tr><td> 3.</td><td><p style='font-size:12pt;'>"+cap_terendah3+"<br><span style='font-size:8pt; background-color: red; color: white; border-radius: 5px; padding: 5px;'>("+order4_3+" Persen)</span></p></td></tr></table>";
    
    document.getElementById('k1').innerHTML = capaian_total;
    document.getElementById('k2').innerHTML = jumlah_kegiatan;
    document.getElementById('k3').innerHTML = jumlahuraiankegiatan;
    document.getElementById('k4').innerHTML = rata_ratauraiankegiatanperkegiatan;
    document.getElementById('k5').innerHTML = terbanyak;
    document.getElementById('k6').innerHTML = tersedikit;
    document.getElementById('k7').innerHTML = cap100;
    document.getElementById('k8').innerHTML = cap60_99;
    document.getElementById('k9').innerHTML = cap30_60;
    document.getElementById('k10').innerHTML = cap30;
    document.getElementById('k11').innerHTML = tertinggi;
    document.getElementById('k12').innerHTML = terendah;
    document.getElementById("memuat").style.display = "none";
  })
}