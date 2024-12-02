var no_tim= new Array();
var no_kegiatan= new Array();
var nama_tim= new Array();
var nama_tim_tanpafilter= new Array();
var tim_filter= new Array();
var nama_kegiatan= new Array();
var kegiatan_filter= new Array();
var target= new Array();
var realisasi= new Array();
var persentaseRealisasi= new Array();
var id_link= new Array();
var tgl_update= new Array();
var tgl_update_filter= new Array();

const sheetID1 = 
'16HGYgOq1L1edij5ePeCEU2Hvliv8vP7mTjs1q3LpJpg';
const base1 = 'https://docs.google.com/spreadsheets/d/'+
sheetID1+
'/gviz/tq?';
const sheetName1 = 'Beranda';
let qu1 = 'Select *';
const query1 = encodeURIComponent(qu1);
const url1 = base1+'&sheet='+sheetName1+'&tq='+query1;
const data1 = [];
init();
const output1 = document.querySelector('.output');

function init(){
  var text ="<option value='#'>Pilih Tim</option>";
  // console.log('ready');
  fetch(url1)
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
      data1.push(row);
      
    })

    
    
    // console.log(data1);
    // cap_terendah3 = data1[2]["timcapaianterendah"];

    data1.forEach(dasbod => {
      
      if (!nama_tim.includes(dasbod.namatim)){
        nama_tim.push(dasbod.namatim);
        text = text + "<option value='"+dasbod.notim+"'>"+dasbod.namatim+"</option>";
      }
      nama_tim_tanpafilter.push(dasbod.namatim);

      // nama_tim.push(dasbod.namatim);
      no_tim.push(dasbod.notim);
      nama_kegiatan.push(dasbod.namakegiatan);
      no_kegiatan.push(dasbod.no);
      target.push(dasbod.target);
      realisasi.push(dasbod.realisasi);
      id_link.push(dasbod.id_link);
      tgl_update.push(dasbod.tgl_update);
      // persentaseRealisasi.push(Math.round(((realisasi/target) * 100)/100));
      
      
    });
    document.getElementById('stim').innerHTML = text;
  })
}

