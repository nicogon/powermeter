/* eslint-disable no-await-in-loop */
/* eslint-disable radix */
module.exports = function reportsRepository(Report, Medition) {
  return {
    list,
    del,
    saveReport,
    getReport,
    listForSimulations,
    getMedition
  };

  async function del(reportId) {
    return Report.destroy({
      where: {
        id: reportId
      }
    });
  }

  async function createMeditions(newReport, idReport) {
    // eslint-disable-next-line no-restricted-syntax
    for (const medition of newReport.meditions) {
      // eslint-disable-next-line no-await-in-loop
      await Medition.create(
        { ...medition, ReportId: idReport },
        {}
      );
    }
  }

  async function saveReport(newReport) {
    try {
      const compactedMeditions = reportWithCompactedMeditions(newReport);
      const createdReport = await Report.create(compactedMeditions, {}).catch(console.log);
      const idReport = createdReport.toJSON().id;
      await createMeditions(compactedMeditions, parseInt(idReport));
    } catch (e) {
      console.log(e);
    }

    // TODO: Move it to Repository model
    function reportWithCompactedMeditions(report) {
      report.meditions.forEach((medition) => {
        // eslint-disable-next-line no-param-reassign
        medition.puntualMeditions = compactPuntualMeditions(medition.puntualMeditions);
        return medition;
      });
      return report;

      function compactPuntualMeditions(puntuals) {
        if (puntuals.length <= 2) { return puntuals; }
        return newLines(puntuals.slice(2), createFirstLine(puntuals));
      }

      function createFirstLine(puntuals) {
        // We need 2 points to create the first line. It's the base case
        return [puntuals[0], puntuals[1]];
      }

      // Recursive function
      function newLines(meditions, acumulator) {
        let acum = acumulator;

        const current = meditions[0];
        const previous = acum[acum.length - 1];

        if (significantChange(current.value, previous.value)) {
          acum = acum.concat(current);
          if (meditions.slice(1).length > 0) {
            acum = newLines(meditions.slice(1), acum);
          }
        } else {
          // eslint-disable-next-line no-param-reassign
          acum[acum.length - 1] = current;
        }

        return acum;
      }

      function significantChange(currentValue, previousMeditionValue) {
        const correctionFactor = Report.SIMILAR_VALUES_ON_REPORTS;
        const minValue = (1 - correctionFactor) * currentValue;
        const maxValue = (1 + correctionFactor) * currentValue;

        return previousMeditionValue > maxValue || previousMeditionValue < minValue;
      }
    }
  }

  async function getReport(reportId) {
    const report = await Report.findByPk(parseInt(reportId), {
      include: [
        {
          model: Medition,
          as: 'meditions'
        }
      ],

      raw: false
    });

    return report.toJSON();
  }

  async function list() {
    const response = await Report.findAll({});
    return response.map(a => a.toJSON());
  }

  async function listForSimulations() {
    const response = await Report.findAll({
      include: [
        {
          model: Medition,
          as: 'meditions'
        }
      ]
    });
    return response.map(a => a.toJSON());
  }

  async function getMedition(meditionId) {
    const medition = await Medition.findByPk(parseInt(meditionId), {
      raw: false
    });
    return medition.toJSON();
  }
};
