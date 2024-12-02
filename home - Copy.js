function skps(){
  const dataTampil= new Array();
const target= new Array();
const open= new Array();
const submitpcl= new Array();
const rejekpml= new Array();
const komplitpml= new Array();
const persentase= new Array();


const sheetID = 
'17EkSf-uDjEGPqWPGedUy4KxgwuYWDYVATe3YtDLJJm4';
const base = 'https://docs.google.com/spreadsheets/d/'+
sheetID+
'/gviz/tq?';
const sheetName = 'SKPS';
let qu = 'Select *';
const query = encodeURIComponent(qu);
const url = base+'&sheet='+sheetName+'&tq='+query;
const data = [];
init();
const output = document.querySelector('.output');

function init(){
  console.log('ready');
  fetch(url)
  .then(res => res.text())
  .then(rep => {
    const jsData = JSON.parse (rep.substr(47).slice(0,-2));
    console.log(jsData);
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

    if(Array.isArray(data)){
      // console.log('Tipe Datanya Array');
    } else {
      // console.log('Bukan Array');
    }
    var text = "";
    var updateWaktu = "";
    var r100 =0;
    var r99 = 0;
    var r70 = 0;
    var r33 = 0;
    text = "<table style='border: 1px solid black;'>";
    text = text+"<th style='border: 1px solid black; padding:1px;'>Kode Wilayah</th><th style='border: 1px solid black; padding:1px;'>Wilayah</th><th style='border: 1px solid black; padding:1px;'>Target</th><th style='border: 1px solid black; padding:1px;'>Open</th><th style='border: 1px solid black; padding:1px;'>Submit PCL</th><th style='border: 1px solid black; padding:1px;'>Reject PML</th><th style='border: 1px solid black; padding:1px;'>Completed PML</th><th style='border: 1px solid black; padding:1px;'>Persen</th>";
    data.forEach(kako => {
      if(kako.update!=null){
        updateWaktu = updateWaktu+kako.update;
        
      }
      text = text+"<tr style='margin-top:-10px'>";
      
      
      dataTampil.push(kako.wilayah);
      target.push(kako.target);
      open.push(kako.open);
      submitpcl.push(kako.submittedbypencacah);
      rejekpml.push(kako.rejectbypengawas);
      komplitpml.push(kako.completedbypengawas);

      persentase.push((Math.round(kako.persen * 100)/100));
      text = text + "<td style='border: 1px solid black; padding:0px;'>"+kako.kodewilayah+"</td>";
      text = text + "<td style='border: 1px solid black; padding:0px;'>"+kako.wilayah+"</td>";
      text = text + "<td style='border: 1px solid black; padding:0px;'>"+kako.target+"</td>";
      text = text + "<td style='border: 1px solid black; padding:0px;'>"+kako.open+"</td>";
      text = text + "<td style='border: 1px solid black; padding:0px;'>"+kako.submittedbypencacah+"</td>";
      text = text + "<td style='border: 1px solid black; padding:0px;'>"+kako.rejectbypengawas+"</td>";
      text = text + "<td style='border: 1px solid black; padding:0px;'>"+kako.completedbypengawas+"</td>";
      if((Math.round(kako.persen * 100)/100)=="100"){
        r100 = r100+1;
        text = text + "<td style='border: 1px solid black; padding:0px;'><p style='margin-bottom:-2px; background-color:#6EC207; color:#ffffff;'>"+(Math.round(kako.persen * 100)/100)+"</p></td>";
      } else if((Math.round(kako.persen * 100)/100)>=70 && (Math.round(kako.persen * 100)/100)<100){
        r99 = r99+1;
        text = text + "<td style='border: 1px solid black; padding:0px;'><p style='margin-bottom:-2px; background-color:#FFEB00; color:#000000;'>"+(Math.round(kako.persen * 100)/100)+"</p></td>";
      } else if((Math.round(kako.persen * 100)/100)>=33 && (Math.round(kako.persen * 100)/100)<70){
        r70 = r70+1;
        text = text + "<td style='border: 1px solid black; padding:0px;'><p style='margin-bottom:-2px; background-color:#FFAF00; color:#ffffff;'>"+(Math.round(kako.persen * 100)/100)+"</p></td>";
      } else {
        r33 = r33+1;
        text = text + "<td style='border: 1px solid black; padding:0px;'><p style='margin-bottom:-2px; background-color:#FF0000; color:#ffffff;'>"+(Math.round(kako.persen * 100)/100)+"</p></td>";
      }
      
      
      text = text+"</tr>";
      
    });
    text = text + "</table>";
    var convert_time = updateWaktu.toString();
    document.getElementById('r100').innerHTML = r100;
    document.getElementById('r99').innerHTML = r99;
    document.getElementById('r70').innerHTML = r70;
    document.getElementById('r33').innerHTML = r33;
    document.getElementById('dataTabel').innerHTML = text;
    document.getElementById('update').innerHTML = "Progress Data per "+convert_time;
    document.getElementById('judulsurvei').innerHTML = "SKPS";
  })
}



//CHART SKNP
var options = {
  series: [{
    name: 'Realisasi',
    group: 'realis',
    data: persentase
  }],
  chart: {
  type: 'bar',
  height: 870
  },
  fill: {
    colors: ['#7C00FE']
  },
plotOptions: {
  bar: {
    horizontal: true,
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
    fontSize: '12px',
    colors: ['#000000']
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
  categories: dataTampil,
},
legend: {
  position: 'top',
  horizontalAlign: 'left',
  offsetX: 40
}
};

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();





}

function segar(){
  document.getElementById('sknp').innerHTML = "Monitoring Progress SKPS Kabupaten/Kota di Provinsi Sumatera Utara";
}