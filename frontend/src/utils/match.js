//====================================================================
// Aqui ficará a função para cálculo de match entre Skills da Professional e Skills do Job
// Recebe duas listas de skills: (skillsPro, skillsJob)
// Ex: [ { id: 1, level: "Sênior", experience: 3.5 } ]
// Retorna um Float
function match(skillsJob, skillsPro) {
  let totSkills = 0;
  let matchJob = 0.0;

  skillsJob.forEach((skJob) => {
    let skPro = skillsPro.find((sk) => sk.id === skJob.id);

    if (skPro) {
      matchJob += matchSkill(skJob, skPro);
    }

    totSkills += 1;
  });

  if (totSkills > 0) {
    return Math.min(100, matchJob / totSkills);
  }

  return 0.0;
}
//====================================================================
// Calcula o match entre um skill do Job e um skill da Professional
// Objetos de entrada: Ex: { level: "Sênior", experience: 3.5 }
// Retorna um Float
function matchSkill(skJob, skPro) {
  let matchLvl = 0.0;
  let matchExp = 0.0;
  const level = {
    Júnior: 1,
    Pleno: 2,
    Sênior: 3,
  };

  const skillPro = skPro.find((skill) => skill.id === skJob.id);
  if (skillPro) {
    // match Level
    matchLvl = Math.min(60, 50 * (level[skillPro.level] / level[skJob.level]));

    // match Experience
    matchExp = Math.min(70, 50 * (skillPro.experience / skJob.experience));

    // Match geral da canditada/vaga = média dos matches dos skills...
    return Math.min(100, matchLvl + matchExp);
  }

  return 0;
}

//====================================================================
// Retorna a proporção de skills atendidos.
function softMatch(skillsJob, skillsPro) {
  // console.log("softMatch:", skillsJob, skillsPro);
  let tot = 0;

  skillsJob.forEach((skJob) => {
    let skPro = skillsPro.find((sk) => sk.id === skJob.id);

    if (skPro) {
      tot += 1;
    }
  });

  return (100 * tot) / skillsJob.length;
}
//====================================================================

export { match, softMatch, matchSkill };