function ubah1(val){
  // var awal = "";
  var kegiatantext = "<option value='#'>Pilih Kegiatan</option>";
  var persenbulat = 0;
  for (let index = 0; index < nama_tim_tanpafilter.length; index++) {
    if(no_tim[index]==val){
      kegiatantext = kegiatantext + "<option value='"+no_kegiatan[index]+"'>"+nama_kegiatan[index]+"</option>";
        // persentaseRealisasi.push(Math.round((realisasi[index]/target[index]* 100)/100));
        persenbulat = Math.round(realisasi[index]/target[index]* 10000)/100;
        persentaseRealisasi.push(persenbulat);
        kegiatan_filter.push(nama_kegiatan[index]);
        tim_filter[0] = nama_tim_tanpafilter[index];
        tgl_update_filter.push(tgl_update[index]);
        
        // console.log("Realisasi Index: "+realisasi[index]);
        // console.log("Tim Filter: "+no_tim+", "+nama_tim+", "+index+", "+val);
    }
    
  }
  // document.getElementById('skegiatan').innerHTML = kegiatantext;
  // console.log("Persentase Realisasi: "+persentaseRealisasi);
  // console.log("Realisasi: "+realisasi);
  // console.log("Target: "+target);
  // console.log("nama kegiatan: "+kegiatan_filter);

  // CHART
var options = {
  series: [{
    name: 'Realisasi',
    group: 'realis',
    data: persentaseRealisasi
  }],
  chart: {
  type: 'bar',
  height: 370
  },
  fill: {
    colors: ['#0E022A']
  },
plotOptions: {
  bar: {
    horizontal: false,
    dataLabels: {
      position: 'top',
    },
  }
},
dataLabels: {
  enabled: true,
  offsetX: 0,
  textAnchor: 'middle',
  style: {
    fontSize: '16px',
    colors: ['#F9DD1C']
  }
},
stroke: {
  show: true,
  width: 1,
  colors: ['#fff']
},
tooltip: {
},
xaxis: {
  categories: kegiatan_filter,
},
legend: {
  position: 'top',
  horizontalAlign: 'left',
  offsetX: 40
}
};

// if(chart){
//   chart.destroy();
//   var chart = new ApexCharts(document.querySelector("#chart"), options);
//   chart.render();
//   console.log("Dari Destroy");
// } else {
var chart;
  // document.querySelector("#chart").innerHTML = "";
  // console.log("Nilai AWAL= "+awal);
  // console.log("Awal: "+awal[0]);
  
  // if (awal[0]==null) {
    
    // chart = new ApexCharts(document.querySelector("#chart"), options);
    // chart.render();
    // awal.push("1");
    // console.log("Tidak Dari Destroy");
  // } else if(awal[0]!=null) {
    // awal="1";
    // chart.destroy();
    // location.reload();
    // document.querySelectorAll("#chart").forEach(e => e[0].parentNode.removeChild(e));
    // document.getElementById("#stim").style.visibility = "collapse";
    var judul_chart1 = "<span style='background-color:#DDBDA8; border-radius:5px; color:#0E022A; padding:5px;'>Progress Tim: "+val+". "+tim_filter[0]+"</span><br>";
    var judul_chart = judul_chart + "<table class='table table-hover'><tr><th>Waktu Update</th><th>Nama Kegiatan</th><th>Progress</th></tr>";
    for (let i=0; i<kegiatan_filter.length; i++){
      judul_chart = judul_chart + "<tr><td><span style='background-color:#0E022A; border-radius:5px; color:white; padding:5px;'>("+tgl_update_filter[i]+")</span></td><td><span>"+kegiatan_filter[i]+"</span></td><td><span>"+persentaseRealisasi[i]+"% </span></td></tr>"; 
    }
    judul_chart = judul_chart + "</table><br>";
    
    document.getElementById("stim").style.display = "none";
    document.getElementById("refresh").style.visibility = "visible";
    document.getElementById("judul_chart1").innerHTML = judul_chart1; 
    document.getElementById("judul_chart").innerHTML = judul_chart;
    chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    // console.log("Dari Destroy");
  // }
  
  
  
  // chart.updateSeries([{
  //   data: [{
  //     x: persentaseRealisasi,
  //     y: kegiatan_filter
  //   }]
  // }]);
  // console.log("Tidak Dari Destroy");

// }


}

function refresh(){
  location.reload();
}

function progress1(val){
  // var awal = "";
  var kegiatantext = "<option value='#'>Pilih Kegiatan</option>";
  for (let index = 0; index < nama_tim_tanpafilter.length; index++) {
    if(no_tim[index]==val){
      kegiatantext = kegiatantext + "<option value='"+no_kegiatan[index]+"'>"+nama_kegiatan[index]+"</option>";
        // persentaseRealisasi.push(Math.round((realisasi[index]/target[index]* 100)/100));
        persentaseRealisasi.push(realisasi[index]/target[index]);
        kegiatan_filter.push(nama_kegiatan[index]);
        tim_filter[0] = nama_tim_tanpafilter[index];
        
        // console.log("Realisasi Index: "+realisasi[index]);
        // console.log("Tim Filter: "+no_tim+", "+nama_tim+", "+index+", "+val);
    }
    
  }
  document.getElementById('skegiatan').innerHTML = kegiatantext;
}


