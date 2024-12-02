var nama_tim_b= new Array();
var nama_kegiatan_b= new Array();
var target_b= new Array();
var realisasi_b= new Array();
var generate_tabel = "";
var persen= 0;

const sheetID_d = 
'16HGYgOq1L1edij5ePeCEU2Hvliv8vP7mTjs1q3LpJpg';
const base_d = 'https://docs.google.com/spreadsheets/d/'+
sheetID_d+
'/gviz/tq?';
const sheetName_d = 'Beranda';
let qu_d = 'Select *';
const query_d = encodeURIComponent(qu_d);
const url_d = base_d+'&sheet='+sheetName_d+'&tq='+query_d;
const data_d = [];
init();
const output_d = document.querySelector('.output');

function init(){
  // console.log('ready');
  fetch(url_d)
  .then(res => res.text())
  .then(rep => {
    const jsData_d = JSON.parse (rep.substr(47).slice(0,-2));
    // console.log(jsData_d);
    const colz_d = [];
    jsData_d.table.cols.forEach((heading) => {
      if (heading.label) {
        colz_d.push(heading.label.toLowerCase().replace(/\s/g, ''));
      }
    })
    jsData_d.table.rows.forEach((main) => {
      const row_d = {};
      colz_d.forEach((ele, ind) => {
        row_d[ele] = (main.c[ind] !=null) ? main.c[ind].v : '';
      })
      data_d.push(row_d);
      
    })

    // console.log(data_d);
    generate_tabel = generate_tabel + "<table id='tampil_tabel_kegiatan' class='table table-striped table-hover'>";
    generate_tabel = generate_tabel + "<thead><tr>";
    generate_tabel = generate_tabel + "<th onclick='sortNumerik(0)' class='table_header'>Nomor</th>";
    generate_tabel = generate_tabel + "<th onclick='sortTable(1)' class='table_header'>Nama Tim</th>";
    generate_tabel = generate_tabel + "<th onclick='sortTable(2)' class='table_header'>Nama Kegiatan</th>";
    generate_tabel = generate_tabel + "<th onclick='sortNumerik(3)' class='table_header'>Target</th>";
    generate_tabel = generate_tabel + "<th onclick='sortNumerik(4)' class='table_header'>Realisasi</th>";
    generate_tabel = generate_tabel + "<th  onclick='sortNumerik(5)' class='table_header'>Persentase (%)</th>";
    generate_tabel = generate_tabel + "<th  onclick='sortTable(6)' class='table_header'>Terakhir Update</th>";
    generate_tabel = generate_tabel + "</tr></thead>";

    data_d.forEach(dasbod => {
        nama_tim_b.push(dasbod.namatim);
        nama_kegiatan_b.push(dasbod.namakegiatan);
        target_b.push(dasbod.target);
        realisasi_b.push(dasbod.realisasi);
        persen = Math.round(dasbod.realisasi/dasbod.target*10000)/100;

      generate_tabel = generate_tabel + "<tr>";
      generate_tabel = generate_tabel + "<td>"+dasbod.no+"</td>";
      generate_tabel = generate_tabel + "<td>"+dasbod.namatim+"</td>";
      generate_tabel = generate_tabel + "<td>"+dasbod.namakegiatan+"</td>";
      generate_tabel = generate_tabel + "<td>"+dasbod.target+"</td>";
      generate_tabel = generate_tabel + "<td>"+dasbod.realisasi+"</td>";

      if(persen>=100){
        generate_tabel = generate_tabel + "<td><p style='padding:10px; background-color:green; color:white; border-radius: 10px;'>"+persen+"</p></td>";
      } else if(persen>=30 && persen<100){
        generate_tabel = generate_tabel + "<td><p style='padding:10px; background-color:yellow; border-radius: 10px;'>"+persen+"</p></td>";
      } else if(persen<30){
        generate_tabel = generate_tabel + "<td><p style='padding:10px; background-color:red; border-radius: 10px;'>"+persen+"</p></td>";
      } else {
        persen = Number(0);
        generate_tabel = generate_tabel + "<td>"+persen+"</td>";
        
      }

      generate_tabel = generate_tabel + "<td>"+dasbod.tgl_update+"</td>";

      
      generate_tabel = generate_tabel + "</tr>";
    });
    generate_tabel = generate_tabel + "</table>";
    document.getElementById('d_progress').innerHTML = generate_tabel;
    
    
  })
}

function b_tlb() {
  var hitung="";

    if (hitung=="genap") {
      document.getElementById('tlb').innerHTML = "Tampilkan Lebih Banyak";
      hitung=="ganjil";
    } else if(hitung=="ganjil" || hitung==""){
      document.getElementById('tlb').innerHTML = "Tampilkan";
      hitung=="genap";
    }
    // hitung = hitung+1;
    console.log(hitung);
}