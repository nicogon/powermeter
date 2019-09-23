module.exports = function reportsRepository(Report, Medition, PuntualMedition) {
  return {
    list,
    del,
    saveReport,
    getReport
  };

  function createPuntualMeditions(newReport) {
    const puntualMeditions = newReport.meditions[0].puntualMedition.map((element) => {
      // eslint-disable-next-line no-param-reassign
      element.meditionId = newReport.meditions[0].dispoId;
      PuntualMedition.create(element);
    });
  }

  async function saveReport(newReport) {
 try{

  createPuntualMeditions(newReport);
  const pepe =  Report.create(newReport,{  include: [{
    model: Medition,
     as: 'meditions'
 //    attributes: ['id']
//  required: false
   }]}).catch(console.log).then(() => console.log('All Done :)'));


 }catch(e){console.log(e)}

 console.log("sss")
   console.log(pepe,"asdasd")
  }

  async function del(reportId) {}

  async function getReport(reportId) {

   const report = await Report.findByPk(parseInt(reportId),{
      include: [{
        model: Medition,
         as: 'meditions',
         include:[{model:PuntualMedition, as: 'puntualMeditions'}]
       }],

      raw: false });

    return report.toJSON();
  }

  async function list() {
    const response = await Report.findAll({})
    return response.map(a=>a.toJSON());
  }
};