function tampil_tabel(val){

  var sum_target = 0;
  Number(sum_target);
  var sum_realisasi = 0;
  Number(sum_realisasi);

  // Nomor ke Index Array
  var cval = val-1;
  var waktu_update="";

  // console.log(id_link);
  // console.log(id_link[cval]);
  // console.log(nama_kegiatan[cval]);

  const sheetID2 = id_link[cval];
  // console.log(sheetID2);
  const base2 = 'https://docs.google.com/spreadsheets/d/'+
  sheetID2+
  '/gviz/tq?';
  const sheetName2 = nama_kegiatan[cval];
  let qu2 = 'Select *';
  const query2 = encodeURIComponent(qu2);
  const url2 = base2+'&sheet='+sheetName2+'&tq='+query2;
  const data2 = [];
  init2();
  const output2 = document.querySelector('.output');

  function init2(){
    var text ="<thead><tr><th onclick='sortTable(0)' class='table_header'>Kegiatan</th><th onclick='sortTable(1)' class='table_header'>Satuan</th><th onclick='sortTable(2)' class='table_header'>Deadline</th><th onclick='sortTable(3)' class='table_header'>Persentase</th><th onclick='sortTable(4)' class='table_header'>Target</th><th onclick='sortTable(5)' class='table_header'>Realisasi</th><th onclick='sortTable(6)' class='table_header'>Label</th><th onclick='sortTable(7)' class='table_header'>Keterangan</th></tr></thead>";
    text = text + "<tbody>";
    // console.log('ready');
    fetch(url2)
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
        data2.push(row);
        
      })
      // console.log(data2);
      data2.forEach(dasbod => {

        var kegiatanp = new Array();
        var deadline = new Array();
        var persentase = new Array();
        var target = new Array();
        var realisasi = new Array();
        var label = new Array();
        var keterangan = new Array();
        var satuan = new Array();
        
        waktu_update = data2[0]["update"];

        if(dasbod.target==""){
          // console.log("Masuk Sama");

        } else if(dasbod.target!=""){

          
          kegiatanp.push(dasbod.kegiatan);
          deadline.push(dasbod.deadline);
          persentase.push(Math.round(dasbod.persen * 100)/100);
          target.push(dasbod.target);
          realisasi.push(dasbod.realisasi);
          satuan.push(dasbod.satuan);
          // label.push("Label");
          keterangan.push(dasbod.keterangan);

          sum_target = sum_target + Number(target);
          sum_realisasi = sum_realisasi + Number(realisasi);

          if(persentase>=100){
            label.push("<p style='padding:7px; background-color:green; color:white;'>Selesai! &nbsp; <i class='fa fa-thumbs-o-up'></i></p>");
          } else if(persentase>=30 && persentase<100){
            label.push("<p style='padding:7px; background-color:yellow; color:black;'>Progres! &nbsp; <i class='fa fa-gears'></i></p>");
          } else if(persentase<30){
            label.push("<p style='padding:7px; background-color:red; color:white;'>Perhatian!&nbsp; <i class='fa fa-bolt'></i></p>");
          }

          // label.push(Math.round((target/realisasi*100) * 100)/100);

          text = text +"<tr><td>"+kegiatanp+"</td><td>"+satuan+"</td><td>"+deadline+"</td><td>"+persentase+"</td><td>"+target+"</td><td>"+realisasi+"</td><td>"+label+"</td><td>"+keterangan+"</td></tr>";
        
          // console.log("Masuk Tidak Sama");
        }

        

        

        
        
      });

      

      var realisasi_total = Math.round(sum_realisasi/sum_target*10000)/100;
      var ringkas_tabel = "<h4>Progress Kegiatan "+ nama_kegiatan[cval]+": <span style='padding:7px; background-color:#0E022A; color:white;'>"+ realisasi_total+"%</span></h4>";
      ringkas_tabel = ringkas_tabel + "<br>";
      ringkas_tabel = ringkas_tabel + "<h4>Waktu Update : "+ waktu_update;
      // console.log(sum_realisasi);
      // console.log(sum_target);
      text = text + "</tbody>";
      document.getElementById('tampil_tabel_kegiatan').innerHTML = text;
      var urlklik = 'https://docs.google.com/spreadsheets/d/'+id_link[cval];
      document.getElementById('ubah').innerHTML = "Ubah Data "+ nama_kegiatan[cval];
      // console.log(urlklik);
      document.getElementById("ubah").style.visibility = "visible";
      document.getElementById("ubah").href = urlklik;
      document.getElementById("ringkas_tabel").innerHTML = ringkas_tabel;
    })
  }
  
}