module.exports = function reportsRepository(Report, Medition, PuntualMedition) {
  return {
    list,
    del,
    saveReport,
    getReport
  };

  async function saveReport(newReport) {
    console.log(JSON.stringify(newReport))
   return Report.create(newReport,{  include: [{
    model: Medition,
     as: 'meditions',
     include:[{model:PuntualMedition, as: 'puntualMeditions'}]
 //    attributes: ['id']
//  required: false
   }]}).catch(console.log);
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
